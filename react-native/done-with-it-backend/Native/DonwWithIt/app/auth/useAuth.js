import { useContext } from "react"
import JwtDecode from "jwt-decode";

import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const logIn = async (authToken) => {
        const user = JwtDecode(authToken)
        await setUser(user)
        await authStorage.storeToken(authToken);
    }
    const logOut = () => {
        setUser(null);
        authStorage.removeToken();
    }
    return { user, logIn, logOut }
}