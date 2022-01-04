import React, { useState } from "react";
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

const apiKey = "Ec7YsOvv7of2KXGtfrijNur4hsbaxgKUTohkK01f";

const App = () => {
  const [peek, setPeek] = useState(false);
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendAsteroids = (data) => {
    setAsteroids(data);
  };

  return (
    <>
      <video autoPlay loop muted>
        <source src={Background} type="video/mp4" />
      </video>

      <div className="body-content">
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
            ) : null}
          </Grid>
        </AppContext.Provider>
      </div>
    </>
  );
};

export default App;
