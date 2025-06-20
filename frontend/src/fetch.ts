import { logYellow } from "./log";
import { Task } from "./tasks";

export const fetchErr = async (url: string | URL, opts?: RequestInit, task?: Task): Promise<Response> => {
    const onErr = async (f: null | Response = null) => {
        const text = f === null
            ? `Request to ${url} failed`
            : `Request to ${url} failed with status ${f.status} ${f.statusText}. You might want to check logs.\n${await f.text()}`;
        logYellow(text);
        task?.remove();
        return new Error(text);
    }
    try {
        const f = await fetch(url, Object.assign({ redirect: "follow" }, opts));
        if(!f.ok) throw await onErr(f);
        return f;
    } catch(_) { throw await onErr(); }
};