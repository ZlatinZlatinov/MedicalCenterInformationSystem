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

export async function getAllDoctors(department, specialty) {
    let url = import.meta.env.VITE_SERVER_URL + END_POINT + '/';

    if (department) {
        url += `?department=${department}`;
    } else if (specialty) {
        url += `?specialty=${specialty}`
    }

    const response = await fetch(url);

    if (response.status !== 200) {
        throw new Error("Doctors not found");
    }

    const data = await response.json();
    return data;
}

export async function getDoctorById(doctorId) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + `/${doctorId}`);

    if (response.status !== 200) {
        throw new Error('Doctor Not Found!');
    }

    const data = await response.json();

    return data;
}

export async function registerDoctor(payload, accessToken) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/register', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: payload
    });

    if (response.status !== 200) {
        throw new Error("Failed to upload");
    }

    const data = await response.json();

    return data;
}

export async function getDoctorSchedule(doctorId, date) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + `/${doctorId}/schedule?date=${date}`);

    const data = await response.json();

    return data;
}