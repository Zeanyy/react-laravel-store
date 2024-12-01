import { createBrowserRouter } from "react-router-dom";
import axios from 'axios';

import Navbar from "./component/Navbar";
import Cart from "./pages/CartPage";
//import Home from "./pages/HomePage";
import Product from "./pages/ProductPage";
import Products from "./pages/ProductsPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import SignOut from "./pages/SignOutPage";

const productsLoader = async () => {
    const response = await axios.get("http://localhost:8000/api/products")
    return response.data
}

const productsByCategoryLoader = async ({ params }) => {
    const { id } = params
    const response = await axios.get(`http://localhost:8000/api/products/category/${id}`)
    return response.data
}

const productLoader = async ({ params }) => {
    const { id } = params
    const response = await axios.get(`http://localhost:8000/api/products/${id}`)
    return response.data
}

const cartLoader = async () => {
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

const checkLogin = async () => {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            return false
        }
        const response = await axios.get('http://localhost:8000/api/checkLogin', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        return response.status === 200
    } catch (error) {
        return false
    }
}

const router = createBrowserRouter([
{
    element: <Navbar />,
    children: [
    {
        path: "/",
        element: <Products />,
        loader: productsLoader,
    },
    {
        path: "/products",
        children: [
        {
            path: "category/:id",
            element: <Products />,
            loader: productsByCategoryLoader,
        },
        {
            path: ":id",
            element: <Product />,
            loader: productLoader,
        },
        ],
    },
    {
        path: "/cart",
        element: <Cart />,
        loader: cartLoader,
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path:"/signout",
        element: <SignOut />
    }
    ]
}
])

export default router