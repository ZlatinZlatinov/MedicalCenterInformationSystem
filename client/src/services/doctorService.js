const END_POINT = "/api/doctor";

export async function createSchedule(payload) { //TODO: Add authorization header
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/schedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.status !== 200) {
        throw new Error("Oops, something went wrong");
    }

    const data = await response.json();
    return data;
}

export async function getAllDoctors() {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/')

    if (response.status !== 200) {
        throw new Error("Doctors not found");
    }

    const data = await response.json();
    return data;
}