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
import userModel from "./models/UserModel.js"
import bcrypt from "bcrypt";
import Cookies from 'js-cookie';

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

passport.use(new LocalStrategy({
  usernameField: "email", 
  passwordField: "password",
}, async (email, password, done) => {
  try {
      const user = await userModel.findOne({ email });

      if (!user) {
          return done(null, false, { message: "Incorrect email" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));


const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized user");
};

app.get('/profile', isAuthenticated, async(req, res) => {
  
   console.log(req.user)
  res.send(req.user); 
  
 
});

app.post("/login", passport.authenticate("local"),(req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      // Serialize the user and store the user data in the session
      req.session.passport = { user: user.id };

      // Set the user data as a cookie
      res.cookie("user", JSON.stringify(user));
      res.cookie("user_id", user.id, { httpOnly: true });
      res.cookie("user_name", user.name, { httpOnly: true });
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
    res.clearCookie('user_id');
    res.clearCookie('user_name');
    res.redirect('/');
  });
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    // If the user is already authenticated, redirect them to the profile page
    res.redirect("/profile");
  } else {
  
    res.send("Authentican failed while login");
  }
});



app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${port}, database is connected`);
  } catch (error) {
    console.error(error);
  }
});


