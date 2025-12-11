import { Link } from "react-router";
import { Activity } from "lucide-react";

function Footer() {
    return (
        <footer id="site-footer">
            <div className="footer-brand">
                <Link to='/'>
                    <Activity className='activity' />
                    <span>MediCare</span>
                </Link>
                <p className="footer-copy">Caring for you, every step of the way.</p>
            </div>

            <ul className="footer-nav">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/doctors'>Find a Doctor</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/become-a-doctor'>Become a Doctor</Link></li>
            </ul>

            <div className="footer-meta">
                <p>MediCare &copy; 2025</p>
                <p className="footer-links">
                    <Link to='/privacy'>Privacy</Link>
                    <span className="divider">|</span>
                    <Link to='/terms'>Terms</Link>
                </p>
            </div>
        </footer>
    );
} 

export default Footer;