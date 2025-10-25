import { Link } from "react-router";
import { Activity, MoveLeft } from 'lucide-react';

function VerifyEmail() {

    return (
        <section id="verify-email">
            <form id="confirm-email" className="auth-form">
                <div className="form-header">
                    <p className="form-logo">
                        <Activity className="activity" />
                    </p>
                    <h2 className='form-heading'>Verify Email</h2>
                    <span>Verify email for john_cena@wwe.com</span>
                </div>

                <div className="form-fields">
                    <p className="text-center">Click the button bellow to confirm your email address and activate account.</p>

                    <div className="form-btn">
                        <input type="submit" className='auth-btn' value="Verify Email" />
                    </div>
                </div>

                <div className="form-footer">
                    {/* <p>Already Have an account? <Link to='/login' className="blue-redirect">Sign In</Link></p> */}
                    <p><Link to='/' className='form-redirect'><MoveLeft /><span>Back To Home</span></Link></p>
                </div>
            </form>
        </section>
    );
}

export default VerifyEmail;