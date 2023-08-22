import React, { useEffect, useState, useCallback, Fragment } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation, useParams } from "react-router-dom";

import "./list.css";
import LandApi from "../../components/Axios/LandApi";
import * as FilterApi from "../../components/Axios/FilterApi";
import {
    Pagination,
    Slider,
    Grid,
    FormControl,
    InputLabel,
    NativeSelect,
    Stack,
    Rating,
    Button,
} from "@mui/material";

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
    const [rating, setRating] = useState(5);

    const handleLocation = useCallback((event) => {
        console.log(event.target.value);
        setLocation(event.target.value);
    }, []);

    const handleRating = useCallback((event) => {
        console.log(event.target.value);
        setRating(event.target.value);
    }, []);

    const formatPrice = (price) => {
        price = price * 3000;
        return price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
    };
    function handleChanges(event, newValue) {
        setRange(newValue);
        setMinPrice(newValue[0] * 3000);
        setMaxPrice(newValue[1] * 3000);
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

    useEffect(() => {
        fetchLands([]);
    }, []);

    return (
        <div>
            <Navbar />
            <Grid className="main" container spacing={2}>
                <Grid className="column-left" xs={2.5}>
                    <h1 className="title-left">Filters</h1>
                    <div className="ground-type">
                        <FormControl fullWidth>
                            <InputLabel
                                variant="standard"
                                htmlFor="uncontrolled-native"
                            >
                                Location
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
                            Price: {formatPrice(range[0])} -{" "}
                            {formatPrice(range[1])}
                        </h1>

                        <Slider
                            size="small"
                            value={range}
                            onChange={handleChanges}
                            sx={{ width: "85%" }}
                        />
                        <h1 className="coll text">Size</h1>
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
                                            <label
                                                for={`checkbox-size-${size}`}
                                            >
                                                Size{size}
                                            </label>
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}
                    </div>
                    <h1 className="coll text">Rating</h1>
                    <Stack spacing={1}>
                        <Rating
                            name="half-rating"
                            defaultValue={5}
                            precision={1}
                            onChange={handleRating}
                        />
                    </Stack>
                    <Button
                        onClick={handleSearch}
                        sx={{ marginTop: 2 }}
                        variant="contained"
                    >
                        Search
                    </Button>
                </Grid>
                <Grid xs={8}>
                    <div className="title">
                        <h3 className="groud-name">List Pitch Search {}</h3>
                    </div>
                    <div className="list">
                        {apiDataAvailable &&
                            _Data.map((lands) => (
                                <SearchItem
                                    key={lands.landId}
                                    landId={lands.landId}
                                />
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
