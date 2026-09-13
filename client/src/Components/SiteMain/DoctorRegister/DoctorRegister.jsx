import { Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import { registerDoctor } from '../../../services/doctorService';
import { useAuth } from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import { getSpecialtiesAndDepartments } from '../../../services/internalService';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

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
    const [specDeptData, setSpecDep] = useState({
        specialties: [{ name: 'Loading...', id: 1 }],
        departments: [{ name: 'Loading...', id: 2 }],
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

        const image = formData.profilePicture;
        if (!image) {
            setFormMessage('Profile picture is required.');
            return;
        }

        const isJpegOrPng = image.type === 'image/jpeg' || image.type === 'image/png';
        if (!isJpegOrPng) {
            setFormMessage('Only JPEG and PNG images are allowed.');
            return;
        }

        if (image.size > MAX_IMAGE_SIZE) {
            setFormMessage('Image must be 5MB or smaller.');
            return;
        }

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

    useEffect(() => {
        async function fetchSpecialtiesAndDepartments() {
            try {
                const data = await getSpecialtiesAndDepartments(authUserData.accessToken);
                setSpecDep(old => data);
            } catch (error) {
                setFormMessage(error.message);
                console.error(error);
            }
        }

        fetchSpecialtiesAndDepartments();
    }, []);

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
                        <label htmlFor="departmentId">Department</label>
                        <select name="departmentId" id="departmentId" onChange={handleOnChange}>
                            {specDeptData.departments.map((d) => (
                                <option value={d.id} key={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Specialty */}
                    <div className="input-field">
                        <label htmlFor="specialtyId">Specialty</label>
                        <select name="specialtyId" id="specialtyId" onChange={handleOnChange}>
                            {specDeptData.specialties.map((s) => (
                                <option value={s.id} key={s.id}>{s.name}</option>
                            ))}
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
                            accept="image/jpeg,image/png,.jpg,.jpeg,.png"
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