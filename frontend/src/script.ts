import "litegraph.js/css/litegraph.css";
import { LGraph, LGraphCanvas, LiteGraph } from "litegraph.js";
import "./nodes";

const graph = new LGraph();
const canvas = new LGraphCanvas("#lg", graph);

const nodeConst = LiteGraph.createNode("overflow/const");
nodeConst.pos = [200, 200];
graph.add(nodeConst);

const nodeFilter = LiteGraph.createNode("overflow/nmap");
nodeFilter.pos = [450, 200];
graph.add(nodeFilter);

const nodeWatch = LiteGraph.createNode("overflow/log");
nodeWatch.pos = [700, 200];
graph.add(nodeWatch);

nodeConst.connect(0, nodeFilter, 0);
nodeFilter.connect(0, nodeWatch, 0);

const onResize = () => {
    const lgCanvas = document.querySelector("#lg") as HTMLCanvasElement;
    lgCanvas.width = innerWidth;
    lgCanvas.height = innerHeight * .7;
};
onResize();
window.addEventListener("resize", onResize);

document.querySelector("#run")?.addEventListener("click", () => {
    graph.runStep();
});
document.querySelector("#clear")?.addEventListener("click", () => {
    Array.from((document.querySelector("#logs") as HTMLDivElement).children).forEach(x => x.remove());
});
document.querySelector("#save")?.addEventListener("click", () => {
    const a = document.createElement("a");
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(graph.serialize()))}`;
    a.download = "overflow.json";
    a.click();
});
const file = document.querySelector("#file") as HTMLInputElement;
file.addEventListener("change", () => {
    if(file.files === null || file.files.length === 0) return;
    // @ts-ignore - d.ts requires `string`, but we only have `File`
    graph.load(file.files[0]);
});
document.querySelector("#load")?.addEventListener("click", () => {
    file.files = null;
    file.click();
});
document.querySelector("#docs")?.addEventListener("click", () => {
    window.open("/docs/index.html");
});