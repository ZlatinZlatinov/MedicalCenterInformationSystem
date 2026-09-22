const END_POINT = '/api/document';

export async function uploadDocument(payload, accessToken) {
    const url = import.meta.env.VITE_SERVER_URL + END_POINT + '/'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: payload
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message);
    }

    return data;
}