function StaffCard({ username, type, email, specialization }) {
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
                <button>Approve</button>
                <button>Decline</button>
            </div>
        </div>
    );
}

export default StaffCard;