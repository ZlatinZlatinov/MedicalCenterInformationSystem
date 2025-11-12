import { Link, useNavigate } from 'react-router';
import { Activity, User } from 'lucide-react';
import { logOutUser } from '../../services/authService';
import { useAuth } from '../../Hooks/useAuth';

function NavBar() {
    const navigate = useNavigate();
    const { authUserData, setAuthUserData } = useAuth();

    async function handleLogOut() {
        try {
            await logOutUser(authUserData.accessToken);

            setAuthUserData({});

            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <header id='site-header'>
            <div className="site-logo">
                <Link to='/'>
                    <Activity className='activity' />
                    <span>MediCare</span>
                </Link>
            </div>

            <nav id='nav-bar'>
                <ul className="main-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>
            </nav>

            {authUserData.isLoggedIn ?
                <div className='auth-btns'>
                    <Link to='/dashboard' className='profile-btn'><User size={20} /><span>{authUserData.username}</span></Link>
                    <button className='btn orange-btn' onClick={handleLogOut}>Logout</button>
                </div> :
                <div className="auth-btns">
                    <Link to='/login' className='btn orange-btn'>Login</Link>
                    <Link to='/register' className='btn blue-btn'>Register</Link>
                </div>}
        </header>
    );
}

export default NavBar;