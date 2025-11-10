import App from "./App.jsx";
import Cart from "./components/Cart.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import Shop from "./components/Shop.jsx";
import { ENDPOINT } from "./libs/constants.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "shop",
        element: <Shop endpoint={ENDPOINT.NEW_RELEASES} />,
      },
      {
        path: "shop/new-releases",
        element: <Shop endpoint={ENDPOINT.NEW_RELEASES} />,
      },
      {
        path: "shop/best-sellers",
        element: <Shop endpoint={ENDPOINT.BEST_SELLERS} />,
      },
      {
        path: "shop/popular",
        element: <Shop endpoint={ENDPOINT.POPULAR} />,
      },
      {
        path: "shop/staff-picks",
        element: <Shop endpoint={ENDPOINT.STAFF_PICKS} />,
      },
      { path: "cart", element: <Cart /> },
      { path: "product", element: <Product /> },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
