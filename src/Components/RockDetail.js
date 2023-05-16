import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function RockDetail() {
  const [rockList, setRockList] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:7777/rocks/${id}`)
      .then((response) => {
        console.log(response.data);
        setRockList(response.data);
      })
      .catch((error) => {
        console.warn("catch:", error);
      });
  }, [id]);

  return (
    <article className="Rock-Detail">
      <h1>
        {rockList.hardness ? <span>🪨</span> : <span>☁️</span>} {rockList.name}
      </h1>
      <hr></hr>
   
        <span>
          {" "}
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
          <button>Delete</button>
        </div>
      </center>
    </article>
  );
}
