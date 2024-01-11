import  {React , useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import axios from "axios";
const profile = () => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const userEmail = Cookies.get('userEmail');
    const userId = Cookies.get('userId');
    const userName = Cookies.get('userName');
    const name = Cookies.get('name');
  
    // Set the initial user state (optional)
   // setUser({ email: userEmail, id: userId , userName: userName , name: name});
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 401) {
          
          console.log("Nai ho raha details show");
        } else if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          // Handle other errors
          console.error('Error fetching profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);
  const handleLogout = async () => {

    
    try {
      // Make a GET request to the server's /logout endpoint
      const response = await axios.get("http://localhost:4000/logout");

      // Check if the logout was successful
      if (response.status === 200) {
        // Redirect or perform any other action after logout
        console.log("Logout sucessful")
        window.location.href = "/"; // Redirect to home page, for example
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
         <h1>Profile Page</h1>
      {user && (
        <div>
          <p>Username: {user?.userName}</p>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      )}
 <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default profile



    /*     const response = await fetch('http://localhost:4000/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        // Include credentials (cookies)
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          // Handle error or redirect to login
          console.error('Error fetching profile:', response.statusText);
          // Redirect to login or handle error as needed
        } */