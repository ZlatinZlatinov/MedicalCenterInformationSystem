import { Activity } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import { uploadDocument } from '../../../services/documentService';

const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;

function MyDocuments() {
    const { authUserData } = useAuth();
    const [formMessage, setFormMessage] = useState("Upload your documents here.");
    const [formData, setFormData] = useState({
        documentType: '',
        documentName: '',
        file: ''
    });

    function handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if (name !== 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                file: e.target.files[0]
            }));
        }
    }

    async function handleOnSubmit(e) {
        e.preventDefault();

        if (!formData.documentType) {
            setFormMessage('Missing document name!');
            return;
        }

        if (!formData.file) {
            setFormMessage('Missing file!');
            return;
        }

        if (formData.file.size > MAX_DOCUMENT_SIZE) {
            setFormMessage("Document size must be less than 10MB!");
        }

        const payload = new FormData();

        for (let key of Object.keys(formData)) {
            payload.append(key, formData[key]);
        }

        try {
            setFormMessage('Loading...');
            await uploadDocument(payload, authUserData.accessToken);
            setFormMessage('Document uploaded succesfully!');

            setFormData({
                file: '',
                documentName: '',
                documentType: ''
            });
        } catch (err) {
            console.error(err);
            setFormMessage(err?.message);
        }
    }

    return (
        <section id="my-documents">
            <form
                id="upload-documents-from"
                className="auth-form"
                encType="multipart/form-data"
                onSubmit={handleOnSubmit}>

                <div className="form-header">
                    <p className="form-logo">
                        <Activity className="activity" />
                    </p>
                    <h2 className="form-heading">Upload Documents</h2>
                    <span>{formMessage}</span>
                </div>

                <div className="form-fields">
                    {/* Document Name */}
                    <div className="input-field">
                        <label htmlFor="documentName">Document Name</label>
                        <input
                            type="text"
                            name="documentName"
                            id="documentName"
                            placeholder='Optional'
                            value={formData.documentName}
                            onChange={handleOnChange}
                        />
                    </div>

                    {/*Document Type*/}
                    <div className="input-field">
                        <label htmlFor="documentType">Document Type</label>
                        <select
                            name="documentType"
                            id="documentType"
                            value={formData.documentType}
                            required
                            onChange={handleOnChange}
                        >
                            {/*'discharge_summary', 'lab_result', 'imaging_result', 'prescription', 'referral', 'other'*/}
                            <option selected>--Choose One--</option>
                            <option value="discharge_summary">Discharge Summary</option>
                            <option value="lab_result">Lab Result</option>
                            <option value="imaging_result">Imaging result</option>
                            <option value="prescription">Prescription</option>
                            <option value="referral">Referral</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Document */}
                    <div className="input-field">
                        <label htmlFor="file">Document</label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,image/.png,image.jpg"
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Form Button */}
                    <div className="form-btn">
                        <input type="submit" value="Upload" className="auth-btn" />
                    </div>
                </div>
            </form>
        </section>
    );
}

export default MyDocuments;