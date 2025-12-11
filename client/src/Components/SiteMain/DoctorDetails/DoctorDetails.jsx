import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GraduationCap, CircleCheck, Calendar, CircleX, Phone } from "lucide-react";
import CalendarApp from "./Calendar";
import { getDoctorById } from "../../../services/doctorService";

function DoctorDetails() {
    const params = useParams();
    const [isHidden, setIsHidden] = useState(false);
    const [doctorDetails, setDoctrorDetails] = useState({
        imgSrc: null, doctorName: '', department: '',
        specialty: '', experience: 0, description: '',
        education: '', phoneNumber: '', isNzok: false
    });
    const doctorId = params.doctorId;

    useEffect(() => {
        async function fetchDoctorDetails() {
            try {
                const data = await getDoctorById(doctorId);
                console.log(data);
                
                setDoctrorDetails(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDoctorDetails()
    }, [doctorId]);

    return (
        <section id="doctor-details">
            <div className="doctor-details-content">
                {/* Main Info */}
                <div className="details-main-info">
                    <div className="main-info-header">
                        <div className="main-info-img">
                            <img src={doctorDetails.imgSrc} alt="Doctor profile picture" />
                        </div>

                        <div className="main-info-heading">
                            <h3 className="main-info-title">Dr. {doctorDetails.doctorName}</h3>
                            <span className="main-infor-department">{doctorDetails.department}</span> {/*Department */}
                            <span className="main-infor-specialty">{doctorDetails.specialty}</span> {/*Specialty */}
                            <p className="doctor-card-experience">{doctorDetails.experience} years experience</p>
                        </div>

                        {doctorDetails.isNzok && <div className="nhif-logo">
                            <div>
                                <img src="/images/nhifLogo.svg" alt="nhif logo" />
                                <p><CircleCheck size={16} color="green" /> Works with NHIF</p>
                            </div>
                        </div> }
                    </div>

                    <div className="main-info-details">
                        <h4>About</h4>
                        <p>{doctorDetails.description}</p>
                    </div>
                </div>

                {/* Education */}
                <div className="details-education">
                    <h4>Education</h4>

                    <ul>
                        <li><GraduationCap size={22} color="#00d062" /> <span>{doctorDetails.education}</span></li>
                    </ul>
                </div>

                <div className="details-phone">
                    <h4>Phone Number</h4>

                    <ul>
                        <li><Phone size={20} color="#00d062" /> <span>{doctorDetails.phoneNumber}</span></li>
                    </ul>
                </div>
            </div>

            <div className="doctor-details-book">
                <div className="book-doctor">
                    <div className="book-doctor-heading">
                        <h4><Calendar color="#3c83f6" size={24} />Book Appointment</h4>
                        <span>Schedule with Dr. {doctorDetails.doctorName}</span>
                    </div>

                    <div className="book-doctor-footer">
                        <button className="book-doctor-btn" onClick={() => setIsHidden(!isHidden)}>Book</button>
                    </div>
                </div>
            </div>

            {isHidden && <div className={"book-calendar"}>
                <CalendarApp doctorId={doctorId} doctorName={doctorDetails.doctorName} />
                <button className="close-btn" onClick={() => setIsHidden(!isHidden)}><CircleX color="white" size={30} /></button>
            </div>}
        </section>
    );
}

export default DoctorDetails;