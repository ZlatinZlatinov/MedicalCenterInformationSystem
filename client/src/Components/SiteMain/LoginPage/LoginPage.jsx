import { Link } from "react-router";
import { Activity, MoveLeft } from 'lucide-react';

function LoginPage() {
    return (
        <section id="login-page">
            <form id="login-form">
                <div className="form-header">
                    <p className="form-logo">
                        <Activity />
                    </p>
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your MediCare account</p>
                </div>

                <div className="form-fields">
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>

                    <div className="form-btn">
                        <input type="submit" value="Sign In" />
                        <input type="button" value="Google" />
                    </div>
                </div>

                <div className="form-footer">
                    <p>Don't have an account? <Link to='/register'>Register here</Link></p>
                    <p><Link to='/'><MoveLeft/><span>Back To Home</span></Link></p>
                </div>
            </form>
        </section>
    );
}

export default LoginPage;