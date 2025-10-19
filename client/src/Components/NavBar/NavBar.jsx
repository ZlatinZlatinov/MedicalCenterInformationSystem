import { Link } from 'react-router';
import { Activity } from 'lucide-react';

function NavBar() {
    return (
        <header>
            <nav id='nav-bar'>
                <div className="site-logo">
                    <Link to='/'>
                        <Activity />
                        <span>MediCare</span>
                    </Link>
                </div>

                <ul className="main-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                </ul>

                <div className="auth-btns">
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;