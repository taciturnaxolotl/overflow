import { logYellow } from "./log";

export const fetchErr = async (url: string | URL, opts?: RequestInit): Promise<Response> => {
    const f = await fetch(url, Object.assign({ redirect: "follow" }, opts));
    if(!f.ok) {
        const text = `Request to ${url} failed with status ${f.status} ${f.statusText}. You might want to check logs.\n${await f.text()}`;
        logYellow(text);
        throw new Error(text);
    }
    return f;
};