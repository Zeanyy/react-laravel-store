import axios from "axios";

export const productsLoader = async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1
    const name = url.searchParams.get('name')
    const response = await axios.get(`http://localhost:8000/api/products`, {
        params: {
            page: page,
            name: name,
        },
    })
    return response.data
}

export const productsByCategoryLoader = async ({ params, request }) => {
    const { id } = params
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || 1
    const name = url.searchParams.get('name')
    const response = await axios.get(`http://localhost:8000/api/products/category/${id}`, {
        params: {
            page: page,
            name: name,
        },
    })
    return response.data
}

export const productLoader = async ({ params }) => {
    const { id } = params
    const response = await axios.get(`http://localhost:8000/api/products/${id}`)
    return response.data
}