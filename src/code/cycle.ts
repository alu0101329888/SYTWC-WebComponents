class myWebComponent extends HTMLElement {
    constructor() {
        super();
        let webcomponent: HTMLElement = document.createElement("p");
        webcomponent.innerHTML = "[WEB COMPONENT]";
        const shadow: ShadowRoot = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(webcomponent);
        console.log("Created");
    }

    static get observedAttributes(): string[] {
        return ["color"];
    } 

    connectedCallback(): void {
        console.log("Added to DOM");
    }

    disconnectedCallback(): void {
        console.log("Removed from DOM");
    }

    attributeChangedCallback(): void {
        console.log("Changed attributes");
    }
};

customElements.define('my-web-component', myWebComponent);
let add: HTMLElement | null = document.getElementById("add");
if (add != null) {
    add.innerHTML = "Add webcomponent";
    add.onclick = function () {
        let webcomponent: HTMLElement = document.createElement('my-web-component');
        document.body.appendChild(webcomponent);
    }
}
let rem: HTMLElement | null = document.getElementById("delete");
if (rem != null) {
    rem.innerHTML = "Delete webcomponent";
    rem.onclick = function () {
        let webcomponent: HTMLElement | null = document.querySelector('my-web-component');
        if (webcomponent != null) {
            webcomponent.remove();
        }
    }
}
let edit: HTMLElement | null = document.getElementById("edit");
if (edit != null) {
    edit.innerHTML = "Edit webcomponent";
    edit.onclick = function () {
        let webcomponent: HTMLElement | null = document.querySelector('my-web-component');
        if (webcomponent != null) {
            webcomponent.setAttribute("color", "black");
        }
    }
}
