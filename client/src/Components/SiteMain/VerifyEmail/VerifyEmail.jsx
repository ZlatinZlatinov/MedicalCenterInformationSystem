import { Link, useNavigate, useSearchParams } from "react-router";
import { Activity, MoveLeft } from 'lucide-react';
import { useEffect, useState } from "react";
import { verifyEmail } from "../../../services/authService";
//TODO: add token validation and update UI
function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        token: '',
        message: `Confirm email verification`
    });

    useEffect(() => {
        const token = searchParams.get("token")

        if (!token) {
            navigate('/');
        }

        setFormData((oldData) => ({ ...oldData, token }));
    }, []);

    async function handleOnSubmit(e) {
        e.preventDefault();

        try {
            await verifyEmail(formData.token);

            setFormData((old) => ({
                ...old,
                'message': "Email verification successful."
            }));

            setTimeout(() => {
                navigate('/login');
            }, 2500);
        } catch (error) {
            setFormData((old) => ({
                ...old,
                'message': error.message
            }));
        }
    }

    return (
        <section id="verify-email">
            <form id="confirm-email" className="auth-form" onSubmit={handleOnSubmit}>
                <div className="form-header">
                    <p className="form-logo">
                        <Activity className="activity" />
                    </p>
                    <h2 className='form-heading'>Verify Email</h2>
                    <span>{formData.message}</span>
                </div>

                <div className="form-fields">
                    <p className="text-center">Click the button bellow to confirm your email address and activate account.</p>

                    <div className="form-btn">
                        <input type="submit" className='auth-btn' value="Verify Email" />
                    </div>
                </div>

                <div className="form-footer">
                    <p><Link to='/' className='form-redirect'><MoveLeft /><span>Back To Home</span></Link></p>
                </div>
            </form>
        </section>
    );
}

export default VerifyEmail;