class e extends HTMLElement{constructor(){super();let e=document.createElement("p");e.innerHTML="[WEB COMPONENT]",this.attachShadow({mode:"closed"}).appendChild(e),console.log("Created")}static get observedAttributes(){return["color"]}connectedCallback(){console.log("Added to DOM")}disconnectedCallback(){console.log("Removed from DOM")}attributeChangedCallback(){console.log("Changed attributes")}}customElements.define("my-web-component",e);let t=document.getElementById("add");null!=t&&(t.innerHTML="Add webcomponent",t.onclick=function(){let e=document.createElement("my-web-component");document.body.appendChild(e)});let n=document.getElementById("delete");null!=n&&(n.innerHTML="Delete webcomponent",n.onclick=function(){let e=document.querySelector("my-web-component");null!=e&&e.remove()});let o=document.getElementById("edit");null!=o&&(o.innerHTML="Edit webcomponent",o.onclick=function(){let e=document.querySelector("my-web-component");null!=e&&e.setAttribute("color","black")});
//# sourceMappingURL=cycle.6278862c.js.map