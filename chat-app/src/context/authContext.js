import { createContext } from "react";
import useGlobalState from "../reducers/authReducer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    return (
        <AuthContext.Provider value={useGlobalState()}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;