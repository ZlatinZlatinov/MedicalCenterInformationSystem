import { Link } from 'react-router';
import { User, Stethoscope, Building, Shield } from 'lucide-react';

function AdminDashboard() {
    return (
        <>
            <div className="dash-card">
                <div className="card-header">
                    <User color='#00d062' size={32} />
                    <h3 className="dash-card-title">Manage Users</h3>
                    <p className="dash-card-text">Add and configure user accounts</p>
                </div>
                <div className="card-content">
                    <Link to={'/manage-users'} className='dash-card-btn'>Manage Users</Link>
                </div>
            </div> 

            <div className="dash-card">
                <div className="card-header">
                    <Stethoscope color='#3c83f6' size={32} />
                    <h3 className="dash-card-title">Doctors & Staff</h3>
                    <p className="dash-card-text">Manage medical staff</p>
                </div>
                <div className="card-content">
                    <Link to={'/manage-staff'} className='dash-card-btn'>Manage Staff</Link>
                </div>
            </div> 

            <div className="dash-card">
                <div className="card-header">
                    <Building color='#00d062' size={32} />
                    <h3 className="dash-card-title">Departments</h3>
                    <p className="dash-card-text">Configure departments and specialties</p>
                </div>
                <div className="card-content">
                    <Link to={'/manage-departments'} className='dash-card-btn'>Manage Departments</Link>
                </div>
            </div> 

            <div className="dash-card">
                <div className="card-header">
                    <Shield color='#3c83f6' size={32} />
                    <h3 className="dash-card-title">Access Control</h3>
                    <p className="dash-card-text">Manage User permissions</p>
                </div>
                <div className="card-content">
                    <Link to={'/access-control'} className='dash-card-btn'>Configure Access</Link>
                </div>
            </div>
        </>
    ); 
} 

export default AdminDashboard;