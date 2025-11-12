import { Link, useNavigate } from "react-router";
import { Activity, MoveLeft } from 'lucide-react';
import { useState } from "react";
import { loginUser } from "../../../services/authService";
import { useAuth } from "../../../Hooks/useAuth";

function LoginPage() {
    const { setAuthUserData } = useAuth();
    const navigate = useNavigate();
    const [formMessage, setFormMessage] = useState("Sign in to access your MediCare account");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
            const authData = await loginUser(formData);

            setAuthUserData({
                id: authData.id,
                role: authData.role,
                email: authData.email,
                username: authData.username,
                isLoggedIn: true,
                accessToken: authData.accessToken,
            });

            navigate('/');
        } catch (error) {
            setFormMessage(error.message);
        }
    }

    return (
        <section id="login-page">
            <form id="login-form" className="auth-form" onSubmit={handleOnSubmit}>
                <div className="form-header">
                    <p className="form-logo">
                        <Activity className="activity" />
                    </p>
                    <h2 className="form-heading">Welcome Back</h2>
                    <span>{formMessage}</span>
                </div>

                <div className="form-fields">
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

                    <div className="form-btn">
                        <input type="submit" value="Sign In" className="auth-btn" />
                        <input type="button" value="Google" />
                    </div>
                </div>

                <div className="form-footer">
                    <p>Don't have an account? <Link to='/register' className="blue-redirect">Register here</Link></p>
                    <p><Link to='/' className="form-redirect"><MoveLeft /><span>Back To Home</span></Link></p>
                </div>
            </form>
        </section>
    );
}

export default LoginPage;