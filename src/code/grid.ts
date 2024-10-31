class newsWebComponent extends HTMLElement {
    constructor() {
        super();
        let template: HTMLTemplateElement = document.getElementById("news-header") as HTMLTemplateElement;
        let templateContent: DocumentFragment = template.content;
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateContent.cloneNode(true));
    }

    static get observedAttributes(): string[] {
        return ['title', 'date', 'source', 'desc', 'url'];
    }

    connectedCallback(): void {
        this.update();
    }

    attributeChangedCallback(): void {
        this.update();
    }

    update(): void {
        const title: string | null = this.getAttribute('title');
        const date: string | null = this.getAttribute('date');
        const source: string | null = this.getAttribute('source');
        const desc: string | null = this.getAttribute('desc');
        const url: string | null = this.getAttribute('url');

        if (this.shadowRoot != null) {
            const titleAttr: HTMLElement | null = this.shadowRoot.getElementById('title');
            const dateAttr: HTMLElement | null = this.shadowRoot.getElementById('date');
            const sourceAttr: HTMLElement | null = this.shadowRoot.getElementById('source');
            const descAttr: HTMLElement | null = this.shadowRoot.getElementById('desc');
            const urlAttr: HTMLLinkElement = this.shadowRoot.getElementById('url') as HTMLLinkElement;

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
async function display(): Promise<void> {
    const grid: HTMLElement | null = document.getElementById('my-grid');

    // const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=90afce725a864280b6503f7feb9ab277');
    const response: Response = await fetch('https://api.thenewsapi.com/v1/news/all?api_token=Su00ZCif0GSE516Jh6c568Sctza1K9mJUJQtimm9&language=en&limit=3');
    const data: any = await response.json();
    // data.articles.forEach((article: any) => {
    //     const newsElement = document.createElement('news-header');
    //     newsElement.setAttribute('title', article.title);
    //     newsElement.setAttribute('date', article.publishedAt);
    //     newsElement.setAttribute('source', article.source.name);
    //     newsElement.setAttribute('desc', article.content);
    //     newsElement.setAttribute('url', article.url);
    //     if (grid != null) {
    //         grid.appendChild(newsElement);
    //     }
    // });
    data.data.forEach((article: any): void => {
        const newsElement = document.createElement('news-header');
        newsElement.setAttribute('title', article.title);
        newsElement.setAttribute('date', article.published_at);
        newsElement.setAttribute('source', article.source);
        newsElement.setAttribute('desc', article.snippet);
        newsElement.setAttribute('url', article.url);
        if (grid != null) {
            grid.appendChild(newsElement);
        }
    });
}

display();