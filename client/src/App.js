import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "./utils/Constants";

const App = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = () => {
    axios.defaults.baseURL = config.url.API_URL;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    axios
      .get("teams")
      .then((response) => {
        setTeams(response.data.teams);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <h1>Homepage</h1>

      {teams &&
        teams.map((team, index) => (
          <div key={index}>
            <h2>{team.name} </h2>

            <h4>ID: {team.id} </h4>
          </div>
        ))}
    </div>
  );
};

export default App;
