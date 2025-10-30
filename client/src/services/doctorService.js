const END_POINT = "/api/doctor";

export async function createSchedule(payload) {
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

    console.log(data);
}