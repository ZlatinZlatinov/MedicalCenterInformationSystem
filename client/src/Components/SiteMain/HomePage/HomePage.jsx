import { Link } from 'react-router';
import { Activity, Stethoscope, Calendar, FileText, Clock, Shield, Users, Heart } from 'lucide-react';

function HomePage() {
    return (
        <section id="home-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to MediCare</h1>
                    <p className="hero-subtitle">Your trusted partner in healthcare. Book appointments, manage your health records, and connect with experienced doctors all in one place.</p>
                    <div className="hero-buttons">
                        <Link to="/login" className="btn blue-btn">Sign In</Link>
                        <Link to="/register" className="btn orange-btn">Get Started</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img 
                        src="/images/medical-facility2.jpg" 
                        alt="Modern medical facility" 
                    />
                </div>
            </div>

            {/* Services Section */}
            <div className="services-section">
                <h2 className="section-title">Our Services</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">
                            <Stethoscope size={40} color="var(--primary-blue)" />
                        </div>
                        <h3>Find a Doctor</h3>
                        <p>Browse through our network of qualified healthcare professionals and find the right doctor for your needs.</p>
                        <Link to="/doctors" className="service-link">Explore Doctors →</Link>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">
                            <Calendar size={40} color="var(--primary-blue)" />
                        </div>
                        <h3>Book Appointments</h3>
                        <p>Schedule your appointments online with ease. Choose your preferred date and time that works for you.</p>
                        <Link to="/doctors" className="service-link">Book Now →</Link>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">
                            <FileText size={40} color="var(--primary-blue)" />
                        </div>
                        <h3>Health Records</h3>
                        <p>Access and manage your medical records securely. Keep track of your health history in one place.</p>
                        <Link to="/login" className="service-link">View Records →</Link>
                    </div>
                    <div className="service-card">
                        <div className="service-icon">
                            <Clock size={40} color="var(--primary-blue)" />
                        </div>
                        <h3>24/7 Support</h3>
                        <p>Get assistance whenever you need it. Our support team is available around the clock to help you.</p>
                        <Link to="/contact" className="service-link">Contact Us →</Link>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="benefits-section">
                <div className="benefits-content">
                    <div className="benefits-text">
                        <h2 className="section-title">Why Choose MediCare?</h2>
                        <div className="benefits-list">
                            <div className="benefit-item">
                                <Shield size={32} color="var(--primary-green)" />
                                <div>
                                    <h3>Secure & Private</h3>
                                    <p>Your health data is protected with industry-leading security measures.</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <Users size={32} color="var(--primary-green)" />
                                <div>
                                    <h3>Expert Doctors</h3>
                                    <p>Connect with board-certified physicians and specialists in various fields.</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <Heart size={32} color="var(--primary-green)" />
                                <div>
                                    <h3>Patient-Centered Care</h3>
                                    <p>We prioritize your comfort and well-being in every interaction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="benefits-image">
                        <img 
                            src="/images/medical-team-doctor-s-office.jpg" 
                            alt="Healthcare professionals" 
                        />
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Take Control of Your Health?</h2>
                    <p>Join thousands of patients who trust MediCare for their healthcare needs.</p>
                    <div className="cta-buttons">
                        <Link to="/register" className="btn blue-btn">Create Account</Link>
                        <Link to="/doctors" className="btn orange-btn">Find a Doctor</Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 

export default HomePage;