class myWebComponent extends HTMLElement {
    constructor(){
        super();
        let webcomponent = document.createElement("p");
        webcomponent.innerHTML = "[WEB COMPONENT]";
        const shadow = this.attachShadow({
            mode: "closed"
        });
        shadow.appendChild(webcomponent);
        console.log("Created");
    }
    static get observedAttributes() {
        return [
            "color"
        ];
    }
    connectedCallback() {
        console.log("Added to DOM");
    }
    disconnectedCallback() {
        console.log("Removed from DOM");
    }
    attributeChangedCallback() {
        console.log("Changed attributes");
    }
}
customElements.define("my-web-component", myWebComponent);
let add = document.getElementById("add");
if (add != null) {
    add.innerHTML = "Add webcomponent";
    add.onclick = function() {
        let webcomponent = document.createElement("my-web-component");
        document.body.appendChild(webcomponent);
    };
}
let rem = document.getElementById("delete");
if (rem != null) {
    rem.innerHTML = "Delete webcomponent";
    rem.onclick = function() {
        let webcomponent = document.querySelector("my-web-component");
        if (webcomponent != null) webcomponent.remove();
    };
}
let edit = document.getElementById("edit");
if (edit != null) {
    edit.innerHTML = "Edit webcomponent";
    edit.onclick = function() {
        let webcomponent = document.querySelector("my-web-component");
        if (webcomponent != null) webcomponent.setAttribute("color", "black");
    };
}

//# sourceMappingURL=cycle.6c06b92b.js.map
