import { Calendar } from 'lucide-react';

function UpcommingAppointments() {
    return (
        <section id="upcomming-appointments">
            <div className='upcomming-options'>
                <h2><Calendar size={24} color='#3c83f6'/> Upcomming appointments</h2>
                
                <select name="next-appointments" id="next-appointments">
                    <option value="today">Today</option>
                    <option value="week">Next Week</option>
                    <option value="month">Next Month</option>
                    <option value="all">All</option>
                </select>
            </div>

            <div className="upcomming-table">
                <div className="upcomming-table-header">
                    <ul>
                        <li>Patient</li>
                        <li>Date & Time</li>
                        <li>Status</li>
                        <li>Notes</li>
                        <li>Actions</li>
                    </ul>
                </div>

                <div className="upcomming-table-content">
                    <div className="upcomming-card">
                        <div className="upcomming-card-patient">
                            <p>John Cena</p>
                            <span>john_cena@wwe.com</span>
                        </div>
                        <div className="upcomming-card-date">
                            <p>11/21/2025</p>
                            <span>09:00:00</span>
                        </div>
                        <div className="upcomming-card-status">
                            <p>scheduled</p>
                        </div>
                        <div className="upcomming-card-notes">
                            <p>Regular checkup</p>
                        </div>
                        <div className="upcomming-card-actions">
                            <button>Complete</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default UpcommingAppointments;