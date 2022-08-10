import axios from "axios";
import { Pokemon } from "pokenode-ts";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonInfo, setPokemonInfo] = useState<null | undefined>(
        undefined
    );
    const POKEMON_BASE_API_URL = "https://animechan.vercel.app/api/quotes/anime?title=";
    return (
        <div>
            <div className="search-field">
                <h1>Anime Quote Search By Title</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                        id="search-bar"
                        className="text"
                        value={pokemonName}
                        onChange={(prop) => {
                            setPokemonName(prop.target.value);
                        }}
                        label="Enter a Title..."
                        variant="outlined"
                        placeholder="Search..."
                        size="medium"
                    />
                    <Button
                        onClick={() => {
                            search();
                        }}
                    >
                        <SearchIcon style={{ fill: "blue" }} />
                        Search
                    </Button>
                </div>
            </div>

            {pokemonInfo === undefined ? (
                <div></div>
            ) : (
                <div
                    id="pokemon-result"
                    style={{
                        maxWidth: "800px",
                        margin: "0 auto",
                        padding: "100px 10px 0px 10px",
                    }}
                >
                    <Paper sx={{ backgroundColor: "gray" }}>
                        <Grid
                            container
                            direction="row"
                            spacing={5}
                            sx={{
                                justifyContent: "center",
                            }}
                        >
                            <Grid item>
                                <Box>
                                    {pokemonInfo === undefined || pokemonInfo === null ? (
                                        <h1> Anime quote not found</h1>
                                    ) : (
                                        <div>
                                            <h1>


                                            </h1>
                                            <p>
                                                {pokemonInfo}
                                            </p>
                                        </div>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box>
                                    {pokemonInfo ? (
                                        <div>{"Anime:" + pokemonName} </div>
                                    ) : (
                                        <Skeleton width={300} height={300} />
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            )}
        </div>
    );



    function search() {
        if (pokemonName === undefined || pokemonName === "") {
            return;
        }


        axios
            .get(POKEMON_BASE_API_URL + pokemonName)
            .then((res) => {
                console.log(res.data[0])
                console.log(res.data[0].quote)
                setPokemonInfo(res.data[0].quote);
            })

    }


}

export default App;