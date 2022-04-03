import React, {useContext} from 'react';
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

// https://mui.com/
const Navbar = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Grid container justifyContent={"flex-end"}>
                        {user ?
                            <Button onClick={() => auth.signOut()} variant="h6" color="inherit" component="div">
                                Выйти
                            </Button>
                            :
                            <Link to={LOGIN_ROUTE}>
                                <Button variant="h6" color="inherit" component="div">
                                    Логин
                                </Button>
                            </Link>
                        }

                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;





