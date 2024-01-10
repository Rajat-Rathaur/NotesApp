import express from "express";
import cors from "cors";
import connection from "./db.js";
import userRouter from "./routes/user.routes.js";
import { config } from 'dotenv';
import axios from 'axios';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import flash from 'connect-flash';


const app = express();
const port = process.env.PORT || 3000; // You should provide a default value for PORT if it's not set in the environment.

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
};

app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SESSION_SECRET || "secret", 
  resave: false,
  saveUninitialized: false,
}));
 // Use express.json() instead of json()
app.use(flash());
app.use("/user", userRouter);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send({ message: "klsvndskjnhvdskjbv" });
});
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await userModel.findById(id);
      done(null, user);
  } catch (error) {
      done(error);
  }
});
// Call the signup API route
app.post("/signup", async (req, res) => {
  try {
    const {username,  name, email, password } = req.body;

    // Make a POST request to the signup API route
    const signupResponse = await axios.post(`http://localhost:${port}/user/signup`, {
      username,
      name,
      email,
      password,
    });

    // Handle the response from the signup API
    console.log(signupResponse.data);
    res.status(200).json(signupResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("Error in isAuthenticated")
};
app.get('/profile', isAuthenticated, (req, res) => {
  res.send(req.user);
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ success: true, user, redirect: "/profile" });
    });
  })(req, res, next);
});
app.get('/logout', (req, res) => {
  // Use req.logout() with a callback function
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('/');
  });
});

/* app.get("/login", (req, res) => {
  // You can render your login form here
  res.send("Login form goes here");
});
 */


app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${port}, database is connected`);
  } catch (error) {
    console.error(error);
  }
});


