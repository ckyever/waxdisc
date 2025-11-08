import "./App.css";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <div className="app">
      <header>
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
      </header>
      <Outlet />
    </div>
  );
}

export default App;
