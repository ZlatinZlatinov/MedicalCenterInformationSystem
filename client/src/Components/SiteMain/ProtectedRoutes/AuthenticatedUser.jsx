import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';

function AuthenticatedUser() {
    const { authUserData } = useAuth();

    if (!authUserData.isLoggedIn) {
        return <Navigate to='/login' />
    }

    return <Outlet />
} 

export default AuthenticatedUser;
