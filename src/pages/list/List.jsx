import React from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import "./list.css";
const List = () => {
    function calculateValue(value) {
        return value;
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        if (typeof newValue === "number") {
            setValue(newValue);
        }
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
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Size 5"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Size 7"
                            />
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
                        <p className="groud-desc">Get the great price today</p>
                    </div>
                    <div className="list">
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div>
                </Grid>
            </Grid>
            <Footer />
        </div>
    );
};

export default List;
