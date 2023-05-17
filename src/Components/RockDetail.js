// TODO: http://localhost:3000/rocks/${id} -> displays rock details the user selects
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function RockDetail() {
  const [rockList, setRockList] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:7777/rocks/${id}`)
      .then((response) => {
        //  console.log(response.data);
        setRockList(response.data);
      })
      .catch((error) => {
        console.warn("catch:", error);
      });
  }, [id]);

  function handleRockDelete(id) {
    return fetch(`http://localhost:7777/rocks/${id}`, { method: "DELETE" })
      .then(() => {
        navigate("/rocks");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <article className="Rock-Detail">
      <h1>
        {rockList.hardness ? <span>🪨</span> : <span>☁️</span>} {rockList.name}
      </h1>

      <hr></hr>

      <span>
        {" "}
        <center>
          <h4>
            Element: {rockList.element}
            <br></br>
            Rock's Location: {rockList.where_found}
            <br></br>
            Color: {rockList.color}
            <br></br>
            Texture: {rockList.texture}
            <br></br>
            Luster: {rockList.luster}
            <br></br>
          </h4>
        </center>
      </span>

      <center>
        <div className="rockNavigation">
          <Link to={`/rocks`}>
            <button>Back</button>
          </Link>
          <Link to={`/rocks/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button
            className="delete"
            onClick={() => handleRockDelete(rockList.id)}
          >
            Delete
          </button>
        </div>
      </center>
    </article>
  );
}
