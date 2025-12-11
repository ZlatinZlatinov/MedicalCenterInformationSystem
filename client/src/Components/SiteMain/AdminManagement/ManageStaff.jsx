import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Settings } from 'lucide-react';
import StaffCard from './StaffCard';
import { useAuth } from '../../../Hooks/useAuth';
import { getStaffByFilters } from '../../../services/staffService';

function ManageStaff() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [staff, setStaff] = useState([]);
    const { authUserData } = useAuth();

    const filter = searchParams.get('filter') || "pending";

    function handleOnchange(e) {
        setSearchParams({ filter: e.target.value });
    }

    useEffect(() => {
        async function fetchStaff() {
            try {
                const data = await getStaffByFilters(authUserData.accessToken, filter);
                setStaff(data);
            } catch (error) {
                console.error(error);
                alert("Fetching staff failed!");
            }
        }

        fetchStaff();
    }, [filter]);

    return (
        <section id="manage-staff" className='management-section'>
            <div className='management-options'>
                <h2><Settings size={24} color='#3c83f6' />Doctors & Staff</h2>

                <select
                    name="management-filter"
                    id="management-staff-filter"
                    value={filter}
                    onChange={handleOnchange}
                >
                    <option value="pending">Pending</option>
                    <option value="doctors">All Doctors</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                </select>
            </div>

            <div className="management-table">
                <div className="management-table-header">
                    <ul>
                        <li>Name</li>
                        <li>Type</li>
                        <li>Specialization</li>
                        <li>Email</li>
                        <li>Actions</li>
                    </ul>
                </div>

                <div className="management-table-content">
                    {staff[0] ? staff.map((s) => <StaffCard
                        key={s.userId}
                        username={s.username}
                        type={s.type}
                        email={s.email} specialization={s.specialization}
                        accessToken={authUserData.accessToken}
                        doctorId={s.doctorId} />)
                        : <p>No staff found by criteria: {filter}</p>
                    }

                </div>
            </div>
        </section>
    );
}

export default ManageStaff;