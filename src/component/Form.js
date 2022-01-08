import React, { useState, useContext } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Button, Grid, TextField, Alert } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import axios from "axios";
import AppContext from "../context/AppContext";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Form = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endDisabled, setEndDisabled] = useState(true);
  const [minDate, setMinDate] = useState(new Date(1900, 1, 1));
  const [maxDate, setMaxDate] = useState(new Date(2200, 1, 1));
  const [alert, setAlert] = useState(false);
  const { apiKey } = useContext(AppContext);

  const handleSubmit = () => {
    if (startDate === null || endDate === null) {
      setAlert(true);
      setTimeout(function () {
        setAlert(false);
      }, 3000);
      return;
    }
    fetchData();
  };

  async function fetchData() {
    props.setPeek(true);
    props.setIsLoading(true);

    let start = startDate?.toISOString().split("T")[0];
    let end = endDate?.toISOString().split("T")[0];
    let response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${apiKey}`
    );

    let date = new Date(startDate);
    let concatArray = [];
    let numberOfDays = endDate.getDate() - startDate.getDate() + 1;
    for (let i = 1; i <= numberOfDays; i++) {
      concatArray.push(
        response.data?.near_earth_objects[date.toISOString().split("T")[0]]
      );
      date.setDate(date.getDate() + 1);
    }
    props.sendAsteroids(concatArray.flat());
    props.setIsLoading(false);
  }

  const handleStartDateChange = (date) => {
    let dateClone = new Date(date);
    setStartDate(date);
    setEndDisabled(false);
    setMinDate(date);
    dateClone.setDate(dateClone.getDate() + 7);
    setMaxDate(dateClone);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      {alert ? (
        <Alert severity="error">Please select a start and an end date</Alert>
      ) : null}

      <ValidatorForm onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start date"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="dd-MM-yyyy"
              />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={endDisabled}
                minDate={minDate}
                maxDate={maxDate}
                openTo={minDate}
                label="End date"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="dd-MM-yyyy"
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button style={{ marginTop: "3%" }} variant="outlined" type="submit">
          Go !
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default Form;
