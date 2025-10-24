import { Link } from 'react-router';
import { Activity, MoveLeft } from 'lucide-react';

function RegisterPage() {
    return (
        <section id="register-page">
            <form id="register-form" className='auth-form'>
                <div className="form-header">
                    <p className="form-logo">
                        <Activity className="activity"/>
                    </p>
                    <h2 className='form-heading'>Create Account</h2>
                    <span>Join MediCare today</span>
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
                        <input type="submit" className='auth-btn' value="Create Account" />
                    </div>
                </div>

                <div className="form-footer">
                    <p>Already Have an account? <Link to='/login' className="blue-redirect">Sign In</Link></p>
                    <p><Link to='/' className='form-redirect'><MoveLeft/><span>Back To Home</span></Link></p>
                </div>
            </form>
        </section>
    );
}

export default RegisterPage;