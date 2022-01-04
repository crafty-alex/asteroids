import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import Asteroid from "../assets/asteroid.gif";

const PaginationTable = (props) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [asteroid, setAsteroid] = useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setAsteroids(props.asteroids);
  }, [props.asteroids, asteroids]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (subscriber) => {
    setAsteroid(subscriber);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-full overflow-auto">
      <Table className="whitespace-pre">
        <TableHead>
          <TableRow>
            <TableCell className="px-0">Name</TableCell>
            <TableCell className="px-0">Safe or not ?</TableCell>
            <TableCell className="px-0">Diameter (meters)</TableCell>
            <TableCell className="px-0">Diameter (kilometers)</TableCell>
            <TableCell className="px-0">
              Distance to Earth (kilometers)
            </TableCell>
            <TableCell className="px-0">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asteroids
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber) => (
              <TableRow
                key={subscriber.name}
                onClick={() => handleClickOpen(subscriber)}
              >
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber?.name.replace(/[()]/g, "")}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber?.is_potentially_hazardous_asteroid?.toString() ===
                  "True" ? (
                    <ReportProblemOutlinedIcon />
                  ) : (
                    <SentimentSatisfiedAltRoundedIcon />
                  )}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {
                    subscriber?.estimated_diameter?.meters
                      ?.estimated_diameter_max
                  }
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {
                    subscriber?.estimated_diameter?.kilometers
                      ?.estimated_diameter_max
                  }
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber?.close_approach_data[0].miss_distance?.kilometers}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {subscriber?.close_approach_data[0].close_approach_date}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-4"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={asteroids?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <img className="asteroid" src={Asteroid} alt="Asteroid" />
          </Grid>

          <Grid
            item
            sm={6}
            style={{
              marginTop: "50px",
              borderRadius: "50px 50px 50px 50px",
              background: "rgba(154, 168, 241, 1)",
            }}
          >
            <DialogTitle>
              <Grid container spacing={1}>
                <Grid item sm={10}>
                  <div className="text">Hello little earthling,</div>
                </Grid>

                <Grid item sm={2}>
                  <Button onClick={handleClose}>
                    <CancelPresentationTwoToneIcon fontSize="large" />
                  </Button>
                </Grid>
              </Grid>
            </DialogTitle>

            <DialogContent>
              <DialogContentText>
                <div className="text">
                  my name is
                  <div style={{ fontStyle: "italic", fontSize: "2.1em" }}>
                    {asteroid?.name?.replace(/[()]/g, "")}
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default PaginationTable;
