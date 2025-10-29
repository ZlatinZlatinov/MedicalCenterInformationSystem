import { Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router';

function Dashboard() {
    return (
        <section id="dashboard">
            <div className="dash-card">
                <div className="card-header">
                    <Calendar color='#00d062' size={32} />
                    <h3 className="dash-card-title">Today's Appointments</h3>
                    <p className="dash-card-text">0 appointments scheduled for today</p>
                </div>
                <div className="card-content">
                    <Link to={'/appointments'} className='dash-card-btn'>Appointments</Link>
                </div>
            </div>

            <div className="dash-card">
                <div className="card-header">
                    <Clock size={32} color='#3c83f6' />
                    <h3 className="dash-card-title">Manage Schedule</h3>
                    <p className="dash-card-text">Set your availability</p>
                </div>
                <div className="card-content">
                    <Link to={'/schedule'} className='dash-card-btn'>Schedule</Link>
                </div>
            </div>

            <div className="dash-card">
                <div className="card-header">
                    <Users size={32} color='#00d062' />
                    <h3 className="dash-card-title">Patients List</h3>
                    <p className="dash-card-text">0 patients under your care</p>
                </div>
                <div className="card-content">
                    <Link to={'/patients-list'} className='dash-card-btn'>My Patients</Link>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;