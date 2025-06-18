import "litegraph.js/css/litegraph.css";
import { LGraph, LGraphCanvas, LiteGraph } from "litegraph.js";
import "./nodes";

const graph = new LGraph();
const canvas = new LGraphCanvas("#lg", graph);

const nodeConst = LiteGraph.createNode("overflow/const");
nodeConst.pos = [200, 200];
graph.add(nodeConst);

const nodeWatch = LiteGraph.createNode("overflow/log");
nodeWatch.pos = [700, 200];
graph.add(nodeWatch);

nodeConst.connect(0, nodeWatch, 0);

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