import axios from "axios";
import React, { useState, useEffect } from "react";
import Rock from "./Rock";

export default function Rocks() {
  const [rocks, setRocks] = useState([]);

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

  //   filter /sort feature here --v

  return (
    <div className="Rocks">
      <h3>
        <center>All Rocks</center>
      </h3>
      {/* Sort hook will be here  */}

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
