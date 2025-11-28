import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getUpcommingAppointments } from '../../../services/appointmentsService';
import { useAuth } from '../../../Hooks/useAuth';
import DoctorUpcomming from './DoctorUpcomming';
import UserUpcomming from './UserUpcomming';

function UpcommingAppointments() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [appointments, setAppointments] = useState([]);
    const { authUserData } = useAuth();

    const query = searchParams.get('filter') || searchParams.get('status') ||
        (authUserData.role === 'doctor' ? 'today' : 'confirmed');
    const path = authUserData.role === 'doctor' ? 'doctor' : 'patient';

    function handleOnchange(value, queryOptions) {
        setSearchParams({ [queryOptions]: value });
    }

    useEffect(() => {
        async function fetchUpcommingAppointments() {
            try {
                const data = await getUpcommingAppointments(authUserData.accessToken, authUserData.id, query, path);
                setAppointments(data);
            } catch (error) {
                console.error(error);
                alert("Fetching appointments failed!");
            }
        }

        fetchUpcommingAppointments();
    }, [query]);

    return (
        path === 'doctor' ? <DoctorUpcomming filter={query} handleOnchange={handleOnchange} appointments={appointments} />
            : < UserUpcomming handleOnchange={handleOnchange} status={query} appointments={appointments} />
    );
}

export default UpcommingAppointments;