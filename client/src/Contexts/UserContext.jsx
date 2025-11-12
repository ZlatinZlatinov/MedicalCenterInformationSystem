import { createContext, useState, useEffect, useMemo } from "react";

export const UserContext = createContext();
//TODO: create user persisted state, when user refreshes the page
function AuthProvider({ children }) {
    const [authUserData, setAuthUserData_] = useState({
        id: '',
        role: '',
        email: '',
        username: '',
        isLoggedIn: false,
        accessToken: sessionStorage.getItem("accessToken")
    });

    const setAuthUserData = (newState) => {
        if (newState) {
            setAuthUserData_(newState);
        } else {
            setAuthUserData_({
                id: '',
                role: '',
                email: '',
                isLoggedIn: false,
                accessToken: sessionStorage.getItem("accessToken")
            })
        }
    }

    useEffect(() => {
        if (authUserData.accessToken) {
            sessionStorage.setItem("accessToken", authUserData.accessToken);
        } else {
            sessionStorage.removeItem("accessToken");
        }
    }, [authUserData]);

    const contextValue = useMemo(() => ({
        authUserData,
        setAuthUserData
    }), [authUserData])

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
}

export default AuthProvider;