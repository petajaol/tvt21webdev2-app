import * as React from 'react';
import Box from "@mui/material/Box";
import {Alert, Link, Snackbar, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useEffect, useRef, useState} from "react";
import SignUp from "./SignUp";
import axios from "axios";
import Util from "../util";


export default function Login() {

  const URL = "http://localhost:8080/login"

  const [login, setLogin] = useState({username: "", password: ""});
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMessage]);

  function handleSubmit(event) {
    setErrorMessage("");
    event.preventDefault();
    (async () => {
      try {
        const response = await axios.post(URL, login);
        console.log(response);
      } catch (err) {
        setErrorMessage(err.response.data);
      }
    })();
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      width: 300,
      p: 3,
      border: 1,
      borderRadius: "10px",
      bgcolor: "pink",
      gap: 2
    }}
    >
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box component="form"
           onSubmit={handleSubmit}
      >
        <TextField
          sx={{mb: 2}}
          fullWidth={true}
          id="username"
          name="username"
          label="Username"
          required={true}
          autoFocus={true}
          value={login.username}
          onChange={(event) => setLogin({...login, username: event.target.value})}
          error={errorMessage === "user doesn't exist"}
          helperText={errorMessage === "user doesn't exist" ? Util.selectErrorMessage(errorMessage) : null}
          inputRef={errorMessage === "user doesn't exist" ? inputRef : null}
        />
        <TextField
          fullWidth={true}
          id="password"
          name="password"
          label="Password"
          required={true}
          value={login.password}
          onChange={(event) => setLogin({...login, password: event.target.value})}
          error={errorMessage === "wrong password"}
          helperText={errorMessage === "wrong password" ? Util.selectErrorMessage(errorMessage) : null}
          inputRef={errorMessage === "wrong password" ? inputRef : null}
        />
        <Button
          fullWidth={true}
          type="submit"
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
          Log In
        </Button>
      </Box>
      <Link underline="none" onClick={() => setSignUpOpen(true)}>
        Don't have an account? Sign Up
      </Link>
      <SignUp open={signUpOpen}
              onClose={() => setSignUpOpen(false)}/>
    </Box>
  )
}

//   <Snackbar open={true} autoHideDuration={5000}>
//           <Alert variant="filled" severity="success">Registration successful!</Alert>
//   </Snackbar>