import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import './Loader.css'

const Loader = () => {
    return (
        <Container>
            <Grid
                container
                style={{height: window.innerHeight - 48}}
                alignItems={"center"}
                justifyContent={"center"}
            >

                    <div className="lds-hourglass"></div>

            </Grid>
        </Container>
    );
};

export default Loader;