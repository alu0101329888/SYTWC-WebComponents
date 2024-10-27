class myWebComponent extends HTMLElement {

    static observedAttributes = ["color"];

    constructor() {
        super();
        let webcomponent: HTMLElement = document.createElement("p");
        webcomponent.innerHTML = "[WEB COMPONENT]";
        const shadow: ShadowRoot = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(webcomponent);
        console.log("Creado");
    }

    connectedCallback() {
        console.log("Adjuntado al DOM");
    }

    disconnectedCallback() {
        console.log("Separado del DOM");
    }

    attributeChangedCallback() {
        console.log("Cambio en los atributos");
    }
};

customElements.define('my-web-component', myWebComponent);
let add: HTMLElement | null = document.getElementById("añadir");
if (add != null) {
    add.innerHTML = "Añadir webcomponent";
    add.onclick = function () {
        let webcomponent: HTMLElement = document.createElement('my-web-component');
        document.body.appendChild(webcomponent);
    }
}
let rem: HTMLElement | null = document.getElementById("eliminar");
if (rem != null) {
    rem.innerHTML = "Eliminar webcomponent";
    rem.onclick = function () {
        let webcomponent: HTMLElement | null = document.querySelector('my-web-component');
        if (webcomponent != null) {
            webcomponent.remove();
        }
    }
}
let edit: HTMLElement | null = document.getElementById("editar");
if (edit != null) {
    edit.innerHTML = "Editar webcomponent";
    edit.onclick = function () {
        let webcomponent: HTMLElement | null = document.querySelector('my-web-component');
        if (webcomponent != null) {
            webcomponent.setAttribute("color", "black");
        }
    }
}
