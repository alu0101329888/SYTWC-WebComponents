class newsWebComponent extends HTMLElement {
    constructor(){
        super();
        let template = document.getElementById("news-header");
        let templateContent = template.content;
        const shadow = this.attachShadow({
            mode: "open"
        });
        shadow.appendChild(templateContent.cloneNode(true));
    }
    static get observedAttributes() {
        return [
            "title",
            "date",
            "source",
            "desc",
            "url"
        ];
    }
    connectedCallback() {
        this.update();
    }
    attributeChangedCallback() {
        this.update();
    }
    update() {
        const title = this.getAttribute("title");
        const date = this.getAttribute("date");
        const source = this.getAttribute("source");
        const desc = this.getAttribute("desc");
        const url = this.getAttribute("url");
        if (this.shadowRoot != null) {
            const titleAttr = this.shadowRoot.getElementById("title");
            const dateAttr = this.shadowRoot.getElementById("date");
            const sourceAttr = this.shadowRoot.getElementById("source");
            const descAttr = this.shadowRoot.getElementById("desc");
            const urlAttr = this.shadowRoot.getElementById("url");
            if (titleAttr != null) titleAttr.textContent = title;
            if (dateAttr != null) dateAttr.textContent = date;
            if (sourceAttr != null) sourceAttr.textContent = source;
            if (descAttr != null) descAttr.textContent = desc;
            if (urlAttr != null && url != null) urlAttr.href = url;
        }
    }
}
customElements.define("news-header", newsWebComponent);
async function display() {
    const grid = document.getElementById("my-grid");
    const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&pageSize=3&apiKey=90afce725a864280b6503f7feb9ab277");
    const data = await response.json();
    data.articles.forEach((article)=>{
        const newsElement = document.createElement("news-header");
        newsElement.setAttribute("title", article.title);
        newsElement.setAttribute("date", article.publishedAt);
        newsElement.setAttribute("source", article.source.name);
        newsElement.setAttribute("desc", article.content);
        newsElement.setAttribute("url", article.url);
        if (grid != null) grid.appendChild(newsElement);
    });
}
display();

//# sourceMappingURL=grid.afb9f47a.js.map
