import { approveDoctor, declineDoctor } from "../../../services/doctorService";

function StaffCard({ username, type, email, specialization, accessToken, doctorId }) {
    async function handleApprove() {
        try {
            const data = await approveDoctor(accessToken, doctorId);
            alert("Doctor approved successfully!");
            console.log(data);
        } catch (error) {
            console.error(error);
            alert("Doctor approval failed!");
        }
    }

    async function handleDecline() {
        try {
            const data = await declineDoctor(accessToken, doctorId);
            alert("Doctor declined successfully!");
            console.log(data);
        } catch (error) {
            console.error(error);
            alert("Doctor decline failed!");
        }
    }

    return (
        <div className="management-card">
            <div className="management-card-column-one">
                <p>{username}</p>
            </div>
            <div className="management-card-column-two">
                <p>{type}</p>
            </div>
            <div className="management-card-colum-three">
                <p>{specialization}</p>
            </div>
            <div className="management-card-column-four">
                <p>{email}</p>
            </div>
            <div className="management-card-actions">
                <button onClick={handleApprove}>Approve</button>
                <button onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
}

export default StaffCard;