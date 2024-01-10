import React from "react";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  
  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    try {
      const { email, password } = state;
  
      // Validate email and password (implement your validation logic)
  
      // Create the request body
      const body = JSON.stringify({ email, password });
  
      // Make a POST request to your login API endpoint
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
  
      // Check the response status or handle it accordingly
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.user.email)
        alert(`Login successful! Welcome, ${responseData.user.email}!`);
  
        // Redirect to the /profile page
        window.location.href = '/profile'; // Replace with your client-side routing mechanism
      } else {
        const errorResponse = await response.json();
        alert(`Login failed: ${errorResponse.message || 'Unknown error'}`);
      }
  
      // Clear the form state after successful login
      for (const key in state) {
        setState({
          ...state,
          [key]: "",
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  
  

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />


   {/*      <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        /> */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
