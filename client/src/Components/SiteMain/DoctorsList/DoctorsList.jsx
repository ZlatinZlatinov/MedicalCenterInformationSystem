import { Link } from "react-router";
// import logo from './assets/profile-pic.jpg';

function DoctorsList() {

    return (
        <section id="doctors-list">
            <div id="browse-doctors">
                <h2>Browse Doctors</h2>
                <div className="search-doctors">
                    <input type="search" name="searchDoctors" id="searchDoctors" placeholder="Search doctors..." />
                    <select name="specialties" id="specialties">
                        <option value="All Specialties">All Specialties</option>
                        <option value="Cardiology">Cardiology</option>
                    </select>

                    <select name="departments" id="departments">
                        <option value="All Departments">All Departments</option>
                        <option value="Cardiology">Cardiology</option>
                    </select>
                </div>
            </div>

            <div className="all-doctors">
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <div className="doctor-card-img">
                            <img src={"./public/images/bezos.png"} alt="Doctor profile picture" />
                        </div>
                        <div className="doctor-card-heading">
                            <h4 className="doctor-card-title">Dr. Jeff Bezos</h4>
                            <span className="doctor-card-department">Cariology</span> {/*Department */}
                        </div>
                    </div>

                    <div className="doctor-card-content">
                        <p className="doctor-card-experience">15 years experience</p>
                        <Link to='./:doctorId' className="doctor-card-details">View Details and Book</Link>
                    </div>
                </div>

                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <div className="doctor-card-img">
                            <img src={"./public/images/profile-pic.jpg"} alt="Doctor profile picture" />
                        </div>
                        <div className="doctor-card-heading">
                            <h4 className="doctor-card-title">Dr. John Cena</h4>
                            <span className="doctor-card-department">Cariology</span> {/*Department */}
                        </div>
                    </div>

                    <div className="doctor-card-content">
                        <p className="doctor-card-experience">15 years experience</p>
                        <Link to='/:doctorId' className="doctor-card-details">View Details and Book</Link>
                    </div>
                </div> 

                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <div className="doctor-card-img">
                            <img src={"./public/images/profile-pic.jpg"} alt="Doctor profile picture" />
                        </div>
                        <div className="doctor-card-heading">
                            <h4 className="doctor-card-title">Dr. John Cena</h4>
                            <span className="doctor-card-department">Cariology</span> {/*Department */}
                        </div>
                    </div>

                    <div className="doctor-card-content">
                        <p className="doctor-card-experience">15 years experience</p>
                        <Link to='/:doctorId' className="doctor-card-details">View Details and Book</Link>
                    </div>
                </div> 

                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <div className="doctor-card-img">
                            <img src={"./public/images/profile-pic.jpg"} alt="Doctor profile picture" />
                        </div>
                        <div className="doctor-card-heading">
                            <h4 className="doctor-card-title">Dr. John Cena</h4>
                            <span className="doctor-card-department">Cariology</span> {/*Department */}
                        </div>
                    </div>

                    <div className="doctor-card-content">
                        <p className="doctor-card-experience">15 years experience</p>
                        <Link to='/:doctorId' className="doctor-card-details">View Details and Book</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DoctorsList;