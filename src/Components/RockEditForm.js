// TODO: http://localhost:3000/rocks/${id}/edit -> allows user to edit selected rock after clicking edit button
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import rocksData from "../rocksData";

export default function RockEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [changedRock, setChangedRock] = useState({
    name: "",
    element: "",
    where_found: "",
    color: "",
    texture: "",
    luster: "",
    hardness: false,
  });

  useEffect(() => {
    const fetchRockData = async () => {
      try {
        const response = await fetch(`http://localhost:7777/rocks/${id}`);
        if (response.ok) {
          const data = await response.json();
          setChangedRock(data);
        } else {
          const mockRock = rocksData.find(
            (mockRock) => mockRock.id === parseInt(id)
          );
          if (mockRock) {
            setChangedRock(mockRock);
          } else {
            console.error("Rock not found in mock data.");
          }
        }
      } catch (error) {
        console.log("Error fetching rock data - no backend present:", error);
      }
    };
    fetchRockData();
  }, [id]);

  const handleRockTextChange = (event) => {
    setChangedRock({ ...changedRock, [event.target.name]: event.target.value });
  };

  const handleHardnessCheckboxChange = (event) => {
    setChangedRock({ ...changedRock, hardness: !changedRock["hardness"] });
  };

  // PUT request using fetch with async/await
  // This sends the same PUT request using fetch, but this version uses an async function and the await javascript expression to wait for the promises to return (instead of using the promise then() method).
  // Helper Source -v
  // https://jasonwatmore.com/post/2021/09/20/fetch-http-put-request-examples#:~:text=PUT%20request%20using%20fetch%20with,then()%20method%20as%20above).
  const updateRock = async (updatedRock) => {
    try {
      const response = await fetch(`http://localhost:7777/rocks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRock),
      });
      if (response.ok) {
        navigate(`/rocks/${id}`);
      } else {
        console.error("Error updating rock on the server:", response.status);
      }
    } catch (error) {
      console.error("Error updating rock:", error);
    }
  };
  const handleRockSubmit = (event) => {
    event.preventDefault();
    updateRock(changedRock);
  };

  return (
    <div className="Edit">
      <form onSubmit={handleRockSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={changedRock.name}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Rock Name Here"
          required
        />
        <label htmlFor="element">Element:</label>
        <input
          id="element"
          value={changedRock.element}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Igneous? , Sedimentary?, Metamorphic?"
          required
        />
        <label htmlFor="where_found">Rock Location:</label>
        <input
          id="where_found"
          value={changedRock.where_found}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Where can you find this rock?..."
        />
        <label htmlFor="color">Color:</label>
        <input
          id="color"
          value={changedRock.color}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Best description of Rock Color"
        />
        <label htmlFor="texture">Textture:</label>
        <input
          id="texture"
          value={changedRock.texture}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Best description of texture"
        />
        <label htmlFor="luster">Luster:</label>
        <input
          id="luster"
          value={changedRock.luster}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Is the rock dull or not?...."
        />
        <label htmlFor="hardness">Hard = 🪨 OR Soft = ☁️ :</label>
        <select
          id="hardness"
          value={changedRock}
          onChange={handleHardnessCheckboxChange}
        >
          <option value="Hard">🪨</option>
          <option value="Soft">☁️</option>
        </select>
        <br />
        <input type="submit" />
      </form>
      <Link to={`/rocks/${id}`}>
        <center>
          <button>Nevermind!</button>
        </center>
      </Link>
    </div>
  );
}
