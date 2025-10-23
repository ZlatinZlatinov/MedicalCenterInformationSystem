import { Link } from 'react-router';
import { Activity } from 'lucide-react';

function NavBar() {
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

            <div className="auth-btns">
                <Link to='/login' className='btn orange-btn'>Login</Link>
                <Link to='/register' className='btn blue-btn'>Register</Link>
            </div>
        </header>
    );
}

export default NavBar;