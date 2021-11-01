import * as SecureStorage from 'expo-secure-store';
import JwtDecode from 'jwt-decode';

const key = "authToken";

const storeToken = async authToken => {
    try {
        await SecureStorage.setItemAsync(key, authToken);
    } catch (error) {
        console.log("Error storing the authToken", error);
    }
}

const getToken = async () => {
    try {
        return await SecureStorage.getItemAsync(key);
    } catch (error) {
        console.log("Error getting the authToken", error);
    }
}

const getUser = async () => {
    const token = await getToken();
    return token ? JwtDecode(token) : null
}

const removeToken = async () => {
    try {
        await SecureStorage.deleteItemAsync(key);
    } catch (error) {
        console.log("Error removing the authToken", error);
    }
}

export default {
    getUser,
    removeToken,
    storeToken,
    getToken,
}