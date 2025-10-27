import { createContext } from "react";

export const UserContext = createContext({
    id: "",
    role: "",
    username: "Guest",
    email: "",
    accessToken: "",
    isLoggedIn: false,
});