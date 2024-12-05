import axios from "axios";

const apiUrl = 'http://localhost:8000/api'

export const signIn = async (formData) => {
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        })
        const response = await axios.post(`${apiUrl}/login`, formData)
        return response.data

    } catch (error) {
        if (error.response?.data?.errors) {
            throw error.response.data;
        }
        throw new Error('Spróbuj ponownie później.')
    }
}

export const signOut = async (token) => {
    try {
        const response = await axios.get(`${apiUrl}/logout`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data

    } catch (error) {
        throw error
    }
}

export const signUp = async (formData) => {
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        })

        const response = await axios.post(`${apiUrl}/register`, formData)
        return response.data
        
    } catch(error) {
        if (error.response?.data?.errors) {
            throw error.response.data
        }
        throw new Error('Spróbuj ponownie później.')
    }
}

export const checkLogin = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            return false
        }
        const response = await axios.get(`${apiUrl}/checkLogin`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response.status === 200
    } catch (error) {
        return false
    }
}