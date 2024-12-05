import axios from "axios";
import { checkLogin } from "./AuthService";

const apiUrl = 'http://localhost:8000/api/cart'

export const removeItem = async (cartId, productId) => {
    try {
        await axios.delete(`${apiUrl}/${cartId}/remove/${productId}`);
    } catch (error) {
        throw error.response.data || 'Błąd podczas usuwania produktu.'
    }
}

export const updateQuantity = async (cartId, productId, quantity) => {
    try {
        await axios.put(`${apiUrl}/${cartId}/update/${productId}/${quantity}`);
    } catch (error) {
        throw error.response.data || 'Błąd podczas akutalizacji ilości produktu.'
    }
}

export const cartLoader = async () => {
    if (await checkLogin()) {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8000/api/cart/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response.data
    } else {
        const sessionId = localStorage.getItem('sessionId')
        const response = await axios.get(`http://localhost:8000/api/cart/session/${sessionId}`)
        return response.data
    }
}
