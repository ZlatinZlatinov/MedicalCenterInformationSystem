import { useAuth } from '../../../Hooks/useAuth';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard'; 
import { DockIcon } from 'lucide-react';
import { Link } from 'react-router';

function Dashboard() {
    const { authUserData } = useAuth();

    return (
        <section id="dashboard">
            {authUserData.role === 'user' && <PatientDashboard />}
            {authUserData.role === 'doctor' && <DoctorDashboard />}
            {authUserData.role === 'admin' && <AdminDashboard />} 

            <div className="dash-card">
                <div className="card-header">
                    <DockIcon color='#00d062' size={32} />
                    <h3 className="dash-card-title">My Documents</h3>
                    <p className="dash-card-text">Find and upload documents.</p>
                </div>
                <div className="card-content">
                    <Link to={'/my-documents'} className='dash-card-btn'>My Documents</Link>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;