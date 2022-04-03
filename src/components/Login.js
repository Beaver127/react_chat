import React, {useContext} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Context} from "../index";
import firebase from "firebase/compat/app";

const Login = () => {

    const {auth} = useContext(Context)

    const login = async () => {
        //способ авторизации
        const provider = new firebase.auth.GoogleAuthProvider()
        //авторизация
        const {user} = await auth.signInWithPopup(provider)
        console.log(user)
    }



    return (
        <Container>
            <Grid
            container
            style={{height: window.innerHeight - 48}}
            alignItems={"center"}
            justifyContent={"center"}
            >
                <Grid style={{width:400, background: 'lightgray'}}
                      container
                      alignItems={"center"}
                      direction={"column"}
                >
                    <Box p={5}>
                        <Button onClick={login} variant={"outlined"}>Войти с помощью Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;