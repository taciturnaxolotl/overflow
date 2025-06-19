import { LGraphNode, LiteGraph } from "litegraph.js";

export class MapPrefixSuffix extends LGraphNode {
    prefix: string = "";
    suffix: string = "";

    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addWidget("text", "Prefix", "", value => this.prefix = value);
        this.addWidget("text", "Suffix", "", value => this.suffix = value);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Prefix & suffix";
    serialize_widgets = true;
    async onAction(action, data) {
        this.triggerSlot(0, data.map(x => this.prefix + x + this.suffix));
    }
}