import  {React , useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const profile = () => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          method: 'GET',
          withCredentials:true, // Include credentials (cookies),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setUser(data);
        } else {
          // Handle error or redirect to login
          console.error('Error fetching profile:', response.statusText);
          // Redirect to login or handle error as needed
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
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
 <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default profile
