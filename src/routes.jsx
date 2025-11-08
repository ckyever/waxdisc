import App from "./App.jsx";
import Cart from "./components/Cart.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
