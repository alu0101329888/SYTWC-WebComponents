export class footer extends HTMLElement {
    private time: number | null = null;

    constructor() {
        super();
        let template: HTMLTemplateElement = document.getElementById("footer-element") as HTMLTemplateElement;
        let templateContent: DocumentFragment = template.content;
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateContent.cloneNode(true));
    }

    connectedCallback(): void {
        this.updateTime();
        this.time = window.setInterval(() => this.updateTime(), 1000);
    }

    disconnectedCallback(): void {
        if (this.time !== null) {
            clearInterval(this.time);
        }
    }

    updateTime(): void {
        const currentTime: string = new Date().toLocaleTimeString();
        const footerText: HTMLElement | null | undefined = this.shadowRoot?.getElementById('time');
        if (footerText) {
            footerText.textContent = `Current time: ${currentTime}`;
        }
        this.dispatchEvent(new CustomEvent('time-updated', {
            detail: {},
            bubbles: true,
            composed: true
        }));
    }
}
