
//On cancel appointment, open modal, so that the user can writa a reason 

import { cancelAppointment } from "../../../services/appointmentsService";

// for cancelation and confirm... 
function UpcommingCard({
    username, email, appointmentDate,
    appointmentTime, status, isInitial,
    appointmentId, accessToken }) {

    async function handleCancelAppointment(id, token) {
        try {
            await cancelAppointment(id, token);
            alert("Cancellation confirmed!");
        } catch (error) {
            console.error(error);
            alert("Cancellation failed!");
        }
    }

    return (
        <div className="management-card">
            <div className="management-card-column-one">
                <p>{username}</p>
                <span>{email}</span>
            </div>
            <div className="management-card-column-two">
                <p>{appointmentDate}</p>
                <span>{appointmentTime}</span>
            </div>
            <div className="management-card-colum-three">
                <p>{status}</p>
            </div>
            <div className="management-card-column-four">
                <p>{isInitial ? 'Initial consultation' : 'Regular consultation'}</p>
            </div>
            <div className="management-card-actions">
                <button>Complete</button>
                <button onClick={(e) => handleCancelAppointment(appointmentId, accessToken)}>Cancel</button>
            </div>
        </div>
    );
}

export default UpcommingCard;