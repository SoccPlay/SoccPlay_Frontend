import React, { useEffect, useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";

import "./list.css";
import San1 from "../../assets/San1.jpg";
import San2 from "../../assets/San2.jpg";
import San3 from "../../assets/San3.jpg";
import San4 from "../../assets/San4.jpg";
import San5 from "../../assets/San5.jpg";
import San6 from "../../assets/San6.jpg";
import LandApi from "../../components/Axios/LandApi";
import usePagination from "../../Pagination/Pagination";
import {
  Pagination,
  Slider,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
const List = () => {
  const { street, ground } = useParams();
  const [land, setLand] = useState("");
  const [apiDataAvailable, setApiDataAvailable] = useState(false);
  const [value, setValue] = React.useState(0);
  let [page, setPage] = useState(1);
  const PER_PAGE = 3;
  const count = Math.ceil(land.length / PER_PAGE);
  const sortLand = [...land].sort((a, b) => b.totalPitch - a.totalPitch);
  const _Data = sortLand.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    fetchLands([]);
  }, []);
  function calculateValue(value) {
    return value;
  }
  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  const fetchLands = async ([]) => {
    try {
      console.log(`LIST SEARCH: ${street} - ${ground}`);
      const response = await LandApi.GetLandByLocationandNameGround(
        street,
        ground
      );
      if (response == null) {
        setApiDataAvailable(false);
      }
      console.log("Land List:", response.data);
      setLand(response.data);
      setApiDataAvailable(true);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Navbar />
      <Grid className="main" container spacing={2}>
        <Grid className="column-left" xs={3}>
          <div className="ground-type">
            <h1 className="title-left">Filter</h1>
            <h1 className="coll groud-type">Groud type</h1>
            <FormGroup className="checkbox">
              <FormControlLabel control={<Checkbox />} label="Size 5" />
              <FormControlLabel control={<Checkbox />} label="Size 7" />
            </FormGroup>
          </div>
          <div className="coll ground-price">
            <Box sx={{ width: 250 }}>
              <Typography id="non-linear-slider" gutterBottom>
                Price: {calculateValue(value)}
              </Typography>
              <Slider
                value={value}
                min={0}
                step={1}
                max={300}
                scale={calculateValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
              />
            </Box>
          </div>
        </Grid>
        <Grid xs={7}>
          <div className="title">
            <h3 className="groud-name">All ground at 1 district</h3>
            {/* <p className="groud-desc">Get the great price today</p> */}
          </div>
          <div className="list">
            {apiDataAvailable &&
              _Data.map((lands) => (
                <SearchItem key={lands.landId} landId={lands.landId} />
              ))}
          </div>
          <Pagination
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
            count={count}
            size="large"
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default List;
