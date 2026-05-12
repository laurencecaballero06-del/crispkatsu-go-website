import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import ProductListings from "./Pages/ProductListings";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Ourstory from "./Pages/Ourstory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // The Layout is the parent
    children: [
      {
         path: "/",
        element: <Ourstory/>,
      },
      {
        path: "/products",
        element: <ProductListings />,
      },
      {
        path: "products/:id", // Dynamic route for the details page
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    path: "/cart", // This renders inside the Layout's <Outlet /> at the root path
    element: <CartPage />,
  },
]);
