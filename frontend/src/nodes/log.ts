import { LGraphNode, LiteGraph } from "litegraph.js";

export class LogVulnerable extends LGraphNode {
    note: string[] = [];

    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addWidget("text", "Description", "", value => this.note = value);
    }
    title = "Log as vulnerable";
    // onExecute() {
    //     for(const target of this.getInputData(0).split("\n")) {
    //         const logDiv = document.createElement("div");
    //         logDiv.innerText = `${target} logged as vulnerable with note "${this.note}"`;
    //         document.querySelector("#logs")?.appendChild(logDiv);
    //     }
    // }
    onAction(action, data) {
        console.log(action, data);
        for(const target of data.split("\n")) {
            const logDiv = document.createElement("div");
            logDiv.innerText = `${target} logged as vulnerable with note "${this.note}"`;
            document.querySelector("#logs")?.appendChild(logDiv);
        }
    }
}