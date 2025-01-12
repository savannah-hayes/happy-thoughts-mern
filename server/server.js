import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import thoughtsRoute from "./routes/thoughts.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;
const app = express();

app.set('json spaces', 2);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next()
  } else {
    res.status(503).json({
      status_code: 503,
      status_message: "Service Unavailable"
    })
  };
});

app.use("/thoughts", thoughtsRoute);

app.get("/", (req, res) => {
  res.json({ 
    Welcome: "Happy Thoughts MERN Stack Project",
    Frontend: "https://happy-thoughts-frontend.netlify.app/",
    Backend: "https://happy-thoughts-mern.herokuapp.com/",
    "Routes": [
      {
        "path": "/",
        "method": "GET"
      },
      {
        "path": "/thoughts",
        "methods": ["GET", "POST"]
      },
      {
        "path": "/thoughts/:thoughtId/like",
        "method": "POST"
      }
    ]
  });
});

app.listen(PORT);
