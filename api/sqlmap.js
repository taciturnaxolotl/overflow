import express from "express";
import { sqlmap } from "../utils/sqlmap.js";

const sqlmapRouter = express.Router();
sqlmapRouter.use(express.json());
sqlmapRouter.post("/", async (req, res) => {
    res.send(await sqlmap(req.body.path, req.body.url, req.body));
});

export default sqlmapRouter;