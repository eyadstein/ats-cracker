import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create axios instance with timeout
const apiClient = axios.create({
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function Login(formData) {
    try {
        const response = await apiClient.post(`${BACKEND_BASE_URL}/auth/login/`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function Register(formData) {
    try {
        const response = await apiClient.post(`${BACKEND_BASE_URL}/auth/register/`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function RefreshToken(refreshToken) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`${BACKEND_BASE_URL}/auth/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken.trim() }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Validate response before returning
        if (!response.ok) {
            throw new Error(`Refresh failed: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data?.access) {
            throw new Error("Invalid refresh response");
        }
        
        return data;
    } catch (error) {
        throw error;
    }
}

export async function GetCvList(accessToken, page = 1, limit = 10, offset = 0) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const url = `${BACKEND_BASE_URL}/api/cv/?limit=${limit}&offset=${offset}&page=${page}`;
        const response = await apiClient.get(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function CreateUpdateCv(accessToken, cvData) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        let url = `${BACKEND_BASE_URL}/api/cv/`;
        const isUpdate = cvData.id === "new";
        const method = isUpdate ? "POST" : "PUT";
        if (!isUpdate) url += cvData.id + '/';
        else delete cvData.id;
        
        const sendData = {
            ...cvData,
            data: JSON.stringify(cvData.data)
        };

        const response = await apiClient({
            method,
            url,
            headers,
            data: sendData
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function GetCv(accessToken, cvId) {
    try {
        // Validate cvId format to prevent injection
        if (!cvId || !/^[a-zA-Z0-9_-]+$/.test(String(cvId))) {
            throw new Error("Invalid CV ID format");
        }
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const url = `${BACKEND_BASE_URL}/api/cv/${cvId}/`;
        const response = await apiClient.get(url, { headers });
        return response.data;
    } catch (error) {
        throw error;
    }
}
