import { LGraphNode, LiteGraph } from "litegraph.js";

export class MapStripProtocol extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Strip protocols";
    serialize_widgets = true;
    async onAction(action, data) {
        this.triggerSlot(0, data.map(x => x.replace(/^[^:\/]+:\/\//, "")));
    }
}