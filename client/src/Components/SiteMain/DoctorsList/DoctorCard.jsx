import { Link } from "react-router";

function DoctorCard({ doctorId, imgSrc, doctorName, department, specialty, experience }) {
    return (
        <div className="doctor-card">
            <div className="doctor-card-header">
                <div className="doctor-card-img">
                    <img src={imgSrc} alt="Doctor profile picture" />
                </div>
                <div className="doctor-card-heading">
                    <h4 className="doctor-card-title">Dr. {doctorName}</h4>
                    <span className="doctor-card-department">{department}</span> {/*Department */}
                    <span className="doctor-card-specialty">{specialty}</span> {/*Specialty */}
                </div>
            </div>

            <div className="doctor-card-content">
                <p className="doctor-card-experience">{experience} years experience</p>
                <Link to={`./${doctorId}`} className="doctor-card-details">View Details and Book</Link>
            </div>
        </div>
    );
}

export default DoctorCard;