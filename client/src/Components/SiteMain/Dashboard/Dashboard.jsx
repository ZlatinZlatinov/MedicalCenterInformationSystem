import { useAuth } from '../../../hooks/useAuth';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
    const { authUserData } = useAuth();

    return (
        <section id="dashboard">
            {authUserData.role === 'patient' && <PatientDashboard />}
            {authUserData.role === 'doctor' && <DoctorDashboard />}
            {authUserData.role === 'admin' && <AdminDashboard />}
        </section>
    );
}

export default Dashboard;