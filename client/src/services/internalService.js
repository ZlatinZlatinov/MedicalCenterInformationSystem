const END_POINT = '/api/internal';

export async function getSpecialtiesAndDepartments(accessToken) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/specialties-departments', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.status !== 200) {
        throw new Error("Failed to fetch departments and specialties");
    }

    const data = await response.json();
    return data;
}