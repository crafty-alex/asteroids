import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import "./App.css";
import Form from "./component/Form";
import AppContext from "./context/AppContext";
import PaginationTable from "./component/PaginationTable";
import Background from "./assets/background.mp4";
import CalculatedAsteroids from "./component/CalculatedAsteroids";
import axios from "axios";

const apiKey = "Ec7YsOvv7of2KXGtfrijNur4hsbaxgKUTohkK01f";

const App = () => {
  const [peek, setPeek] = useState(false);
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendAsteroids = (data) => {
    setAsteroids(data);
  };

  useEffect(() => {
    saveAsteroids(asteroids);
  }, [asteroids]);

  async function saveAsteroids(asteroids) {
    let asteroidsWrapper = {};

    let asteroidList = [];

    asteroids.forEach((item) => {
      let asteroid = {};
      asteroid.name = item.name;
      asteroid.safe = !item.is_potentially_hazardous_asteroid;
      asteroid.diameterKm =
        item.estimated_diameter.kilometers.estimated_diameter_max;
      asteroid.diameterM =
        item.estimated_diameter.meters.estimated_diameter_max;
      asteroid.distanceKm = parseFloat(
        item.close_approach_data[0].miss_distance.kilometers
      );
      asteroid.date = new Date(item.close_approach_data[0].close_approach_date);
      asteroidList.push(asteroid);
    });

    asteroidsWrapper.asteroidDTOList = asteroidList;

    await axios.post(`http://localhost:9090/save-asteroids`, asteroidsWrapper);
  }

  return (
    <>
      <video autoPlay loop muted>
        <source src={Background} type="video/mp4" />
      </video>

      <div className="body-content" style={{ height: peek ? "190vh" : "50vh" }}>
        <AppContext.Provider value={{ apiKey }}>
          <Grid container spacing={2}>
            <Grid item sm={4} />

            <Grid item xs={12} sm={4}>
              <Card
                style={{
                  opacity: 0.8,
                  marginTop: "20%",
                }}
              >
                <CardContent>
                  <Typography
                    style={{
                      fontSize: 30,
                      marginBottom: "3%",
                    }}
                  >
                    Choose a start date
                  </Typography>
                  <Form
                    sendAsteroids={sendAsteroids}
                    setIsLoading={setIsLoading}
                    setPeek={setPeek}
                  />
                </CardContent>
              </Card>
            </Grid>

            {peek ? (
              <>
                <Grid style={{ marginTop: "2%" }} item xs={12}>
                  <Card
                    style={{
                      opacity: 0.8,
                    }}
                  >
                    <CardContent>
                      <Typography style={{ fontSize: 40, marginBottom: "3%" }}>
                        Asteroids just passing by
                      </Typography>
                      {isLoading ? (
                        <div>
                          <CircularProgress />
                          <div>Calling NASA to fetch the data ...</div>
                        </div>
                      ) : (
                        <PaginationTable asteroids={asteroids} />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </>
            ) : null}

            {asteroids.length > 0 ? (
              <Grid style={{ marginTop: "2%" }} item xs={12}>
                <Card
                  style={{
                    opacity: 0.8,
                    marginBottom: "5%",
                  }}
                >
                  <CardContent>
                    <Typography style={{ fontSize: 40, marginBottom: "3%" }}>
                      So... what are we dealing with ?
                    </Typography>
                    {isLoading ? null : (
                      <CalculatedAsteroids asteroids={asteroids} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ) : null}
          </Grid>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default App;
