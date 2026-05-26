import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";

export const getEmailAndName = () => {
    const email = Cookies.get('email');
    const username = Cookies.get('username');
    return { email, username, isAuthenticated: email !== undefined};
}

export const decodeJWT = (token) => {
    return jwtDecode(token);
}

const convertUnixToDateTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
    return date;
};

export const getTimeDifference = (unixTimestamp) => {
    const currentTime = new Date();
    const givenTime = convertUnixToDateTime(unixTimestamp);
    const diffInMilliseconds = givenTime - currentTime;
    return diffInMilliseconds / 1000;
};

