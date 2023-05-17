// TODO: http://localhost:3000/rocks/new-> shows new form for user to add a rock;needs work
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RockNewForm() {
  let navigate = useNavigate();

  const [newRock, setNewRock] = useState({
    name: "",
    element: "",
    where_found: "",
    color: "",
    texture: "",
    luster: "",
    hardness: false,
  });

  const newAddedRock = (addedRock) => {
    const method = {
      method: "POST",
      body: JSON.stringify(addedRock),
      header: { "Content-Type": "application/json" },
    };
    return fetch(`http://localhost:7777/rocks/`, method)
      .then((response) => response.json())
      .then((response) => {
        navigate(`/rocks/${response.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRockTextChange = (event) => {
    setNewRock({ ...newRock, [event.target.id]: event.target.value });
  };

  const handleHardnessCheckboxChange = () => {
    setNewRock({ ...newRock, hardness: !newRock.hardness });
  };

  const handleRockSubmit = (event) => {
    event.preventDefault();
    newAddedRock();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleRockSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={newRock.name}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Rock Name Here"
          required
        />
        <label htmlFor="element">Element:</label>
        <input
          id="element"
          value={newRock.element}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Igneous? , Sedimentary?, Metamorphic?"
          required
        />
        <label htmlFor="where_found">Rock Location:</label>
        <input
          id="where_found"
          value={newRock.where_found}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Where can you find this rock?..."
        />
        <label htmlFor="color">Color:</label>
        <input
          id="color"
          value={newRock.color}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Best description pf Rock Color"
        />
        <label htmlFor="texture">Textture:</label>
        <input
          id="texture"
          value={newRock.texture}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Best description of texture"
        />
        <label htmlFor="luster">Luster:</label>
        <input
          id="luster"
          value={newRock.luster}
          type="text"
          onChange={handleRockTextChange}
          placeholder="Is the rock dull or not?...."
          required
        />
        <label htmlFor="hardness">Hard🪨 = ✅ or Soft☁️ = No Check:</label>
        <input
          id="hardness"
          value={newRock.hardness}
          type="checkbox"
          onChange={handleHardnessCheckboxChange}
          checked={newRock.hardness}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
