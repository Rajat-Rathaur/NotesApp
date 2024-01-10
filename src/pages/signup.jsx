import React from "react";
import axios from 'axios'
function SignUpForm() {
  const [state, setState] = React.useState({
    username:"",
    name: "",
    email: "",
    password: ""
  });
/*   const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const {username, name, email, password } = state;
    alert(
      `You are sign up with username: ${username} name: ${name} email: ${email} and password: ${password}`
    );

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  }; */

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };


  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      const { username, name, email, password } = state;
  
      // Create the request body as a JavaScript object
      const body = { username, name, email, password };
  
      // Make a POST request with fetch
      const response = await fetch('http://localhost:4000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      // Check the response status or handle it accordingly
      if (response.ok) {
        try {
          const responseData = await response.json(); // Attempt to parse JSON
          // Check responseData and handle it as needed
          if (responseData) {
            alert('Sign up successful!');
          } else {
            alert('Unexpected response from the server.');
          }
        } catch (jsonError) {
          // If parsing JSON fails (possibly due to an empty response), handle the error
          console.error('Error parsing JSON:', jsonError);
          alert('Sign up successful!');
        }
      } else {
        const errorResponse = await response.json();
        alert(`Sign up failed: ${errorResponse.message || 'Unknown error'}`);
      }
  
      // Clear the form state after successful signup
      for (const key in state) {
        setState({
          ...state,
          [key]: '',
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };
  
  
  

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
