import {jwtDecode} from "jwt-decode";

export function validateToken(token) {
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        //check if token is still valid or not
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.log('Token expired');
            return null;
        }
        return decoded;
    } catch (e) {
        console.error('Token decoding failed', e);
        return null;
    }
}