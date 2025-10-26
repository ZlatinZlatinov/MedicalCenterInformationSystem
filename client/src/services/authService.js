const END_POINT = "/api/auth";

export async function loginUser(userData) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (response.status !== 200) {
        throw new Error("Login failed!");
    }

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);

    return data;
}

export async function registerUser(userData) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (response.status !== 201) {
        throw new Error(data.message);
    }
}

export async function logOutUser(token) {
    console.log("Not implemented yet :(");
}

export async function verifyEmail(verificationToken) {
    const response = await fetch(import.meta.env.VITE_SERVER_URL + END_POINT + '/verify-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verificationToken })
    });

    if (response.status !== 202) {
        throw new Error("Email verification failed!");
    }
}