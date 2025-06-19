import { LGraphNode, LiteGraph } from "litegraph.js";

export class ConstList extends LGraphNode {
    str: string = "";

    constructor() {
        super();
        this.addWidget("text", "List of targets", "", value => this.str = value, { multiline: true });
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Constant list";
    serialize_widgets = true;
    onExecute() {
        this.triggerSlot(0, this.str.split("\n").filter(x => x));
    }
}