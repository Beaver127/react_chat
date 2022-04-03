import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from 'firebase/compat/app';
import Avatar from "@mui/material/Avatar";

const Chat = () => {

    const {auth, firestore} = useContext(Context)
    //получаем пользователя с помощью хука
    const [user, loading, error] = useAuthState(auth)
    const [value, setValue] = useState('')
    //получаем сообщения с помощью хука
    const [messages, loadingMessage] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if(loadingMessage && loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid container
                  justifyContent={"center"}
                  style={{height: window.innerHeight - 50, marginTop: 20}}>
                <div style={{width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto'}}>
                    {messages.map(message =>
                        <div key={message.createdAt} style={{
                            margin: 10,
                            border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                        }}>
                            <Grid container>
                                <Avatar src={message.photoUrl}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{width: '80%'}}
                >
                    <TextField
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Отправить</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;