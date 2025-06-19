export const log = (msg, ...classes) => {
    const logDiv = document.createElement("div");
    logDiv.innerText = msg;
    logDiv.classList.add(...classes);
    document.querySelector("#logs")?.appendChild(logDiv);
}
export const logRed = msg => log(msg);
export const logYellow = msg => log(msg, "warn");