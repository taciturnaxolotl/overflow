import { ChildProcess, spawn } from "child_process";
import { randomBytes } from "crypto";
import MsfRpcClient from "msfrpc-client-node";

/** @type {ChildProcess | null} */
let process = null;
/** @type {string | null} */
let password = null;
/** @type {MsfRpcClient | null} */
let client = null;

export const init = () => {
    password = randomBytes(24).toString("base64");
    process = spawn("msfrpcd", ["-U", "overflow", "-P", password, "-f"], { stdio: ["pipe", "pipe", "pipe"] });
    console.log(`Metasploit password: ${password}`);
    process.on("error", e => console.error(e));
    client = new MsfRpcClient({
        user: "overflow",
        password,
        host: "localhost",
        persist: false
    });
};
export const deinit = () => {
    process.kill();
};

export const runCommand = args => new Promise((resolve, reject) => {
    if(!process || !password || !client) return reject(new Error("Not initialized"));
    client.exec(args).then(r => {
        resolve(r);
    });
});