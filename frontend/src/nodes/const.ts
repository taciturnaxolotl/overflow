import { LGraphNode, LiteGraph } from "litegraph.js";

export class ConstList extends LGraphNode {
    str: string = "";

    constructor() {
        super();
        this.addWidget("text", "List of targets", "", value => this.str = value, { multiline: true });
        this.addOutput("Targets", LiteGraph.EVENT);
    }
    title = "Constant list";
    onExecute() {
        // this.setOutputData(0, this.str);
        this.triggerSlot(0, this.str.split("\n").filter(x => x));
    }
    // onAction(action, data) {
    //     if(action !== "play") return;
    //     this.triggerSlot(0, this.str);
    // }
}