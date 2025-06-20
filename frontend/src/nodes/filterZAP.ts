import { LGraphNode, LiteGraph } from "litegraph.js";
import { fetchErr } from "../fetch";
import { Task } from "../tasks";

export class FilterZAP extends LGraphNode {
    constructor() {
        super();
        this.addInput("Targets", LiteGraph.ACTION);
        this.addProperty("token", "", "text");
        this.addProperty("type", "spider", "combo");
        this.addWidget("text", "Token", "", "token");
        this.addWidget("combo", "Scan type", "spider", "type", { values: ["spider", "scan"] });
        this.addOutput("Targets", LiteGraph.EVENT);
        this.addOutput("Logs", LiteGraph.EVENT);
    }
    title = "ZAP scan";
    serialize_widgets = true;
    async onAction(action, data) {
        for(const target of data) {
            const task = new Task(`ZAP ${this.properties.type === "spider" ? "spider " : ""}scan of ${target}`);
            const f = await fetchErr(`/api/zap/${this.properties.type}`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    apiKey: this.properties.token,
                    target
                })
            }, task);
            const json = await f.json();
            if(this.properties.type === "spider")
                this.triggerSlot(0, json);
            else
                this.triggerSlot(1, json.map(x => `${x.alert.url} - ${x.alert.description}`));
            task.remove();
        }
    }
}