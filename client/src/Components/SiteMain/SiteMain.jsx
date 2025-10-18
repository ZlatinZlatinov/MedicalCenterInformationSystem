import { Routes, Route } from 'react-router';

import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import ContactPage from './ContactPage/ContactPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

function SiteMain() {
    return (
        <main id="site-main">
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </main>
    );
}

export default SiteMain;