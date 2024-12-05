import axios from "axios"

const apiUrl = 'http://localhost:8000/api/order'

export const validateOrder = async (formData) => {
    try {
        await axios.post(`${apiUrl}/validate`, formData)
    } catch (error) {
        if (error.response?.data?.errors) {
            throw error.response.data
        }
        throw new Error('Spróbuj ponownie później.')
    }
}

export const submitOrder = async (request, token) => {
    try {
        if (token) {
            await axios.post(`${apiUrl}/user`, request, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
        } else {
            await axios.post(`${apiUrl}/guest`, request);
        }
    } catch (error) {
        throw error.response.data || new Error('Błąd podczas składania zamówienia.')
    }
}