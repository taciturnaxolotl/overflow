import express from "express";
import { getSubdomains } from "../utils/sublist3r.js";

const sublist3rRouter = express.Router();
sublist3rRouter.get("/", (req, res) => {
    res.send(getSubdomains(req.query.p, req.query.q));
});

export default sublist3rRouter;