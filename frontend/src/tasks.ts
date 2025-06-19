export class Task {
    private el: HTMLDivElement;
    constructor(name) {
        this.el = document.createElement("div");
        this.el.innerText = name;
        document.querySelector("#tasks")?.appendChild(this.el);
    }

    remove() {
        this.el.remove();
    }
}