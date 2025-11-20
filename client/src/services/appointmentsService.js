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