import { Link } from 'react-router';
import { Activity, MoveLeft, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { registerUser } from '../../../services/authService';

const initialMessage = "Join MediCare today";

function RegisterPage() {
    const [formMessage, setFormMessage] = useState(initialMessage);
    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
            setFormMessage("All fields are required!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFormMessage("Password and Confirm Password fields should be equal!");
            return;
        }

        try {
            await registerUser({
                username: formData.username,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            setFormMessage("Please, check your email for verification link.");
        } catch (error) {
            setFormMessage(error.message);
        }
    }

    return (
        <section id="register-page">
            <form id="register-form" className='auth-form' onSubmit={handleOnSubmit}>
                <div className="form-header">
                    <p className="form-logo">
                        {formMessage === initialMessage ? <Activity className="activity" /> :
                            <TriangleAlert color='red' size={32} />}
                    </p>
                    <h2 className='form-heading'>Create Account</h2>
                    <span>{formMessage}</span>
                </div>

                <div className="form-fields">
                    <div className="input-field">
                        <label htmlFor="username">First & Last Name</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            minLength={5}
                            maxLength={50}
                            value={formData.username}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            minLength={10}
                            maxLength={13}
                            value={formData.phoneNumber}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            minLength={6}
                            value={formData.password}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            minLength={6}
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-btn">
                        <input type="submit" className='auth-btn' value="Create Account" />
                    </div>
                </div>

                <div className="form-footer">
                    <p>Already Have an account? <Link to='/login' className="blue-redirect">Sign In</Link></p>
                    <p><Link to='/' className='form-redirect'><MoveLeft /><span>Back To Home</span></Link></p>
                </div>
            </form>
        </section>
    );
}

export default RegisterPage;