import { createContext } from "react";

export const UserContext = createContext({
    username: "Guest",
    email: "",
    accessToken: "",
    isLoggedIn: false,
});