// TODO: http://localhost:3000/rocks/${id} -> displays rock details the user selects
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import rocksData from "../rocksData";

export default function RockDetail() {
  const [rockList, setRockList] = useState(null);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7777/rocks/${id}`)
      .then((response) => {
        //  console.log(response.data);
        setRockList(response.data);
      })
      .catch((error) => {
        console.warn("catch:", error);
        const rocksDataItem = rocksData.find(
          (mockRock) => mockRock.id === parseInt(id)
        );
        setRockList(rocksDataItem);
      });
  }, [id]);

  // DELETE handle to remove a rock from the index & navigates you back to the rock index; /rocks
  // https://jasonwatmore.com/post/2020/11/11/react-fetch-http-delete-request-examples
  // This sends an HTTP DELETE request to the JSONPlaceholder api which is a fake online REST api that includes a /posts/:id route that responds to DELETE requests with a HTTP response. When the response is received the React component displays the status message 'Delete successful'.
  const handleRockDelete = async () => {
    try {
      if (!rockList) {
        return;
      }
      console.log("Deleting rock with ID:", rockList.id);
      const response = await fetch(
        `http://localhost:7777/rocks/${rockList.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Rock deleted successfully");
        navigate("/rocks");
      } else {
        console.error("Error deleteing rock", response.status);
      }
    } catch (error) {
      console.error("Error deleteing rock: no backend connected", error);
    }
  };

  if (!rockList) {
    return <div>Loading...</div>;
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
