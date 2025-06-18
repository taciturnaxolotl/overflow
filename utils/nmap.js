import nmap from "node-nmap";
/**
 * @typedef {object} NmapOptions
 * @typedef {number[]} ports
 */
/**
 * @param {string[]} targets
 * @param {NmapOptions} opts
 */
export const scanNmap = (targets, opts) => new Promise(resolve => {
    const scan = new nmap.NmapScan(targets.join(" "), ["-p", opts.ports.map(x => x.toString()).join(",")]);
    scan.on("complete", x => resolve(x.filter(y => y.openPorts.length > 0).map(y => y.openPorts.map(z => (y.hostname || y.ip) + ":" + z.port.toString())).flat()));
    scan.startScan();
});