// TODO: http://localhost:3000/rocks/${id}/edit -> allows user to edit selected rock after clicking edit button
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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

  // PUT request using fetch with async/await
  // This sends the same PUT request using fetch, but this version uses an async function and the await javascript expression to wait for the promises to return (instead of using the promise then() method).
  // Helper Source -v
  // https://jasonwatmore.com/post/2021/09/20/fetch-http-put-request-examples#:~:text=PUT%20request%20using%20fetch%20with,then()%20method%20as%20above).
  const updateRock = async (updatedRock) => {
    const response = await fetch(`http://localhost:7777/rocks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRock),
    });
    if (response.ok) {
      navigate(`/rocks/${id}`);
    }
  };
  const handleRockTextChange = (event) => {
    setChangedRock({ ...changedRock, [event.target.id]: event.target.value });
  };

  const handleHardnessCheckboxChange = () => {
    setChangedRock({ ...changedRock, hardness: !changedRock.hardness });
  };

  useEffect(() => {
    fetch(`http://localhost:7777/rocks/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setChangedRock(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
          placeholder="Best description pf Rock Color"
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
        <label htmlFor="hardness">Hard = ✅ or Soft = No Check:</label>
        <input
          id="hardness"
          value={changedRock.hardness}
          type="checkbox"
          onChange={handleHardnessCheckboxChange}
          checked={changedRock.hardness}
        />
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
