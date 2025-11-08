import App from "./App.jsx";
import Cart from "./components/Cart.jsx";
import Shop from "./components/Shop.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
];

export default routes;
