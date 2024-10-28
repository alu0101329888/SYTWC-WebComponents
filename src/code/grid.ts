class newsWebComponent extends HTMLElement {

    constructor() {
        super();
        let template: HTMLTemplateElement = document.getElementById("news-header") as HTMLTemplateElement;
        let templateContent = template.content;
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateContent.cloneNode(true));
    }

    static get observedAttributes() {
        return ['title', 'date', 'source', 'desc', 'url'];
    }

    connectedCallback() {
        this.update();
    }

    attributeChangedCallback() {
        this.update();
    }

    update() {
        const title: string | null = this.getAttribute('title');
        const date: string | null = this.getAttribute('date');
        const source: string | null = this.getAttribute('source');
        const desc: string | null = this.getAttribute('desc');
        const url: string | null = this.getAttribute('url');

        if (this.shadowRoot != null) {
            const titleAttr = this.shadowRoot.getElementById('title');
            const dateAttr = this.shadowRoot.getElementById('date');
            const sourceAttr = this.shadowRoot.getElementById('source');
            const descAttr = this.shadowRoot.getElementById('desc');
            const urlAttr = this.shadowRoot.getElementById('url') as HTMLLinkElement;

            if (titleAttr != null) {
                titleAttr.textContent = title;
            }
            if (dateAttr != null) {
                dateAttr.textContent = date;
            }
            if (sourceAttr != null) {
                sourceAttr.textContent = source;
            }
            if (descAttr != null) {
                descAttr.textContent = desc;
            }
            if (urlAttr != null && url != null) {
                urlAttr.href = url;
            }
        }
    }
};

customElements.define("news-header", newsWebComponent);
async function display() {
    const grid: HTMLElement | null = document.getElementById('my-grid');

    const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=90afce725a864280b6503f7feb9ab277');
    const data = await response.json();
    data.articles.forEach((article: any) => {
        const newsElement = document.createElement('news-header');
        newsElement.setAttribute('title', article.title);
        newsElement.setAttribute('date', article.publishedAt);
        newsElement.setAttribute('source', article.source.name);
        newsElement.setAttribute('desc', article.content);
        newsElement.setAttribute('url', article.url);
        if (grid != null) {
            grid.appendChild(newsElement);
        }
    });
}

display();