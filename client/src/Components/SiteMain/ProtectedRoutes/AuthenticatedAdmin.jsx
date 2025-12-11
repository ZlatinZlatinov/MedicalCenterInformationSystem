import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth'; 

function AuthenticatedAdmin() {
    const { authUserData } = useAuth();

    if (!authUserData.isLoggedIn || authUserData.role !== 'admin') {
        return <Navigate to='/login' />
    } 

    return <Outlet />
} 

export default AuthenticatedAdmin;