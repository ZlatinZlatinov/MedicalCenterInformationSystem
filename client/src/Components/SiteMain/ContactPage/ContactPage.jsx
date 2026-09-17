import { useState } from 'react';
import { Activity, Clock, Mail, MapPin, Phone, TriangleAlert } from 'lucide-react';

const initialMessage = 'We usually reply within one business day.';

const emptyForm = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
};

const clinic = {
    address: '24 Vitosha Boulevard, Sofia 1000, Bulgaria',
    phone: '02 401 2200',
    email: 'contact@medicare.bg',
    lat: 42.695,
    lng: 23.321,
};

const osmEmbedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${clinic.lng - 0.012}%2C${clinic.lat - 0.008}%2C${clinic.lng + 0.012}%2C${clinic.lat + 0.008}&layer=mapnik&marker=${clinic.lat}%2C${clinic.lng}`;
const osmLink = `https://www.openstreetmap.org/?mlat=${clinic.lat}&mlon=${clinic.lng}#map=16/${clinic.lat}/${clinic.lng}`;

function ContactPage() {
    const [formMessage, setFormMessage] = useState(initialMessage);
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState(emptyForm);

    function handleOnChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        const { firstName, lastName, email, subject, message } = formData;

        if (!firstName || !lastName || !email || !subject || !message) {
            setIsError(true);
            setFormMessage('All fields are required!');
            return;
        }

        setIsError(false);
        setFormMessage('Thank you for reaching out. Your message has been received.');
        setFormData(emptyForm);
    }

    return (
        <section id="contact-page">
            <div className="contact-hero">
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title">Contact MediCare</h1>
                    <p className="contact-hero-subtitle">
                        Visit our clinic, call our team, or send a message. We are here to help you
                        with appointments, records, and any questions about your care.
                    </p>
                </div>
            </div>

            <div className="contact-layout">
                <div className="contact-info">
                    <div className="contact-info-image">
                        <img src="/images/medical-facility2.jpg" alt="MediCare clinic entrance" />
                    </div>

                    <article className="contact-info-card">
                        <div className="contact-info-icon">
                            <MapPin size={32} color="var(--primary-blue)" />
                        </div>
                        <div>
                            <h3>Address</h3>
                            <p>{clinic.address}</p>
                        </div>
                    </article>

                    <article className="contact-info-card">
                        <div className="contact-info-icon">
                            <Phone size={32} color="var(--primary-blue)" />
                        </div>
                        <div>
                            <h3>Phone</h3>
                            <p>
                                <a href="tel:+35924012200">{clinic.phone}</a>
                            </p>
                        </div>
                    </article>

                    <article className="contact-info-card">
                        <div className="contact-info-icon">
                            <Mail size={32} color="var(--primary-orange)" />
                        </div>
                        <div>
                            <h3>Email</h3>
                            <p>
                                <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
                            </p>
                        </div>
                    </article>

                    <article className="contact-info-card">
                        <div className="contact-info-icon">
                            <Clock size={32} color="var(--primary-green)" />
                        </div>
                        <div>
                            <h3>Working hours</h3>
                            <p>Monday to Friday: 07:00 – 19:00</p>
                            <p>Saturday and Sunday: 09:00 – 17:00</p>
                        </div>
                    </article>
                </div>

                <form id="contact-form" className="auth-form" onSubmit={handleOnSubmit}>
                    <div className="form-header">
                        <p className="form-logo">
                            {isError ? (
                                <TriangleAlert color="red" size={32} />
                            ) : (
                                <Activity className="activity" />
                            )}
                        </p>
                        <h2 className="form-heading">Send us a message</h2>
                        <span>{formMessage}</span>
                    </div>

                    <div className="form-fields">
                        <div className="contact-name-row">
                            <div className="input-field">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="input-field">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleOnChange}
                                />
                            </div>
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
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                value={formData.subject}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="input-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                value={formData.message}
                                onChange={handleOnChange}
                            />
                        </div>

                        <div className="form-btn">
                            <input type="submit" value="Send Message" className="auth-btn" />
                        </div>
                    </div>
                </form>
            </div>

            <div className="contact-map-section">
                <h2 className="section-title">Find us on the map</h2>
                <div className="contact-map-frame">
                    <iframe
                        title="MediCare clinic location"
                        src={osmEmbedSrc}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <p className="contact-map-link">
                    <a href={osmLink} target="_blank" rel="noreferrer">
                        Open in OpenStreetMap
                    </a>
                </p>
            </div>
        </section>
    );
}

export default ContactPage;
