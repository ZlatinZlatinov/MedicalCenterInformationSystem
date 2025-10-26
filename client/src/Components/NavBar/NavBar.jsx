import { Link } from 'react-router';
import { Activity, User } from 'lucide-react';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';

function NavBar() {
    const { authUserData } = useContext(UserContext);

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
                    <Link to='/logout' className='btn orange-btn'>Logout</Link>
                </div> :
                <div className="auth-btns">
                    <Link to='/login' className='btn orange-btn'>Login</Link>
                    <Link to='/register' className='btn blue-btn'>Register</Link>
                </div>}
        </header>
    );
}

export default NavBar;