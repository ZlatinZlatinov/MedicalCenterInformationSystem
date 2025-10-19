import { Link } from 'react-router';

function NavBar() {
    return (
        <nav id='nav-bar'>
            <div className="site-logo">
             <Link to='/'>MediCare</Link>   
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
    );
} 

export default NavBar;