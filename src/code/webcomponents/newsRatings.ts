export class newsRatings extends HTMLElement {
    constructor() {
        super();
        let template: HTMLTemplateElement = document.getElementById("ratings-element") as HTMLTemplateElement;
        let templateContent: DocumentFragment = template.content;
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateContent.cloneNode(true));
    }

    static get observedAttributes() {
        return ['average', 'enabled'];
    }

    async connectedCallback() {
        let filledStar: string = '★';
        let emptyStar: string = '☆';
        let stars: string = '';
        let totalSum: number = 0;
        let randomAmount: number = Math.floor(Math.random() * 16);
        for (let counter = 0; counter < randomAmount; ++counter) {
            const response: Response = await fetch('https://whatthecommit.com/index.txt');
            const data: string = await response.text();
            const comment: HTMLParagraphElement = document.createElement('p');
            let randomRating: number = Math.floor(Math.random() * 5)
            totalSum += randomRating;
            stars = '';
            for (let ctr = 0; ctr <= randomRating; ++ctr) {
                stars += filledStar;
            }
            while (stars.length < 5) {
                stars += emptyStar;
            }

            comment.innerText = data + ' - ' + stars;
            this.shadowRoot?.getElementById('comments')?.appendChild(comment);
        }
        totalSum /= randomAmount;
        totalSum = Math.ceil(totalSum);
        stars = '';
        for (let counter = 0; counter < totalSum; ++counter) {
            stars += filledStar;
        }
        while (stars.length < 5) {
            stars += emptyStar;
        }
        
        const averageElement = this.shadowRoot?.getElementById('average');
        if (averageElement) {
            averageElement.innerText = 'Rating: ' + stars;
        }
    }

    attributeChangedCallback() {
        const ratingsDiv: HTMLDivElement = this.shadowRoot?.querySelector('#ratings') as HTMLDivElement;
        if (this.getAttribute('enabled') == 'true') {
            ratingsDiv.style.display = 'grid';
        } else {
            ratingsDiv.style.display = 'none';
        }
    }

    disconnectedCallback() {
        
    }
}
