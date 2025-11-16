import { useEffect, useState } from "react";
import { getAllDoctors } from "../../../services/doctorService";
import DoctorCard from "./DoctorCard";

function DoctorsList() {
    const [doctorsList, setDoctorsList] = useState([]);

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const data = await getAllDoctors();
                setDoctorsList(data);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }

        fetchDoctors();
    }, []);

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
                {doctorsList[0] ? doctorsList.map((doc) => <DoctorCard
                    key={doc.doctorId}
                    doctorId={doc.doctorId}
                    imgSrc={doc.profilePicture}
                    doctorName={doc.username}
                    department={doc.department}
                    specialty={doc.specialty}
                    experience={doc.experience}
                />) : <p>No doctors were found</p>}
            </div>
        </section>
    );
}

export default DoctorsList;