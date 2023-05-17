// TODO: -> http://localhost:3000/; navbar w/ home link, index log & new rock form button
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/">🗿</Link> | <Link to="/rocks">Rocks Log 🪨</Link>
      </h1>

      <button>
        <Link to="/rocks/new">New Rock</Link>
      </button>
    </nav>
  );
}
