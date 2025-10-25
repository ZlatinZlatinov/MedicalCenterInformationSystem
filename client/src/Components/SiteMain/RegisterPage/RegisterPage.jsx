import { Link } from 'react-router';
import { Activity, MoveLeft } from 'lucide-react';
import { useState } from 'react';
import { registerUser } from '../../../services/authService';
//TODO: Add error handlig, and update UI
function RegisterPage() {
    const [formMessage, setFormMessage] = useState("Join MediCare today");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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

        try {
            await registerUser({
                username: `${formData.firstName} ${formData.lastName}`,
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
                        <Activity className="activity" />
                    </p>
                    <h2 className='form-heading'>Create Account</h2>
                    <span>{formMessage}</span>
                </div>

                <div className="form-fields">
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
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