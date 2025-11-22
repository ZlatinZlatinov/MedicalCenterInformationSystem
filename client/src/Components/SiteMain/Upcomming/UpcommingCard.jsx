function UpcommingCard({username, email, appointmentDate, appointmentTime, status, isInitial}) {
    return (
        <div className="upcomming-card">
                        <div className="upcomming-card-patient">
                            <p>{username}</p>
                            <span>{email}</span>
                        </div>
                        <div className="upcomming-card-date">
                            <p>{appointmentDate}</p>
                            <span>{appointmentTime}</span>
                        </div>
                        <div className="upcomming-card-status">
                            <p>{status}</p>
                        </div>
                        <div className="upcomming-card-notes">
                            <p>{isInitial ? 'Initial consultation' : 'Regular consultation'}</p>
                        </div>
                        <div className="upcomming-card-actions">
                            <button>Complete</button>
                            <button>Cancel</button>
                        </div>
                    </div>
    );
} 

export default UpcommingCard;