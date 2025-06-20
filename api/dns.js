import express from "express";
import dns from "dns";
const dnsPromises = dns.promises;

const dnsRouter = express.Router();
dnsRouter.get("/", async (req, res) => {
    const results = await dnsPromises.lookup(req.query.q, { all: true });
    res.send(results.map(x => x.address));
});

export default dnsRouter;