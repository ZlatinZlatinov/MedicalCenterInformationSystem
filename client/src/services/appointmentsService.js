const END_POINT = "/api/appointments";

export async function bookAppointment(payload, accessToken) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
    });

    if (response.status !== 201) {
        throw new Error("Failed to book an appointment");
    }

    const data = await response.json();

    return data;
}

export async function getUpcommingAppointments(accessToken, doctorId, filter, path) {
    const query = path === 'doctor' ? 'filter' : 'status';
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + `/${path}/${doctorId}?${query}=${filter}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data;
}

export async function cancelAppointment(id, accessToken, reason = 'Cancelled by user') {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + `/${id}/cancel`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
    });

    const data = await response.json();

    return data;
}