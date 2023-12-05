import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./Lab55.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"|| process.env.FRONTEND_URL
}));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));

app.use(express.json());


UserRoutes(app);
ModuleRoutes(app);

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);
