import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

import HelloRoutes from "./hello.js";
import Lab5 from "./Lab55.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import AssignmentRoutes from "./assignment/routes.js";

const dbClusterUrl = process.env.DB_CLUSTER_URL || 'mongodb://127.0.0.1:27017/kanbas';
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://${dbUsername}:${dbPassword}@${dbClusterUrl}Kanbas?retryWrites=true&w=majority`;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
   .catch(error => console.error("MongoDB connection error:", error));


const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
    console.log(`Database name: ${db.name}`);
});


const app = express();
app.use(
  cors({
    credentials: true,
    origin: 'https://enchanting-mermaid-d9fbce.netlify.app'
  })
);


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
  app.use(
    session(sessionOptions)
  );

  app.use(express.json());
  UserRoutes(app);
  AssignmentRoutes(app);
  ModuleRoutes(app);
  CourseRoutes(app);
  Lab5(app);
  HelloRoutes(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




