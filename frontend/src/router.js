import { createBrowserRouter } from "react-router-dom";
import axios from 'axios';
import Navbar from "./component/Navbar";
import Cart from "./pages/CartPage";
import Home from "./pages/HomePage";
import Product from "./pages/ProductPage";
import Products from "./pages/ProductsPage";
import SignIn from "./pages/signInPage";
import SignUp from "./pages/signUpPage";


const productsLoader = async () => {
    const response = await axios.get("http://localhost:8000/api/products")
    return response.data
}

const productLoader = async ({ params }) => {
    const { id } = params
    const response = await axios.get(`http://localhost:8000/api/products/${id}`)
    return response.data
}

const cartLoader = async () => {
    const sessionId = localStorage.getItem('sessionId')
    const response = await axios.get(`http://localhost:8000/api/cart/session/${sessionId}`)
    return response.data
}

const router = createBrowserRouter([
{
    element: <Navbar />,
    children: [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/products",
        children: [
        {
            index: true,
            element: <Products />,
            loader: productsLoader,
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
    ]
}
])

export default router