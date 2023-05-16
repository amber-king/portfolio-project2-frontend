import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        {" "}
       <Link to="/">🗿</Link> {" "}
      </h1>
      <h3>
        <Link to="/rocks">Rocks Log 🪨</Link>
      </h3>
      <button>
        <Link to="/rocks/new">New Rock</Link>
      </button>
    </nav>
  );
}
