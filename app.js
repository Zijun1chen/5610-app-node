// const express = require("express");
import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
ModuleRoutes(app);

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);
