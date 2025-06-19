import { logYellow } from "./log";
import { Task } from "./tasks";

export const fetchErr = async (url: string | URL, opts?: RequestInit, task?: Task): Promise<Response> => {
    const f = await fetch(url, Object.assign({ redirect: "follow" }, opts));
    if(!f.ok) {
        const text = `Request to ${url} failed with status ${f.status} ${f.statusText}. You might want to check logs.\n${await f.text()}`;
        logYellow(text);
        task?.remove();
        throw new Error(text);
    }
    return f;
};