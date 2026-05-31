'use server';
import * as ThirdParty from "@/lib/auth";
import { decodeAndSetCookies } from "@/lib/server-utils";

export async function register(formData) {
    try {
        // Validate input
        if (!formData?.email || !formData?.password || !formData?.username) {
            return {
                success: false,
                message: "All fields are required",
                statusCode: 400
            };
        }
        
        const registerResponse = await ThirdParty.Register(formData);
        const { email, username } = registerResponse;
        const password = formData.password;
        const response = await ThirdParty.Login({ email, password });
        
        if (response.access && response.refresh) {
            const { username, email } = await decodeAndSetCookies(response.access, response.refresh);
            return {
                success: true,
                message: "Login successful",
                tokens: { accessToken: response.access, refreshToken: response.refresh },
                statusCode: 200,
                username: username,
            };
        }
    } catch (error) {
        const errorCode = error?.response?.status || 500;
        let message = "Something went wrong. Please try again later";
        
        // Only expose safe error messages
        if (errorCode === 401) {
            message = "Invalid email or password";
        } else if (errorCode === 409) {
            message = "Email already exists";
        } else if (errorCode === 400) {
            message = "Invalid input data";
        }
        
        return {
            success: false,
            message: message,
            statusCode: errorCode
        };
    }
}
