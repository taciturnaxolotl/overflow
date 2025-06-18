import express from "express";
import ViteExpress from "vite-express";

const app = express();
app.get("/hello", (_req, res) => res.send("world"));
ViteExpress.listen(app, 2003);