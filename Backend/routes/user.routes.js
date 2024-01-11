import { Router } from "express";
import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/UserModel.js"
const userRouter = Router();
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";

const app = express();

app.use(passport.initialize());
app.use(passport.session());
userRouter.get("/", (req, res) => {
    res.send("All the user");
});

userRouter.post("/signup", async (req, res) => {
    try {
        const {username, name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new userModel({
            username,
            name,
            email,
            password: hashedPassword,
        });

      
        await newUser.save();

        res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
/* passport.use(new LocalStrategy({
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
 */

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


  

export default userRouter;
