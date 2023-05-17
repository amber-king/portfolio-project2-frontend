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

  const updateRock = (updatedRock, id) => {
    const method = {
      method: "PUT",
      body: JSON.stringify(updatedRock),
      header: { "Content-Type": "application/json" },
    };
    return fetch(`http://localhost:7777/rocks/${id}`, method)
      .then((response) => response.json())
      .then((response) => {
        navigate(`/rocks/${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRockTextChange = (event) => {
    setChangedRock({ ...changedRock, [event.target.id]: event.target.value });
  };

  const handleHardnessCheckboxChange = () => {
    setChangedRock({ ...changedRock, hardness: !changedRock.hardness });
  };

  useEffect(() => {
    fetch(`http://localhost:7777/rocks/${id}/`)
      .then((response) => response.json())
      .then((response) => {
        setChangedRock(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleRockSubmit = (event) => {
    event.preventDefault();
    updateRock(changedRock, id);
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
          required
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
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}
