import { createBrowserRouter } from "react-router-dom";

import Navbar from "./component/Navbar";
import Cart from "./pages/CartPage";
import Product from "./pages/ProductPage";
import Products from "./pages/ProductsPage";
import Order from "./pages/OrderPage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import SignOut from "./pages/SignOutPage";

import { productLoader, productsByCategoryLoader, productsLoader } from "./services/ProductServiece";
import { cartLoader } from "./services/CartService";

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
                path: "/order",
                element: <Order />,
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
                path: "/signout",
                element: <SignOut />
            },
        ]
    }
])

export default router