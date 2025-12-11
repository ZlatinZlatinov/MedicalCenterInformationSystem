import { useEffect, useState } from "react";
import { getAllDoctors } from "../../../services/doctorService";
import DoctorCard from "./DoctorCard";
import { departmentNames, specialtyNames } from "../../../Constants/departments";
import { useSearchParams } from "react-router";

function DoctorsList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [doctorsList, setDoctorsList] = useState([]);

    const department = searchParams.get('department') || "";
    const specialty = searchParams.get('specialty') || "";

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setSearchParams({ [name]: value });
    }

    useEffect(() => {
        async function fetchDoctors() {
            try {
                const data = await getAllDoctors(department, specialty);
                setDoctorsList(data);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }

        fetchDoctors();
    }, [department, specialty]);

    return (
        <section id="doctors-list">
            <div id="browse-doctors">
                <h2>Browse Doctors</h2>
                <div className="search-doctors">
                    <input type="search" name="searchDoctors" id="searchDoctors" placeholder="Search doctors..." />

                    <select name="department" id="department" onChange={handleOnchange} value={department}>
                        <option value="All Departments">All Departments</option>
                        {departmentNames.map((d, index) => {
                            return <option value={d} key={index}>{d}</option>
                        })}
                    </select>

                    <select name="specialty" id="specialty" onChange={handleOnchange} value={specialty}>
                        <option value="All Specialties">All Specialties</option>
                        {specialtyNames.map((s, index) => {
                            return <option value={s} key={index}>{s}</option>
                        })}
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