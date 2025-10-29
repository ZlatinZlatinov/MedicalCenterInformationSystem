import { Routes, Route } from 'react-router';

import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import ContactPage from './ContactPage/ContactPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import VerifyEmail from './VerifyEmail/VerifyEmail';
import Dashboard from './Dashboard/Dashboard';

function SiteMain() {
    return (
        <main id="site-main">
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/verify-email' element={<VerifyEmail />} />
                <Route path='/dashboard' element={<Dashboard />} /> {/*Should be protected*/}
            </Routes>
        </main>
    );
}

export default SiteMain;