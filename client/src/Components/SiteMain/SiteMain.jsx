import { Routes, Route } from 'react-router';

import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import ContactPage from './ContactPage/ContactPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import VerifyEmail from './VerifyEmail/VerifyEmail';
import Dashboard from './Dashboard/Dashboard';
import DoctorSchedule from './DoctorSchedule/DoctorScheDule';
import DoctorDetails from './DoctorDetails/DoctorDetails';
import DoctorsList from './DoctorsList/DoctorsList';

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
                <Route path='/schedule' element={<DoctorSchedule />} /> {/*Should be protected*/}
                <Route path='/doctors' element={<DoctorsList />} />
                <Route path='/doctors/:doctorId' element={<DoctorDetails />} />
            </Routes>
        </main>
    );
}

export default SiteMain;