import express from "express";
import dns from "dns";
const dnsPromises = dns.promises;

const dnsRouter = express.Router();
dnsRouter.get("/", async (req, res) => {
    const results = await dnsPromises.lookup(req.query.q, { all: true });
    res.send(results.map(x => x.address));
});
dnsRouter.get("/reverse", async (req, res) => {
    const f = await fetch(`https://ipinfo.io/tools/reverse-dns-lookup/lookup?ip=${req.query.q}`);
    const { hostname } = await f.json();
    res.send(hostname ? [hostname] : []);
});

export default dnsRouter;