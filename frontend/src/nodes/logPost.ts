import { LGraphNode, LiteGraph } from "litegraph.js";
import { logBlue } from "../log";

export class LogPost extends LGraphNode {
    constructor() {
        super();
        this.addInput("Text", LiteGraph.ACTION);
        this.addProperty("url", "", "text");
        this.addWidget("text", "URL", "", "url");
    }
    title = "Log with a POST request";
    serialize_widgets = true;
    async onAction(action, data) {
        await fetch("/api/request", {
            headers: {
                "User-Agent": "overflow",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                url: this.properties.url,
                method: "POST",
                data: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        });
    }
}