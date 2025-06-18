import express from "express";
import ViteExpress from "vite-express";

const app = express();
app.get("/hello", (_req, res) => res.send("world"));

ViteExpress.bind(app, app.listen(2003, "localhost", () => {
    console.log("Running on http://localhost:2003")
}));