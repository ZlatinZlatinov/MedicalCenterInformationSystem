import { Link } from "react-router";

function Footer() {
    return (
        <footer id="site-footer">
            <p>MediCare &copy; 2025</p>
            <ul>
                <li><Link to={'/become-a-doctor'} >Become A doctor</Link></li>
            </ul>
        </footer>
    );
} 

export default Footer;