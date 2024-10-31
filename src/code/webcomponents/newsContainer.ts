import { newsItem } from './newsItem';
import { footer } from './newsFooter';
import { navbar } from './newsNavbar';
import { newsRatings } from './newsRatings';

export class newsContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.loadTemplates();
    }

    connectedCallback(): void {
        console.log("Connected");
    }

    async loadTemplates(): Promise<void> {
        let templateNavbar: HTMLTemplateElement = document.createElement('template');
        templateNavbar.innerHTML = await (await fetch(new URL('../../pages/templates/navbar_template.html', import.meta.url))).text();
        document.body.appendChild(templateNavbar.content.cloneNode(true));
        customElements.define("navbar-element", navbar);
        this.loadNavbar();

        let templateRatings: HTMLTemplateElement = document.createElement('template');
        templateRatings.innerHTML = await (await fetch(new URL('../../pages/templates/ratings_template.html', import.meta.url))).text();
        document.body.appendChild(templateRatings.content.cloneNode(true));
        customElements.define("ratings-element", newsRatings);

        let templateNews: HTMLTemplateElement = document.createElement('template');
        templateNews.innerHTML = await (await fetch(new URL('../../pages/templates/news_item_template.html', import.meta.url))).text();
        document.body.appendChild(templateNews.content.cloneNode(true));
        customElements.define("news-item", newsItem);
        this.loadNews();

        let templateFooter: HTMLTemplateElement = document.createElement('template');
        templateFooter.innerHTML = await (await fetch(new URL('../../pages/templates/footer_template.html', import.meta.url))).text();
        document.body.appendChild(templateFooter.content.cloneNode(true));
        customElements.define("footer-element", footer);
        this.loadFooter();
    }

    loadNavbar(): void {
        const newsNavbarElement: navbar = document.createElement('navbar-element') as navbar;
        newsNavbarElement.addEventListener('close-rating', ((event: CustomEvent) => {
            (this.shadowRoot?.querySelectorAll('ratings-element') as NodeListOf<newsRatings>).forEach((rating: newsRatings) => {
                rating.setAttribute('enabled', 'false');
            }); 
        }) as EventListener);
        this.shadowRoot?.appendChild(newsNavbarElement);
    }

    async loadNews(): Promise<void> {
        let div: HTMLDivElement = document.createElement('div');
        div.id = 'news-list';
        let style: HTMLStyleElement = document.createElement('style')
        style.innerHTML = await (await fetch(new URL('../../styles/news_list_style.scss', import.meta.url))).text();
        this.shadowRoot?.appendChild(style);
        this.shadowRoot?.appendChild(div);
        const container: HTMLElement | null | undefined = this.shadowRoot?.getElementById('news-list');
    
        const response: Response = await fetch('https://newsdata.io/api/1/latest?apikey=pub_577455afabf3e7c3c90e8bdc2510d5cc2dc9f&language=en');
        const data: any = await response.json();
        // let data = JSON.parse(`
        // {
        //     "status": "success",
        //     "totalResults": 161707,
        //     "results": [
        //         {
        //         "article_id": "f6a60952f418af193618f7fd351d6e0f",
        //         "title": "ROCKWOOL A/S – transactions in connection with share buy-back programme",
        //         "link": "https://www.globenewswire.com/news-release/2024/10/30/2971512/0/en/ROCKWOOL-A-S-transactions-in-connection-with-share-buy-back-programme.html",
        //         "keywords": [
        //             "dk0010219153",
        //             "copenhagen:rock b"
        //         ],
        //         "creator": null,
        //         "video_url": null,
        //         "description": "Company announcementfor ROCKWOOL A/SRelease no. 59 2024to Nasdaq Copenhagen",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": null,
        //         "source_id": "globenewswire",
        //         "source_priority": 7268,
        //         "source_name": "Globe Newswire",
        //         "source_url": "https://www.globenewswire.com",
        //         "source_icon": "https://i.bytvi.com/domain_icons/globenewswire.jpg",
        //         "language": "english",
        //         "country": [
        //             "united states of america"
        //         ],
        //         "category": [
        //             "business"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": true
        //         },
        //         {
        //         "article_id": "0251a24b3fdc9743f35f05d52d538835",
        //         "title": "Emanuel isa true hero",
        //         "link": "https://www.clintonnc.com/opinion/99987/emanuel-isa-true-hero",
        //         "keywords": [
        //             "opinion"
        //         ],
        //         "creator": [
        //             "gpsAdmin2"
        //         ],
        //         "video_url": null,
        //         "description": "Superman actor Christopher Reeve once said “a hero is an ordinary individual who finds the strength to persevere and endure in spite of overwhelming obstacles.”",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": null,
        //         "source_id": "clintonnc",
        //         "source_priority": 44208,
        //         "source_name": "Clinton Nc News",
        //         "source_url": "https://www.clintonnc.com",
        //         "source_icon": "https://i.bytvi.com/domain_icons/clintonnc.png",
        //         "language": "english",
        //         "country": [
        //             "united states of america"
        //         ],
        //         "category": [
        //             "top"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "0b8aa30b777612316e65a3453e39c928",
        //         "title": "UK hot weather maps show three-day plume to catapult temperatures by balmy 9C",
        //         "link": "https://www.express.co.uk/news/weather/1969104/uk-hot-weather-maps-temps-november",
        //         "keywords": [
        //             "weather"
        //         ],
        //         "creator": [
        //             "Astha Saxena"
        //         ],
        //         "video_url": null,
        //         "description": "EXCLUSIVE: A weather expert suggested 'records may be broken' as Britain is likely to witness a drier and milder November this year.",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": "https://cdn.images.express.co.uk/img/dynamic/153/590x/1969104_1.jpg",
        //         "source_id": "expresscouk",
        //         "source_priority": 1139,
        //         "source_name": "Express",
        //         "source_url": "https://www.express.co.uk",
        //         "source_icon": "https://i.bytvi.com/domain_icons/expresscouk.png",
        //         "language": "english",
        //         "country": [
        //             "united kingdom"
        //         ],
        //         "category": [
        //             "top"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "3de6ab6ed46efd01447e5fa93b99e8b0",
        //         "title": "Meet world's richest monarch, who married 4 times, has Rs 356900 crore net worth, richer than King Charles, he is...",
        //         "link": "https://www.dnaindia.com/viral/report-meet-world-s-richest-monarch-who-married-4-times-has-rs-356900-crore-net-worth-richer-than-king-charles-3115643",
        //         "keywords": [
        //             "viral"
        //         ],
        //         "creator": [
        //             "Pravrajya Suruchi"
        //         ],
        //         "video_url": null,
        //         "description": "Meet the world's wealthiest monarch who holds an estimated net worth of USD 43 billion from extensive Thai assets.",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": "https://cdn.dnaindia.com/sites/default/files/styles/third/public/2024/10/30/2660066-image-2024-10-30t163205.122.jpg",
        //         "source_id": "dnaindia",
        //         "source_priority": 18388,
        //         "source_name": "Dna",
        //         "source_url": "https://www.dnaindia.com",
        //         "source_icon": null,
        //         "language": "english",
        //         "country": [
        //             "india"
        //         ],
        //         "category": [
        //             "top"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "3311e451b57aa0ca3919165cf2fa3588",
        //         "title": "Dancing on Ice stars confirm they are leaving ITV show",
        //         "link": "https://ca.news.yahoo.com/dancing-ice-stars-confirm-leaving-102800739.html",
        //         "keywords": [
        //             "entertainment"
        //         ],
        //         "creator": [
        //             "Digital Spy"
        //         ],
        //         "video_url": null,
        //         "description": "Dancing on Ice professionals Mark Hanretty and Brendyn Hatfield have confirmed they will be departing the show in 2025.",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": "https://s.yimg.com/ny/api/res/1.2/mg9PiGGg0OMxcHci8xwNiA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02MjU7Y2Y9d2VicA--/https://media.zenfs.com/en/digital_spy_281/58b9fa0703f933552f106dc751a80904",
        //         "source_id": "yahoo",
        //         "source_priority": 17,
        //         "source_name": "Yahoo! News",
        //         "source_url": "https://news.yahoo.com",
        //         "source_icon": "https://i.bytvi.com/domain_icons/yahoo.png",
        //         "language": "english",
        //         "country": [
        //             "canada"
        //         ],
        //         "category": [
        //             "sports"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "8880eedbca60f4601d0c463e72078b32",
        //         "title": "Naga Vamsi announces when the NBK 109 title teaser will drop - 123telugu",
        //         "link": "https://news.google.com/rss/articles/CBMingFBVV95cUxOSmh4YzNSYUZlcHNJTXk2RlNwanM0S3ZVUWRCbEFTQXBraFFCdHgtUkNWOUFnVDU5QWhaVnRYMTFiSkpkdFA5S2hjRlc0MmRhYnFsSnB2SERWYjRHSjJaZ3pNZWNnUkQ3OE1oeGZCNEYyR3g2dnM4RUkzdV9oUWxEWmxKVERFU3NDS2ZFbV9lY0dKM29wLWpGLVg2X3dSUdIBowFBVV95cUxQVzQwUEY1QU5zY0lURWhZd1U4X25DcUZtZHFZcndkaFQ5MlVybUcxbVZvZ0xxTkFlZ1FiY1g4REtDYWozSFVSV0lBWDZiSExrWTU5TkJYdlVCbGlSVl9qZkdiVzMxTE02Z0dBdTVtWUEtMHRXUHFQcGZnRE1MT0lyd2Nrb3F6Z0IwbU9UTTVNRFl6S3NQT3JwVU52MmFIZ0RJdHZJ?oc=5",
        //         "keywords": null,
        //         "creator": null,
        //         "video_url": null,
        //         "description": "Naga Vamsi announces when the NBK 109 title teaser will drop 123teluguNo Diwali special teaser for NBK109 TeluguOne NewsNaga Vamsi: NBK109's title glimpse has CG work pending Cinema Express#NBK109: Record Pre-release business film for Balakrishna’s Film In Recent Times KoimoiBalakrishna to decide the date of NBK109 Telugu360",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": null,
        //         "source_id": "google",
        //         "source_priority": 14,
        //         "source_name": "Google News",
        //         "source_url": "https://news.google.com",
        //         "source_icon": "https://i.bytvi.com/domain_icons/google.png",
        //         "language": "english",
        //         "country": [
        //             "india"
        //         ],
        //         "category": [
        //             "entertainment"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "5587391367983b988da61141005b39de",
        //         "title": "\'He was robbed\': Wilder made a prediction for the rematch of Usyk – Fury",
        //         "link": "https://eng.obozrevatel.com/section-news/news-he-was-robbed-wilder-made-a-prediction-for-the-rematch-of-usyk-fury-30-10-2024.html",
        //         "keywords": [
        //             "news"
        //         ],
        //         "creator": null,
        //         "video_url": null,
        //         "description": "The American shared his expectations from the fight",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": "https://i2.obozrevatel.com/news/2024/10/30/filestoragetemp-2024-10-30t101902-057.jpg?size=2010x1050",
        //         "source_id": "obozrevatel",
        //         "source_priority": 49980,
        //         "source_name": "Obozrevatel",
        //         "source_url": "https://www.obozrevatel.com",
        //         "source_icon": "https://i.bytvi.com/domain_icons/obozrevatel.jpg",
        //         "language": "english",
        //         "country": [
        //             "ukraine"
        //         ],
        //         "category": [
        //             "top"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "8811e99d5ae42c9df3527af2565a306e",
        //         "title": "Princess Kate was nervous to give late Queen this sweet gift",
        //         "link": "https://www.express.co.uk/news/royal/1969078/princess-kate-gift-queen",
        //         "keywords": [
        //             "royal"
        //         ],
        //         "creator": [
        //             "Alycia McNamara"
        //         ],
        //         "video_url": null,
        //         "description": "Princess Kate gave Queen Elizabeth this thoughtful gift one Christmas.",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": "https://cdn.images.express.co.uk/img/dynamic/106/590x/1969078_1.jpg",
        //         "source_id": "expresscouk",
        //         "source_priority": 1139,
        //         "source_name": "Express",
        //         "source_url": "https://www.express.co.uk",
        //         "source_icon": "https://i.bytvi.com/domain_icons/expresscouk.png",
        //         "language": "english",
        //         "country": [
        //             "united kingdom"
        //         ],
        //         "category": [
        //             "top"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "2e1a22ab5ebab6c70e649cd76a259e33",
        //         "title": "ROCKWOOL A/S – transaktioner i henhold til aktietilbagekøbsprogram",
        //         "link": "https://www.globenewswire.com/news-release/2024/10/30/2971512/0/da/ROCKWOOL-A-S-transaktioner-i-henhold-til-aktietilbagek%C3%B8bsprogram.html",
        //         "keywords": [
        //             "dk0010219153",
        //             "copenhagen:rock b"
        //         ],
        //         "creator": null,
        //         "video_url": null,
        //         "description": "Selskabsmeddelelsefor ROCKWOOL A/SMeddelelse nr. 59 – 2024til Nasdaq Copenhagen",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": null,
        //         "source_id": "globenewswire",
        //         "source_priority": 7268,
        //         "source_name": "Globe Newswire",
        //         "source_url": "https://www.globenewswire.com",
        //         "source_icon": "https://i.bytvi.com/domain_icons/globenewswire.jpg",
        //         "language": "english",
        //         "country": [
        //             "united states of america"
        //         ],
        //         "category": [
        //             "business"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         },
        //         {
        //         "article_id": "b6d33c009ef15bb9f2824203675b2ed4",
        //         "title": "Ruben Amorim appointment has Paul Scholes fearful after not getting No1 choice",
        //         "link": "https://www.express.co.uk/sport/football/1969142/ruben-amorim-man-utd-paul-scholes",
        //         "keywords": [
        //             "football"
        //         ],
        //         "creator": [
        //             "Patrick Austen-Hardy"
        //         ],
        //         "video_url": null,
        //         "description": "Paul Scholes has made his thoughts known about the prospect of Ruben Amorim becoming Manchester United manager.",
        //         "content": "ONLY AVAILABLE IN PAID PLANS",
        //         "pubDate": "2024-10-30 10:28:00",
        //         "pubDateTZ": "UTC",
        //         "image_url": "https://cdn.images.express.co.uk/img/dynamic/67/590x/1969142_1.jpg",
        //         "source_id": "expresscouk",
        //         "source_priority": 1139,
        //         "source_name": "Express",
        //         "source_url": "https://www.express.co.uk",
        //         "source_icon": "https://i.bytvi.com/domain_icons/expresscouk.png",
        //         "language": "english",
        //         "country": [
        //             "united kingdom"
        //         ],
        //         "category": [
        //             "sports"
        //         ],
        //         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
        //         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
        //         "duplicate": false
        //         }
        //     ],
        //     "nextPage": "1730284080175520767"
        //     }
        // `);
    
        data.results.forEach((article: any): void => {
            const newsItemElement: newsItem = document.createElement('news-item') as newsItem;
            newsItemElement.setAttribute('title', article.title);
            newsItemElement.setAttribute('date', article.pubDate);
            newsItemElement.setAttribute('source', article.source_name);
            newsItemElement.setAttribute('url', article.link);
            newsItemElement.setAttribute('article_id', article.article_id);
            if (article.description) newsItemElement.setAttribute('desc', article.description);
            if (article.image_url) {
                newsItemElement.setAttribute('img', article.image_url);
            } else {
                newsItemElement.setAttribute('img', article.source_icon);
            }

            this.loadRating(article.article_id);

            newsItemElement.addEventListener('rating-clicked', ((event: CustomEvent) => {
                const articleId: string = event.detail.article_id;
                const newsRatingElement: newsRatings = this.shadowRoot?.querySelector(`ratings-element[article_id="${articleId}"]`) as newsRatings;

                if (newsRatingElement) {
                    const isEnabled: boolean = newsRatingElement.getAttribute('enabled') == 'true';
                    newsRatingElement.setAttribute('enabled', (!isEnabled).toString());
                    const navbar: navbar = this.shadowRoot?.querySelector(`navbar-element`) as navbar;
                    if (navbar) {
                        navbar.setAttribute('rating-opened', (!isEnabled).toString());
                    }
                }
            }) as EventListener);
    
            if (container != null) {
                container.appendChild(newsItemElement);
            }
        });
    }

    loadFooter(): void {
        const newsFooterElement: navbar = document.createElement('footer-element') as navbar;
        this.shadowRoot?.appendChild(newsFooterElement);

        newsFooterElement.addEventListener('time-updated', ((event: CustomEvent): void => {
            this.updateTimes(event);
        }) as EventListener);
    }

    loadRating(article_id: string): void {
        const newsRatingsElement: newsRatings = document.createElement('ratings-element') as newsRatings;
        newsRatingsElement.setAttribute('article_id', article_id);
        this.shadowRoot?.appendChild(newsRatingsElement);
    }

    updateTimes(event: CustomEvent): void {
        const newsItems: NodeListOf<newsItem> = this.shadowRoot?.querySelectorAll('news-item') as NodeListOf<newsItem>;
        const now: Date = new Date();

        newsItems.forEach((item) => {
            const dateAttr = item.getAttribute('date');
            if (dateAttr != null) {
                const dateValue: number = new Date(dateAttr).getTime();
                const timeDifference: number = now.getTime() - dateValue;

                let totalTime : number= Math.floor(timeDifference / 1000);
                let days: number = Math.floor(totalTime / (24 * 3600));
                let hours: number = Math.floor((totalTime % (24 * 3600)) / 3600);
                let minutes: number = Math.floor((totalTime % 3600) / 60);
                let seconds: number = totalTime % 60;
                item.setAttribute('time', `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        });
    }
}
