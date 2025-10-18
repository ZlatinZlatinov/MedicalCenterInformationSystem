import { Link } from 'react-router';

function NavBar() {
    return (
        <nav id='nav-bar'>
            <div className="site-logo">
             <Link to='/'>MediCare</Link>   
            </div> 

            <ul className="main-nav">
                <li><Link>Home</Link></li>
                <li><Link>About</Link></li>
                <li><Link>Contact</Link></li>
            </ul>

            <div className="auth-btns">
                <Link>Login</Link>
                <Link>Register</Link>
            </div>
        </nav>
    );
} 

export default NavBar;