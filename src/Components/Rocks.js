// TODO: http://localhost:3000/rocks -> connects to the rocks log/index page
// ? Filter Note -> person must refresh the page in order to search a new element
import axios from "axios";
import React, { useState, useEffect } from "react";
import Rock from "./Rock";

export default function Rocks() {
  const [rocks, setRocks] = useState([]); // state to help show all rocks
  const [element, setElement] = useState([]); // state to help filter element of rocks
  
  // filter of element type for the rocks
  function filterElements(search, element) {
    return element.filter((element) => {
      return element.element.toLowerCase().includes(search.toLowerCase());
    });
  }
  // handle change to allow user to search for rock by element via a search engine
  function handleElementChange(event) {
    setElement(event.target.value);
    const result = event.target.value.length
      ? filterElements(event.target.value, rocks)
      : rocks;

    setRocks(result);
  }

  // the effect that fetches all rock index to display on index page
  useEffect(() => {
    axios
      .get(`http://localhost:7777/rocks`)
      .then((response) => {
        setRocks(response.data);
      })
      .catch((error) => {
        console.warn("catch", error);
      });
  }, []);

  return (
    <div className="Rocks">
      <h3>
        <center>All Rocks</center>
        <hr></hr>
      </h3>
      {/* Filter by element search engine */}
      <label htmlFor="setElement">
        Search by Element:
        <input
          type="text"
          value={element}
          id="setElement"
          onChange={handleElementChange}
          placeholder="What is the Rock Element?"
        />
      </label>
      <section>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Element</th>
              <th>Rock's Location</th>
              <th>Color</th>
              <th>Texture</th>
              <th>Luster</th>
              <th>Hard or Soft?</th>
            </tr>
          </thead>

          <tbody>
            {rocks.map((rock) => {
              return <Rock key={rock.id} rock={rock} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
