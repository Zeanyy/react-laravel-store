import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import Navbar from "./component/Navbar";
import Cart from "./pages/CartPage";
import Home from "./pages/HomePage";
import Product from "./pages/ProductPage";
import Products from "./pages/ProductsPage";


function App() {
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
              loader: async () => {
                const response = await axios.get("http://localhost:8000/api/products")
                return response.data
              }
            },
            {
              path: ":id",
              element: <Product />,
              loader: async ({ params }) => {
                const { id } = params
                const response = await axios.get(`http://localhost:8000/api/products/${id}`)
                return response.data
              }
            },
          ],
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;