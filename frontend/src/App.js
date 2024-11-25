import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
                const response = await fetch("http://localhost:8000/api/products")
                return response.json()
              }
            },
            {
              path: ":id",
              element: <Product />,
              loader: async ({ params }) => {
                const { id } = params;
                const response = await fetch(`http://localhost:8000/api/products/${id}`);
                return response.json();
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