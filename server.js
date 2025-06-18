import express from "express";
import ViteExpress from "vite-express";
import apiRouter from "./api/index.js";

const app = express();
app.use("/api", apiRouter);

ViteExpress.bind(app, app.listen(2003, "localhost", () => {
    console.log("Running on http://localhost:2003");
}));