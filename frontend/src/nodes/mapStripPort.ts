import { LGraphNode, LiteGraph } from "litegraph.js";

export class MapStripPorts extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Strip ports";
    serialize_widgets = true;
    async onAction(action, data) {
        this.triggerSlot(0, data.map(x => x.replace(/:\d+$/, "")));
    }
}