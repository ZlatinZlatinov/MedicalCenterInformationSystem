import { Calendar } from 'lucide-react';
import UpcommingCard from './UpcommingCard';

function DoctorUpcomming({filter, handleOnchange, appointments, accessToken}) {
    return (
        <section id="upcomming-appointments" className='management-section'>
            <div className='management-options'>
                <h2><Calendar size={24} color='#3c83f6' /> Upcomming appointments</h2>

                <select
                    name="upcomming-filter"
                    id="upcomming-filter"
                    value={filter}
                    onChange={(e) => handleOnchange(e.target.value, 'filter')}
                >
                    <option value="today">Today</option>
                    <option value="week">Next Week</option>
                    <option value="month">Next Month</option>
                    <option value="all">All</option>
                </select>
            </div>

            <div className="management-table">
                <div className="management-table-header">
                    <ul>
                        <li>Patient</li>
                        <li>Date & Time</li>
                        <li>Status</li>
                        <li>Notes</li>
                        <li>Actions</li>
                    </ul>
                </div>

                <div className="management-table-content">
                    {appointments[0] ? appointments.map((app) => {
                        return (<UpcommingCard key={app.id}
                            username={app.username}
                            email={app.email}
                            appointmentDate={app.appointmentDate}
                            appointmentTime={app.appointmentTime}
                            status={app.status}
                            isInitial={app.isInitial}
                            appointmentId={app.id}
                            accessToken={accessToken}
                        />);
                    }) : <p>No appointments found</p>}
                </div>
            </div>
        </section>
    );
} 

export default DoctorUpcomming;