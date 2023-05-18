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

  // similiar to PUT async/await fetch method in edit forms but for POST/add a rock feature
  const newAddedRock = async (addedRock) => {
    const result = await fetch(`http://localhost:7777/rocks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addedRock),
    });
    if (result.ok) {
      navigate(`/rocks`);
    }
  };
  const handleRockTextChange = (event) => {
    setNewRock({ ...newRock, [event.target.id]: event.target.value });
  };

  const handleHardnessCheckboxChange = () => {
    setNewRock({ ...newRock, hardness: !newRock.hardness });
  };

//   when placing the POST feature onto the SUBMIT , set the post to the state for a new rock/new added data
  const handleRockSubmit = (event) => {
    event.preventDefault();
    newAddedRock(newRock);
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
          placeholder="Best description of Rock Color"
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
