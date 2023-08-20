import React, { useEffect, useState, useCallback } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation, useParams } from "react-router-dom";

import "./list.css";
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
    FormControl,
    InputLabel,
    NativeSelect,
    Stack,
    Rating,
} from "@mui/material";
import { Margin } from "@mui/icons-material";
const List = () => {
    const { selectedStreet, groundName } = useParams();
    let [page, setPage] = useState(1);
    const [land, setLand] = useState("");
    const [apiDataAvailable, setApiDataAvailable] = useState(false);
    const [value, setValue] = useState(0);
    const PER_PAGE = 3;
    const count = Math.ceil(land.length / PER_PAGE);
    const sortLand = [...land].sort((a, b) => b.totalPitch - a.totalPitch);
    const _Data = sortLand.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    const [range, setRange] = useState([0, 100]);
    const [size, setSize] = useState([]);

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
                                defaultValue={1}
                                inputProps={{
                                    name: "age",
                                    id: "uncontrolled-native",
                                }}
                                sx={{ width: 250 }}
                            >
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
                                    name="check"
                                    value={5}
                                />
                                <label for="checkbox-size-5">Size 5</label>
                            </div>
                        </div>
                        <div class="item">
                            <div class="checkbox-rect">
                                <input
                                    type="checkbox"
                                    id="checkbox-size-7"
                                    name="check"
                                    value={7}
                                />
                                <label for="checkbox-size-7">Size 7</label>
                            </div>
                        </div>
                    </div>
                    <h1 className="coll text">Rating</h1>
                    <Stack spacing={1}>
                        <Rating
                            name="half-rating"
                            defaultValue={4}
                            precision={1}
                        />
                    </Stack>
                </Grid>
                <Grid xs={8}>
                    <div className="title">
                        <h3 className="groud-name">List Pitch Search {}</h3>
                        {/* <p className="groud-desc">Get the great price today</p> */}
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
