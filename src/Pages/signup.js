import React, { useState } from "react";
import * as M from "@material-ui/core";
import "./styles/signup.css";
import { Redirect, useHistory } from "react-router-dom";
import useFormStyles from "../helpers/customStyles/formStyle";
import useUserInput from "../helpers/customHooks/userInput";
import App from "../Routes/App"
import axios from "axios";

function Signup({userAuthenticate}) {
  const classes = useFormStyles();
  const [firstName, bindFirstName, resetFirstName] = useUserInput("");
  const [lastName, bindLastName, resetLastName] = useUserInput("");
  const [email, bindEmail, resetEmail] = useUserInput("");
  const [userName, bindUserName, resetUserName] = useUserInput("");
  const [password, bindPassword, resetPassword] = useUserInput("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = await axios
      .post(
        "http://localhost:4000/api/signup",
        {
          user: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: userName,
            password: password,
          },
        }
      )
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        
        userAuthenticate.authenticate(()=> history.push('/home'))
      })
      .catch((e) => {
        console.log(e);
      });

    resetEmail();
    resetFirstName();
    resetLastName();
    resetPassword();
    resetUserName();
  };

  return (
    <M.Container id="sign-up-container">
      <M.Container id="sign-up-form" maxWidth="xs">
        <M.Typography component="h1" variant="h5">
          Sign Up
        </M.Typography>
        <form className={classes.form} method="POST" onSubmit={handleSubmit}>
          <M.TextField
            variant="outlined"
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...bindEmail}
          />
          <M.TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            id="fName-input"
            {...bindFirstName}
          />
          <M.TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="lName-input"
            {...bindLastName}
          />

          <M.TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="userName"
            label="Username"
            type="text"
            id="userName-input"
            {...bindUserName}
          />
          <M.TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...bindPassword}
          />
          <M.Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </M.Button>
        </form>
      </M.Container>
    </M.Container>
  );
}

export default Signup;
