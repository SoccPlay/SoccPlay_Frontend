import React, { useEffect, useState, useCallback } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import "./list.css";
import LandApi from "../../components/Axios/LandApi";
import {
  Pagination,
  Slider,
  Typography,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Rating,
  FormLabel,
} from "@mui/material";
import { Margin } from "@mui/icons-material";
const List = () => {
  const { selectedStreet, groundName } = useParams();
  let [page, setPage] = useState(1);
  const [land, setLand] = useState("");
  const [apiDataAvailable, setApiDataAvailable] = useState(false);
  const PER_PAGE = 4;
  const count = Math.ceil(land.length / PER_PAGE);
  const sortLand = [...land].sort((a, b) => b.totalPitch - a.totalPitch);
  const _Data = sortLand.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const [range, setRange] = useState([0, 100]);
  const [rating, setRating] = useState(5);

  const formatPrice = (price) => {
    price = price * 3000;
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };
  function handleChanges(event, newValue) {
    setRange(newValue);
    console.log(range);
  }
  useEffect(() => {
    fetchLands([]);
  }, []);
  const [filteredResults, setFilteredResults] = useState([]);

  const fetchLands = async ([]) => {
    try {
      console.log(`LIST SEARCH: ${selectedStreet} - ${groundName}`);
      const response = await LandApi.GetLandByLocationandNameGround(
        selectedStreet,
        groundName
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

  // /api/Land/Filter

  // giúp tôi làm api filter https://localhost:7186/api/Land/Filter?location=1&size=1&rate=5&min=200&max=400

  const [location, setLocation] = useState("");

  const street = [
    { value: "Thủ Đức", label: "Thủ Đức" },
    {
      value: "Quận 2",
      label: "Quận 2",
    },
    { value: "Quận 3", label: "Quận 3" },
    { value: "Quận 4", label: "Quận 4" },
    { value: "Quận 5", label: "Quận 5" },
    { value: "Quận 6", label: "Quận 6" },
    { value: "Quận 7", label: "Quận 7" },
    { value: "Quận 8", label: "Quận 8" },
    { value: "Quận 9", label: "Quận 9" },
    { value: "Quận 10", label: "Quận 10" },
    { value: "Quận 11", label: "Quận 11" },
    { value: "Quận 12", label: "Quận 12" },
    { value: "Tân Bình", label: "Tân Bình" },
    { value: "Gò Vấp", label: "Gò Vấp" },
  ];
  console.log(location);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };
  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };
  const applyFilters = () => {
    // Make API call with filters
    axios
      .get(`https://localhost:7186/api/Land/Filter`, {
        params: {
          location: location,
          size: selectedSize,
          rate: rating,
          min: range[0],
          max: range[1],
        },
      })
      .then((response) => {
        setFilteredResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    // Call applyFilters when filters change
    applyFilters();
  }, [location, selectedSize, rating, range]);

  console.log(rating);
  console.log(selectedSize);
  return (
    <div>
      <Navbar />
      <Grid className="main" container spacing={2}>
        <Grid className="column-left" xs={2.5}>
          <h1 className="title-left">Filters</h1>
          <div className="ground-type">
            <FormControl fullWidth>
              <NativeSelect
                // defaultValue={""} // Chọn giá trị mặc định tùy thuộc vào nhu cầu của bạn
                inputProps={{
                  name: "location",
                  id: "uncontrolled-native",
                }}
                sx={{ width: 250 }}
                onChange={(e) => {
                  const selectedLocation = e.target.value;
                  setLocation(selectedLocation);
                }}
                value={location}
              >
                <option value="">Chọn địa điểm</option>
                {street.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <h1 className="coll text">
              Giá: {formatPrice(range[0])} - {formatPrice(range[1])}
            </h1>
            <Slider
              size="small"
              value={range}
              onChange={handleChanges}
              sx={{ width: "85%" }}
            />
            <FormLabel component="legend">Chọn Sân Bóng</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSize === "5"}
                    onChange={handleSizeChange}
                    value="5"
                  />
                }
                label="Size 5"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSize === "7"}
                    onChange={handleSizeChange}
                    value="7"
                  />
                }
                label="Size 7"
              />
            </FormGroup>
          </div>
          <h1 className="coll text">Rating</h1>
          <Stack spacing={1}>
            <Rating
              name="half-rating"
              value={rating}
              //   precision={0.5} // Cho phép chọn nửa điểm
              onChange={(event, newValue) => {
                // Gọi hàm handleRatingChange để cập nhật giá trị đánh giá
                handleRatingChange(newValue);
              }}
            />
          </Stack>
        </Grid>
        <Grid xs={8}>
          <div className="title">
            <h3 className="groud-name">Danh Sach Pitch</h3>
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
          />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default List;
