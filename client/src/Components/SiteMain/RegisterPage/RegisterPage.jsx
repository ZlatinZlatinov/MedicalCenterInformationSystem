import { Link } from 'react-router';
import { Activity, MoveLeft } from 'lucide-react';

function RegisterPage() {
    return (
        <section id="register-page">
            <form id="register-form">
                <div className="form-header">
                    <p className="form-logo">
                        <Activity />
                    </p>
                    <h2>Create Account</h2>
                    <p>Join MediCare today</p>
                </div>

                <div className="form-fields">
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" />
                    </div>

                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" />
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>

                    <div className="input-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="confirmPassword" name="confirmPassword" id="confirmPassword" />
                    </div>

                    <div className="form-btn">
                        <input type="submit" value="Create Account" />
                    </div>
                </div>

                <div className="form-footer">
                    <p>Already Have an account? <Link to='/login'>Sign In</Link></p>
                    <p><Link to='/'><MoveLeft/><span>Back To Home</span></Link></p>
                </div>
            </form>
        </section>
    );
}

export default RegisterPage;