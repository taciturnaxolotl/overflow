import { LGraphNode, LiteGraph } from "litegraph.js";
import { expandCidr } from "cidr-tools";

export class IPRange extends LGraphNode {
    ip: string = "";
    mask: number = 24;

    constructor() {
        super();
        this.addWidget("text", "IP", "", value => this.ip = value);
        this.addWidget("number", "Mask", "", value => this.mask = value);
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "IP range";
    serialize_widgets = true;
    onExecute() {
        this.triggerSlot(0, Array.from(expandCidr(`${this.ip}/${this.mask}`)));
    }
}