import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Pagination,
  Rating,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import * as FilterApi from "../../components/Axios/FilterApi";
import LandApi from "../../components/Axios/LandApi";
import "./list.css";

const List = () => {
  const { selectedStreet, groundName } = useParams();
  let [page, setPage] = useState(1);
  const [land, setLand] = useState("");
  const [apiDataAvailable, setApiDataAvailable] = useState(false);
  const PER_PAGE = 3;
  const count = Math.ceil(land.length / PER_PAGE);
  const sortLand = [...land].sort((a, b) => b.totalPitch - a.totalPitch);
  const _Data = sortLand.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const [range, setRange] = useState([0, 100]);

  const [location, setLocation] = useState();
  const [size, setSize] = useState();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [otherPrice, setOtherPrice] = useState("0 VND");
  const [rating, setRating] = useState();

  const handleLocation = useCallback((event) => {
    console.log(event.target.value);
    setLocation(event.target.value);
  }, []);
  function handlePageChanges(event, newValue) {
    setPage(newValue);
    console.log(_Data);
  }
  const handleRating = (event, newValue) => {
    setRating(newValue);
  };

  const formatPrice = (price) => {
    price = price * 3000;
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  const formatPriceV2 = (price) => {
    price = price * 1;
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  };

  function handleChanges(event, newValue) {
    if (event.target.name === "otherPrice") {
      setOtherPrice(event.target.value);
      setMaxPrice(event.target.value);
    } else if (event.target.name === "range") {
      setRange(newValue);
      setMinPrice(newValue[0] * 3000);
      setMaxPrice(newValue[1] * 3000);
      return;
    }
  }

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;
    setSize((pre) => {
      return { ...pre, [checkboxValue]: isChecked };
    });
  };

  const handleSearch = async () => {
    let sizeSubmit =
      size?.["5"] && size?.["7"]
        ? undefined
        : size?.["5"]
        ? 5
        : size?.["7"]
        ? 7
        : undefined;
    let locationSubmit = location === "" ? undefined : location;
    try {
      const response = await FilterApi.search(
        locationSubmit,
        sizeSubmit,
        rating,
        minPrice,
        maxPrice
      );
      if (response == null) {
        setApiDataAvailable(false);
      }
      setLand(response.data);
      setApiDataAvailable(true);
    } catch (error) {
      console.log("ApiError:", error);
    }
  };

  const fetchLands = async () => {
    try {
      if (selectedStreet === undefined && groundName === undefined) {
        const response = await LandApi.GetAllLand();
        if (response == null) {
          setApiDataAvailable(false);
        }
        console.log("Land List:", response.data);
        setLand(response.data);
        setApiDataAvailable(true);
        return;
      } else {
        console.log(`LIST SEARCH: ${selectedStreet} - ${groundName}`);
        const response = await LandApi.GetLand(selectedStreet, groundName);
        if (response == null) {
          setApiDataAvailable(false);
        }
        console.log("Land List:", response.data);
        setLand(response.data);
        setApiDataAvailable(true);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid className="main" container spacing={2}>
        <Grid className="column-left" xs={2.5}>
          <h1 className="title-left">
            <h2 class="title">
              <span class="title-word title-word-1">Fi</span>
              <span class="title-word title-word-2">l</span>
              <span class="title-word title-word-3">te</span>
              <span class="title-word title-word-4">r</span>
            </h2>
          </h1>
          <div className="ground-type">
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Địa điểm
              </InputLabel>
              <NativeSelect
                name="location"
                defaultValue={selectedStreet}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                sx={{ width: 250 }}
                onChange={handleLocation}
              >
                <option aria-label="None" value="" />
                <option value={"Thủ Đức"}>Thủ Đức</option>
                <option value={"Quận 2"}>Quận 2</option>
                <option value={"Quận 3"}>Quận 3</option>
                <option value={"Quận 4"}>Quận 4</option>
                <option value={"Quận 5"}>Quận 5</option>
                <option value={"Quận 6"}>Quận 6</option>
                <option value={"Quận 7"}>Quận 7</option>
                <option value={"Quận 8"}>Quận 8</option>
                <option value={"Quận 9"}>Quận 9</option>
                <option value={"Quận 10"}>Quận 10</option>
                <option value={"Quận 11"}>Quận 11</option>
                <option value={"Quận 12"}>Quận 12</option>
                <option value={"Tân Bình"}>Tân Bình</option>
                <option value={"Gò Vấp"}>Gò Vấp</option>
              </NativeSelect>
            </FormControl>
            <h1 className="coll text">
              Giá tiền: {formatPrice(range[0])} - {formatPrice(range[1])}
            </h1>

            <Slider
              size="small"
              name="range"
              value={range}
              onChange={handleChanges}
              sx={{ width: "85%" }}
            />
            <h1 className="coll text">Giá tiền khác bạn muốn tìm</h1>
            <TextField
              id="otherPrice"
              name="otherPrice"
              label="giá tối đa"
              variant="outlined"
              value={otherPrice}
              onFocus={(e) => setOtherPrice("")}
              onBlur={() => {
                if (otherPrice !== "") {
                  const formattedValue = formatPriceV2(otherPrice);
                  setOtherPrice(formattedValue);
                }
              }}
              onChange={handleChanges}
              sx={{ width: "20rem" }}
            />
            <h1 className="coll text">Cỡ sân</h1>
            {[5, 7].map((size) => {
              return (
                <Fragment key={size}>
                  <div class="item">
                    <div class="checkbox-rect">
                      <input
                        type="checkbox"
                        id={`checkbox-size-${size}`}
                        name="size"
                        value={size}
                        onChange={handleCheckboxChange}
                      />
                      <label for={`checkbox-size-${size}`}>Sân{size}</label>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
          <h1 className="coll text">Đánh giá</h1>
          <Stack spacing={1}>
            <Rating
              name="half-rating"
              value={rating}
              precision={1}
              onChange={handleRating}
            />
          </Stack>
          <Button
            onClick={handleSearch}
            sx={{ marginTop: 2 }}
            variant="contained"
          >
            Tìm kiếm
          </Button>
        </Grid>
        <Grid xs={8}>
          <div className="title">
            <h3 className="groud-name">
              <h2 class="title">
                <span class="title-word title-word-1">Danh </span>
                <span class="title-word title-word-2">Sách </span>
                <span class="title-word title-word-3">Sân</span>
              </h2>
            </h3>
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
            onChange={handlePageChanges}
          />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
};

export default List;
