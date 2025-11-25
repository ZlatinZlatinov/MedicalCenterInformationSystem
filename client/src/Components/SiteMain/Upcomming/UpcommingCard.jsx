function UpcommingCard({ username, email, appointmentDate, appointmentTime, status, isInitial }) {
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
                <button>Cancel</button>
            </div>
        </div>
    );
}

export default UpcommingCard;