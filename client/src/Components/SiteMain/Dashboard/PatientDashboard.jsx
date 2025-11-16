import { Search, Clock } from 'lucide-react';
import { Link } from 'react-router';

function PatientDashboard() {
    return (
        <>
            <div className="dash-card">
                <div className="card-header">
                    <Search color='#00d062' size={32} />
                    <h3 className="dash-card-title">Browse Doctors</h3>
                    <p className="dash-card-text">Find and book appointment with specialist</p>
                </div>
                <div className="card-content">
                    <Link to={'/appointments'} className='dash-card-btn'>Find Doctors</Link>
                </div>
            </div>

            <div className="dash-card">
                <div className="card-header">
                    <Clock size={32} color='#3c83f6' />
                    <h3 className="dash-card-title">Upcomming Appointments</h3>
                    <p className="dash-card-text">View your scheduled appointments</p>
                </div>
                <div className="card-content">
                    <Link to={'/schedule'} className='dash-card-btn'>View All</Link>
                </div>
            </div>
        </>
    );
}

export default PatientDashboard;