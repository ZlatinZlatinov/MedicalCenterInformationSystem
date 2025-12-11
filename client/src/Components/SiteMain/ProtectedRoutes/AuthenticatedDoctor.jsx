import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth'; 

function AuthenticatedDoctor() {
    const { authUserData } = useAuth();

    if (!authUserData.isLoggedIn || authUserData.role !== 'doctor') {
        return <Navigate to='/login' />
    } 

    return <Outlet />
} 

export default AuthenticatedDoctor;