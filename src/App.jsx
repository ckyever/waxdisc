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
        </ul>
      </nav>
    </>
  );
}

export default App;
