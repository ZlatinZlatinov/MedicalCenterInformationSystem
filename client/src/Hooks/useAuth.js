import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export function useAuth() {
    return useContext(UserContext);
}