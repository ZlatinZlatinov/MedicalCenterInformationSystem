import { Activity } from 'lucide-react';
import { useState } from 'react';
import { registerDoctor } from '../../../services/doctorService';
import { useAuth } from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';

function DoctorRegister() {
    const navigate = useNavigate();
    const { authUserData } = useAuth();
    const [formMessage, setFormMessage] = useState("Become a Doctor at MediCare");
    const [formData, setFormData] = useState({
        departmentId: '',
        specialtyId: '',
        licenseNumber: '',
        education: '',
        experience: 0,
        profilePicture: '',
        description: ''
    });

    function handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name !== 'profilePicture') {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                profilePicture: e.target.files[0]
            }));
        }
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        const payload = new FormData();
        for (let key of Object.keys(formData)) {
            payload.append(key, formData[key]);
        }

        try {
            await registerDoctor(payload, authUserData.accessToken);
            navigate('/');
        } catch (error) {
            console.error(error);
            setFormMessage(error.message);
        }
    }

    return (
        <section id="doctor-register">
            <form
                id="register-doctor-form"
                className="auth-form"
                encType='multipart/form-data'
                onSubmit={handleOnSubmit}>

                <div className="form-header">
                    <p className="form-logo">
                        <Activity className="activity" />
                    </p>
                    <h2 className="form-heading">Apply for Doctor</h2>
                    <span>{formMessage}</span>
                </div>

                <div className="form-fields">
                    {/* Department */}
                    <div className="input-field">
                        <label htmlFor="department">Department</label>
                        <select name="department" id="department">
                            <option value="Cardiology">Cardiology</option>
                        </select>
                    </div>

                    {/* Specialty */}
                    <div className="input-field">
                        <label htmlFor="specialty">Specialty</label>
                        <select name="specialty" id="specialty">
                            <option value="Cardiologist">Cardiologist</option>
                        </select>
                    </div>

                    {/* License Number */}
                    <div className="input-field">
                        <label htmlFor="licenseNumber">License number</label>
                        <input
                            type="text"
                            name="licenseNumber"
                            id="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Education */}
                    <div className="input-field">
                        <label htmlFor="education">Education</label>
                        <input
                            type="text"
                            name="education"
                            id="education"
                            value={formData.education}
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Experience */}
                    <div className="input-field">
                        <label htmlFor="experience">Experience</label>
                        <input
                            type="number"
                            name="experience"
                            id="experience"
                            value={formData.experience}
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Profile Picture */}
                    <div className="input-field">
                        <label htmlFor="profilePicture">Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicture"
                            id="profilePicture"
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Description */}
                    <div className="input-field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            placeholder='Add short description'></textarea>
                    </div>

                    {/* Form Button */}
                    <div className="form-btn">
                        <input type="submit" value="Apply" className="auth-btn" />
                    </div>
                </div>
            </form>
        </section>
    );
}

export default DoctorRegister;