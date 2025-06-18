import "litegraph.js/css/litegraph.css";
import { LGraph, LGraphCanvas, LiteGraph } from "litegraph.js";

const graph = new LGraph();
const canvas = new LGraphCanvas("#lg", graph);

const nodeConst = LiteGraph.createNode("basic/const");
nodeConst.pos = [200, 200];
graph.add(nodeConst);

const nodeWatch = LiteGraph.createNode("basic/watch");
nodeWatch.pos = [700, 200];
graph.add(nodeWatch);

nodeConst.connect(0, nodeWatch, 0);
graph.start();

const onResize = () => {
    const lgCanvas = document.querySelector("#lg") as HTMLCanvasElement;
    lgCanvas.width = innerWidth;
    lgCanvas.height = innerHeight;
};
onResize();
window.addEventListener("resize", onResize);