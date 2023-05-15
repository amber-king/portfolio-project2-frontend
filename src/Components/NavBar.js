import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>
        {" "}
        <Link to="/">Rock Dictionary 🗿</Link>{" "}
      </h1>
      <h3>
        <Link to="/rocks">Rocks 🪨</Link>
      </h3>
      <button className="">
        <Link to="/rocks/new">New Rock</Link>
      </button>
    </nav>
  );
}
