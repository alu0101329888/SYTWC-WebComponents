import { newsContainer } from './webcomponents/newsContainer';

customElements.define("news-container", newsContainer);

const newsElement: newsContainer = document.createElement('news-container') as newsContainer;
document.getElementById("news-container")?.appendChild(newsElement);
