import { LGraphNode, LiteGraph } from "litegraph.js";

export class FilterHasProtocol extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Has protocol";
    serialize_widgets = true;
    onAction(action, data) {
        this.triggerSlot(0,
            data.filter(x => x.match(/^[^:\/]+:\/\//))
        );
    }
}