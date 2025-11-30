import { Link } from 'react-router';
import { Activity, Target, Eye, Heart, Award, Users, Calendar, TrendingUp } from 'lucide-react';

function AboutPage() {
    return (
        <section id="about-page">
            {/* Hero Section */}
            <div className="about-hero">
                <div className="about-hero-content">
                    <h1 className="about-hero-title">About MediCare</h1>
                    <p className="about-hero-subtitle">
                        We are dedicated to revolutionizing healthcare by making it more accessible, 
                        efficient, and patient-centered. Our mission is to connect patients with 
                        quality healthcare professionals while providing a seamless digital experience.
                    </p>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="mission-vision-section">
                <div className="mission-vision-grid">
                    <div className="mission-card">
                        <div className="mission-icon">
                            <Target size={48} color="var(--primary-blue)" />
                        </div>
                        <h2>Our Mission</h2>
                        <p>
                            To provide accessible, high-quality healthcare services through innovative 
                            technology that connects patients with trusted medical professionals, 
                            ensuring everyone has the opportunity to receive excellent care.
                        </p>
                    </div>
                    <div className="vision-card">
                        <div className="vision-icon">
                            <Eye size={48} color="var(--primary-orange)" />
                        </div>
                        <h2>Our Vision</h2>
                        <p>
                            To become the leading digital healthcare platform that transforms how 
                            people access and manage their health, making quality medical care 
                            available to everyone, everywhere.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="story-section">
                <div className="story-content">
                    <div className="story-text">
                        <h2 className="section-title">Our Story</h2>
                        <div className="story-paragraphs">
                            <p>
                                MediCare was founded with a simple yet powerful vision: to bridge the gap 
                                between patients and healthcare providers through technology. We recognized 
                                that accessing quality healthcare shouldn't be complicated or time-consuming.
                            </p>
                            <p>
                                Since our inception, we have been committed to creating a platform that 
                                empowers patients to take control of their health while providing healthcare 
                                professionals with the tools they need to deliver exceptional care. Our 
                                team of dedicated professionals works tirelessly to ensure that every 
                                interaction on our platform is seamless, secure, and focused on your well-being.
                            </p>
                            <p>
                                Today, MediCare serves thousands of patients and connects them with a network 
                                of qualified doctors and specialists. We continue to innovate and improve 
                                our services, always keeping the patient at the center of everything we do.
                            </p>
                        </div>
                    </div>
                    <div className="story-image">
                        <img 
                            src="/images/medical-facility2.jpg" 
                            alt="MediCare healthcare facility" 
                        />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="values-section">
                <h2 className="section-title">Our Core Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">
                            <Heart size={40} color="var(--primary-green)" />
                        </div>
                        <h3>Compassion</h3>
                        <p>We approach every interaction with empathy and understanding, recognizing that healthcare is deeply personal.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <Award size={40} color="var(--primary-green)" />
                        </div>
                        <h3>Excellence</h3>
                        <p>We strive for the highest standards in everything we do, from technology to patient care.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <Users size={40} color="var(--primary-green)" />
                        </div>
                        <h3>Integrity</h3>
                        <p>We operate with honesty, transparency, and ethical practices in all our relationships.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">
                            <TrendingUp size={40} color="var(--primary-green)" />
                        </div>
                        <h3>Innovation</h3>
                        <p>We continuously seek new ways to improve healthcare delivery through technology and innovation.</p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
                <div className="stats-content">
                    <h2 className="section-title">MediCare by the Numbers</h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <Users size={48} color="var(--primary-blue)" />
                            <div className="stat-number">10,000+</div>
                            <div className="stat-label">Active Patients</div>
                        </div>
                        <div className="stat-item">
                            <Activity size={48} color="var(--primary-blue)" />
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Qualified Doctors</div>
                        </div>
                        <div className="stat-item">
                            <Calendar size={48} color="var(--primary-blue)" />
                            <div className="stat-number">50,000+</div>
                            <div className="stat-label">Appointments Booked</div>
                        </div>
                        <div className="stat-item">
                            <Award size={48} color="var(--primary-blue)" />
                            <div className="stat-number">98%</div>
                            <div className="stat-label">Patient Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="about-cta-section">
                <div className="about-cta-content">
                    <h2>Join the MediCare Community</h2>
                    <p>Experience healthcare reimagined. Start your journey with us today.</p>
                    <div className="about-cta-buttons">
                        <Link to="/register" className="btn blue-btn">Get Started</Link>
                        <Link to="/doctors" className="btn orange-btn">Find a Doctor</Link>
                    </div>
                </div>
            </div>
        </section>
    );
} 

export default AboutPage;