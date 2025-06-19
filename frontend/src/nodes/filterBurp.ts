import { LGraphNode, LiteGraph } from "litegraph.js";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

export class FilterBurp extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("token", "", "text");
        this.addProperty("config", "", "text");
        this.addWidget("text", "Token", "", "token");
        this.addWidget("text", "Scanner configuration name", "", "config");
        this.addOutput("Targets", LiteGraph.EVENT);
        this.addOutput("Logs", LiteGraph.EVENT);
    }
    title = "Burp Suite scan";
    serialize_widgets = true;
    async onAction(action, data) {
        const task = new Task(`Burp Suite scan of ${data.length} hosts`);
        const f = await fetchErr("/api/burp", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                token: this.properties.token,
                configName: this.properties.config,
                targets: data
            })
        });
        const json = await f.json();
        for(const found of json.issue_events) {
            this.triggerSlot(1, [`(${found.issue.severity}/${found.issue.confidence}) ${found.issue.origin}${found.issue.path} - ${found.issue.name}`]);
            if(found.type !== "issue_found" || found.issue.severity === "info") continue;
            this.triggerSlot(0, [found.issue.origin + found.issue.path]);
        }
        task.remove();
    }
}