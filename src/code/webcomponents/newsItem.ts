import { newsRatings } from './newsRatings';

export class newsItem extends HTMLElement {
    constructor() {
        super();
        let template: HTMLTemplateElement = document.getElementById("news-item") as HTMLTemplateElement;
        let templateContent: DocumentFragment = template.content;
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateContent.cloneNode(true));

        const ratingsButton: HTMLButtonElement = shadow.getElementById('ratings-button') as HTMLButtonElement;
        if (ratingsButton) {
            ratingsButton.addEventListener('click', this.callRatingEvent.bind(this));
        }
    }

    static get observedAttributes() {
        return ['title', 'date', 'source', 'desc', 'url', 'img', 'time'];
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
        const img: string | null = this.getAttribute('img');
        const time: string | null = this.getAttribute('time');

        if (this.shadowRoot != null) {
            const titleAttr: HTMLElement | null = this.shadowRoot.getElementById('title');
            const dateAttr: HTMLElement | null = this.shadowRoot.getElementById('date');
            const sourceAttr: HTMLElement | null = this.shadowRoot.getElementById('source');
            const descAttr: HTMLElement | null = this.shadowRoot.getElementById('desc');
            const urlAttr: HTMLLinkElement = this.shadowRoot.getElementById('url') as HTMLLinkElement;
            const imgAttr: HTMLImageElement = this.shadowRoot.getElementById('img') as HTMLImageElement;
            const timeAttr: HTMLElement | null = this.shadowRoot.getElementById('time');

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
            if (imgAttr != null && img != null) {
                imgAttr.src = img;
            }
            if (timeAttr != null && time != null) {
                timeAttr.textContent = `Time passed since post: ${time}`;
            }
        }
    }

    callRatingEvent() {
        const articleId = this.getAttribute('article_id');
        const eventDetail = {
            article_id: articleId,
        };

        const ratingClickedEvent = new CustomEvent('rating-clicked', {
            detail: eventDetail,
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(ratingClickedEvent);
    }
};
