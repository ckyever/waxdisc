import "./App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <h1>WAXDISC</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
          <li>
            <Link to="cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;
