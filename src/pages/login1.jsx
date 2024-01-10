/*import { React, useState , useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Link, Route, Routes, useLocation } from 'react-router-dom';
import "../App.css";
import SignInForm from "./login";
import SignUpForm from "./signup";
import axios from 'axios'
const Loging = () => {
    const [type, setType] = useState("signIn");
    const location = useLocation();
    const navigate = useNavigate();


    const handleOnClick = text => {

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('status', text); // Set 'status' based on the clicked type
      navigate(`?${searchParams.toString()}`);


        // if(type === "signUp"){
        //     navigate("/login")
        // } //else navigate("/register")
      if (text !== type) {
        setType(text);
        return;
      }
    };

    useEffect(() => {
      // Ensure 'type' and 'status' are not empty before making API calls
      if (type) {
        if (type === "signUp") {
          // Hit signUp API
          hitSignUpAPI();
        } else if (type === "login") {
          // Hit register API
          hitloginAPI();
        }
      }
    }, [type]);
  
    const hitSignUpAPI = () => {
        axios.post('/signUp', async (req, res) => {
            const { username, email, fullname, password } = req.body;
            const userData = new User({ username, email, fullname });
            await User.register(userData, password);
            res.redirect('/profile');
          });
          
      console.log("Hit signUp API");

    };
  
    const hitloginAPI = () => {

      // login
      console.log("Hit register API");
     
    };


    const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loging;*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import SignInForm from "./login";
import SignUpForm from "./signup";
import axios from 'axios';

const Loging = () => {
  const [type, setType] = useState("signIn");
  const location = useLocation();
  const navigate = useNavigate();
  const handleOnClick = text => {

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('status', text); // Set 'status' based on the clicked type
    navigate(`?${searchParams.toString()}`);


      // if(type === "signUp"){
      //     navigate("/login")
      // } //else navigate("/register")
    if (text !== type) {
      setType(text);
      return;
    }
  };

  useEffect(() => {
    // Ensure 'type' is not empty before making API calls
    if (type) {
      if (type === "signUp") {
        // Hit signUp API
        hitSignUpAPI();
      } else if (type === "signIn") {
        // Hit login API
        hitLoginAPI();
      }
    }
  }, [type]);

  const hitSignUpAPI =  () => {
  console.log("Hit register API")
  };

  const hitLoginAPI = () => {
    // Replace this with your actual login API logic
    console.log("Hit login API");
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loging;
