export class navbar extends HTMLElement {
    constructor() {
        super();
        let template: HTMLTemplateElement = document.getElementById("navbar-element") as HTMLTemplateElement;
        let templateContent: DocumentFragment = template.content;
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateContent.cloneNode(true));
    }

    static get observedAttributes(): string[] {
        return ['rating-opened'];
    }

    connectedCallback(): void {
        this.shadowRoot?.querySelector('#go-back')?.addEventListener('click', () => {
            if (this.getAttribute('rating-opened') != 'true') {
                window.location.href = 'https://alu0101329888.github.io/SYTWC-WebComponents/index.html';
            } else {
                this.setAttribute('rating-opened', 'false');

                const closeEvent: CustomEvent = new CustomEvent('close-rating', {
                    detail: {},
                    bubbles: true,
                    composed: true
                });

                this.dispatchEvent(closeEvent);
            }
        });
    }

    attributeChangedCallback(): void {
        const backButton: HTMLButtonElement = this.shadowRoot?.querySelector('#go-back') as HTMLButtonElement;
        if (this.getAttribute('rating-opened') == 'true') {
            backButton.innerText = "Close";
        } else {
            backButton.innerText = "Go back";
        }
    }
}
