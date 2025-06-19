import { LGraphNode, LiteGraph } from "litegraph.js";
import { expandCidr } from "cidr-tools";

export class IPRange extends LGraphNode {
    constructor() {
        super();
        this.addProperty("ip", "", "text");
        this.addProperty("mask", 24, "number");
        this.addWidget("text", "IP", "", "ip");
        this.addWidget("number", "Mask", 24, "mask");
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "IP range";
    serialize_widgets = true;
    onExecute() {
        this.triggerSlot(0, Array.from(expandCidr(`${this.properties.ip}/${this.properties.mask}`)));
    }
}