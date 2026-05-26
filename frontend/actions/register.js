'use server';
import * as ThirdParty from "@/lib/auth";
import {decodeAndSetCookies} from "@/lib/server-utils";

export async function register(formData) {
    try {

        const registerResponse = await ThirdParty.Register(formData);
        const {email,username} = registerResponse;
        const  password = formData.password;
        // Now Login the user
        const response = await ThirdParty.Login({email,password});
        if (response.access && response.refresh) {

            const {username, email} = await decodeAndSetCookies(response.access, response.refresh);

            return {
                success: true,
                message: "Login successful",
                tokens: {accessToken: response.access, refreshToken: response.refresh},
                statusCode: 200,
                username: username,
            };
        }



    } catch (error) {
        const errorCode = error.response.status;
        let message = "";
        if (errorCode === 400) {
            message = "Duplicate email address or username or Password is too weak";
        }
        else if (errorCode === 401) {
            message = "Invalid email or password";
        } else {
            message = "Something went wrong. Please try again later";
        }
        // Return error response
        return {
            success: false,
            message: message,
            statusCode: errorCode
        };

    }
}