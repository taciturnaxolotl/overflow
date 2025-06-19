import { LGraphNode, LiteGraph } from "litegraph.js";

export class MapStripPaths extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Strip paths";
    serialize_widgets = true;
    async onAction(action, data) {
        this.triggerSlot(0, data.map(x => x.replace(/(?<!\/)\/(?!\/).*$/, "")));
    }
}