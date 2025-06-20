import express from "express";
import { activeScan, spider } from "../utils/zap.js";

const zapRouter = express.Router();
zapRouter.use(express.json());
zapRouter.post("/spider", async (req, res) => {
    res.send(await spider(req.body.apiKey, req.body.target));
});
zapRouter.post("/scan", async (req, res) => {
    res.send(await activeScan(req.body.apiKey, req.body.target));
});

export default zapRouter;