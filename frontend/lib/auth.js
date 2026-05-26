import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function Login(formData) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/login/`, formData);
        return response.data
    } catch (error) {
        throw error;
    }
}

export async function Register(formData) {
    try {
        const response = await axios.post(`${BACKEND_BASE_URL}/auth/register/`, formData);
        return response.data
    } catch (error) {
        throw error;
    }
}


export async function RefreshToken(refreshToken) {
   try {
       const response = await fetch(`${BACKEND_BASE_URL}/auth/refresh/`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({refresh: refreshToken.trim()}),
       })
         return response.json();
   }
    catch (error) {
         throw error;
    }
}



export async function GetCvList(accessToken, page = 1,limit = 10, offset = 0) {
    // formData
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const url = `${BACKEND_BASE_URL}/api/cv/?limit=${limit}&offset=${offset}&page=${page}`;
        const response = await axios.get(url, { headers });
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
        if(!isUpdate) url += cvData.id + '/';
        else delete cvData.id;
        const sendData = {
            ...cvData,
            data: JSON.stringify(cvData.data)
        }

        const response = await axios({
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
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        };
        const url = `${BACKEND_BASE_URL}/api/cv/${cvId}/`;
        const response = await axios.get(url, { headers });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}