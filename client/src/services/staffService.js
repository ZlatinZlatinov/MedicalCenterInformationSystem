const END_POINT = "/api/admin";

export async function getStaffByFilters(accessToken, filter) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + `/staff?filter=${filter}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data;
}