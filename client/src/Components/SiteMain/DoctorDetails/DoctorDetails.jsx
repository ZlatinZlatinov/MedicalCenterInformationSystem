import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CircleCheck, Calendar, CircleX } from "lucide-react";
import CalendarApp from "./Calendar";
import { getDoctorById } from "../../../services/doctorService";

function DoctorDetails() {
    const params = useParams();
    const [isHidden, setIsHidden] = useState(true);
    const [doctorDetails, setDoctrorDetails] = useState({
        imgSrc: '', doctorName: '', department: '', specialty: '', experience: 0, description: '', education: ''
    });
    const doctorId = params.doctorId;

    useEffect(() => {
        async function fetchDoctorDetails() {
            try {
                const data = await getDoctorById(doctorId);
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
                            <img src={"/public/images/bezos.png"} alt="Doctor profile picture" />
                        </div>

                        <div className="main-info-heading">
                            <h3 className="main-info-title">Dr. {doctorDetails.doctorName}</h3>
                            <span className="main-infor-department">{doctorDetails.department}</span> {/*Department */}
                            <span className="main-infor-specialty">{doctorDetails.specialty}</span> {/*Specialty */}
                            <p className="doctor-card-experience">{doctorDetails.experience} years experience</p>
                        </div>
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
                        <li><CircleCheck size={18} color="#00d062" /> <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, reiciendis praesentium accusantium fugiat mollitia, aperiam pariatur cum vel exercitationem quod dolorum! Sed est aliquam officiis assumenda libero ut aspernatur voluptas!</span></li>
                        <li><CircleCheck size={18} color="#00d062" /> <span>Voluptatum cum debitis, autem aspernatur cupiditate fuga velit, corporis voluptatibus deserunt, itaque perspiciatis. Odio mollitia quisquam est ipsam nemo architecto et, molestias dolorem aspernatur veniam ut, cupiditate modi nobis exercitationem?</span></li>
                        <li><CircleCheck size={18} color="#00d062" /> <span>Repellat, numquam nemo! Quasi nulla sequi, voluptatem quae impedit amet nam odio nemo reiciendis vel, molestiae distinctio voluptatum voluptate minus repudiandae ab officiis nobis est veritatis quaerat neque nisi sit?</span></li>
                        <li><CircleCheck size={18} color="#00d062" /> <span>Perferendis molestias aut maxime aliquid saepe! Molestias totam magni cum similique ad, culpa dignissimos libero nam explicabo tempore adipisci! Repellendus quam nostrum fugit. Quis, quod iure. Voluptatum recusandae ullam omnis.</span></li>
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

            <div className={isHidden ? "hidden" : "book-calendar"}>
                <CalendarApp />

                <button className="close-btn" onClick={() => setIsHidden(!isHidden)}><CircleX color="white" size={30} /></button>
            </div>
        </section>
    );
}

export default DoctorDetails;