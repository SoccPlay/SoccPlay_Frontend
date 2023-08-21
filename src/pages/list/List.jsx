import React, { useEffect, useState, useCallback } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation, useParams } from "react-router-dom";

import "./list.css";
import LandApi from "../../components/Axios/LandApi";
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
import { Margin } from "@mui/icons-material";
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

    const [location, setLocation] = useState("");
    const [size, setSize] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [rating, setRating] = useState("");

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

    //check if size 5 && size 7 is checked then set size = null
    // else if size 5 is checked then set size = 5
    // else if size 7 is checked then set size = 7
    // else set size = null
    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;

        if (checkboxValue === "5" && size !== "7") {
            setSize("5");
        } else if (checkboxValue === "7" && size !== "5") {
            setSize("7");
        } else {
            setSize("");
        }
    };
    console.log("size", size);

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
                                <option value={1}>district 1</option>
                                <option value={2}>district 2</option>
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
                        <div class="item">
                            <div class="checkbox-rect">
                                <input
                                    type="checkbox"
                                    id="checkbox-size-5"
                                    name="size"
                                    value={5}
                                    onChange={handleCheckboxChange}
                                />
                                <label for="checkbox-size-5">Size 5</label>
                            </div>
                        </div>
                        <div class="item">
                            <div class="checkbox-rect">
                                <input
                                    type="checkbox"
                                    id="checkbox-size-7"
                                    name="size"
                                    value={7}
                                    onChange={handleCheckboxChange}
                                />
                                <label for="checkbox-size-7">Size 7</label>
                            </div>
                        </div>
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
                    <Button sx={{ marginTop: 2 }} variant="contained">
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
