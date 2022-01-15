import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

const CalculatedAsteroids = (props) => {
  const [biggest, setBiggest] = useState({});
  const [smallest, setSmallest] = useState({});
  const [closest, setClosest] = useState({});
  const [farthest, setFarthest] = useState({});

  useEffect(() => {
    fetchData(props.asteroids);
  }, [props.asteroids]);

  async function fetchData(asteroids) {
    let response = await axios.get(
      `http://localhost:9090/get-calculated-asteroids`
    );
    setBiggest(response.data.biggestAsteroid);
    setSmallest(response.data.smallestAsteroid);
    setClosest(response.data.closestAsteroid);
    setFarthest(response.data.farthestAsteroid);
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Grid item sm={12}>
            <div className="title-asteroid">The biggest !</div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {biggest.name?.replace(/[()]/g, "")}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {biggest.safe ? (
                <>
                  Safe <SentimentSatisfiedAltRoundedIcon />{" "}
                </>
              ) : (
                <>
                  Not safe <ReportProblemOutlinedIcon />
                </>
              )}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {biggest.distanceKm} Km to Earth
            </div>
          </Grid>
        </Grid>

        <Grid item sm={6}>
          <Grid item sm={12}>
            <div className="title-asteroid">The smallest !</div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {smallest.name?.replace(/[()]/g, "")}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {smallest.safe ? (
                <>
                  Safe <SentimentSatisfiedAltRoundedIcon />{" "}
                </>
              ) : (
                <>
                  Not safe <ReportProblemOutlinedIcon />
                </>
              )}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {smallest.distanceKm} Km to Earth
            </div>
          </Grid>
        </Grid>

        <Grid item sm={6}>
          <Grid item sm={12}>
            <div className="title-asteroid">The closest !</div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {closest.name?.replace(/[()]/g, "")}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {closest.safe ? (
                <>
                  Safe <SentimentSatisfiedAltRoundedIcon />{" "}
                </>
              ) : (
                <>
                  Not safe <ReportProblemOutlinedIcon />
                </>
              )}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {closest.distanceKm} Km to Earth
            </div>
          </Grid>
        </Grid>

        <Grid item sm={6}>
          <Grid item sm={12}>
            <div className="title-asteroid">The farthest !</div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {farthest.name?.replace(/[()]/g, "")}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {farthest.safe ? (
                <>
                  Safe <SentimentSatisfiedAltRoundedIcon />{" "}
                </>
              ) : (
                <>
                  Not safe <ReportProblemOutlinedIcon />
                </>
              )}
            </div>
          </Grid>

          <Grid item sm={12}>
            <div className="body-asteroid">
              {farthest.distanceKm} Km to Earth
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CalculatedAsteroids;
