class newsItem extends HTMLElement {

    constructor() {
        super();
        let template: HTMLTemplateElement = document.getElementById("news-item") as HTMLTemplateElement;
        let templateContent = template.content;
        const shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
        shadow.appendChild(templateContent.cloneNode(true));
    }

    static get observedAttributes() {
        return ['title', 'date', 'source', 'desc', 'url', 'img'];
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

        if (this.shadowRoot != null) {
            const titleAttr = this.shadowRoot.getElementById('title');
            const dateAttr = this.shadowRoot.getElementById('date');
            const sourceAttr = this.shadowRoot.getElementById('source');
            const descAttr = this.shadowRoot.getElementById('desc');
            const urlAttr = this.shadowRoot.getElementById('url') as HTMLLinkElement;
            const imgAttr = this.shadowRoot.getElementById('img') as HTMLImageElement;


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
        }
    }
};

customElements.define("news-item", newsItem);
async function displayNews() {
    const container: HTMLElement | null = document.getElementById('news-list');

    // const response = await fetch('https://newsdata.io/api/1/latest?apikey=pub_577455afabf3e7c3c90e8bdc2510d5cc2dc9f&language=en');
    // const data = await response.json();
    let data = JSON.parse(`
    {
        "status": "success",
        "totalResults": 169300,
        "results": [
            {
            "article_id": "2e4931591cc52040b0d6873932adf65a",
            "title": "IBPS Officer Scale I, Assistant Officer posts provisional result out; here’s direct link",
            "link": "https://scroll.in/announcements/1075071/ibps-officer-scale-i-assistant-officer-posts-provisional-result-out-heres-direct-link",
            "keywords": null,
            "creator": [
                "Scroll Staff"
            ],
            "video_url": null,
            "description": "Candidates can check their provisional results through the official website ibps.in.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": "https://d1u4oo4rb13yy8.cloudfront.net/article/85979-jogrrugmmg-1522675686.jpg",
            "source_id": "scroll",
            "source_priority": 26952,
            "source_name": "Scroll.in",
            "source_url": "https://scroll.in",
            "source_icon": "https://i.bytvi.com/domain_icons/scroll.png",
            "language": "english",
            "country": [
                "india"
            ],
            "category": [
                "top"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "41a5a31ce257dd66f6f57694fa9a85da",
            "title": "Wholesale electricity prices jump ahead of renewable surge",
            "link": "https://www.theaustralian.com.au/business/wholesale-electricity-prices-jump-in-winter-in-blow-to-bill-relief-hopes-ahead-of-renewable-surge/news-story/1a8d5ed83133f0f2eaf7ad64d2f380b7",
            "keywords": null,
            "creator": null,
            "video_url": null,
            "description": null,
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": "https://content.api.news/v3/images/bin/a028328cea38b26c9fb4fd350ab0b5d2",
            "source_id": "theaustralian",
            "source_priority": 69721,
            "source_name": "The Australian",
            "source_url": "https://www.theaustralian.com.au",
            "source_icon": "https://i.bytvi.com/domain_icons/theaustralian.png",
            "language": "english",
            "country": [
                "australia"
            ],
            "category": [
                "other"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "0eb8d77bb21ce468081475eb1ba0b28b",
            "title": "Halloween food safety: Tips to keep your trick-or-treaters and party guests safe",
            "link": "https://www.foodsafetynews.com/2024/10/halloween-food-safety-tips-to-keep-your-trick-or-treaters-and-party-guests-safe/",
            "keywords": [
                "consumer education",
                "trick-or-treating",
                "halloween food safety",
                "food safety tips"
            ],
            "creator": [
                "News Desk"
            ],
            "video_url": null,
            "description": "Halloween, that magical time when ghouls, goblins and superheroes roam the streets, is not just about the chill of the night but also the thrill of the bite. As you navigate through cobwebbed corners of trick-or-treating or host a spine-chilling soiree, remember: Not all monsters lurk in the shadows —... Continue Reading",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": null,
            "source_id": "foodsafetynews",
            "source_priority": 21076,
            "source_name": "Foodsafetynews",
            "source_url": "https://www.foodsafetynews.com",
            "source_icon": "https://i.bytvi.com/domain_icons/foodsafetynews.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "food"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "5fc0b40cbf570b201cc8846f967cf72b",
            "title": "Wholesale electricity prices jump ahead of renewable surge",
            "link": "https://www.heraldsun.com.au/business/wholesale-electricity-prices-jump-in-winter-in-blow-to-bill-relief-hopes-ahead-of-renewable-surge/news-story/1a8d5ed83133f0f2eaf7ad64d2f380b7",
            "keywords": null,
            "creator": null,
            "video_url": null,
            "description": null,
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": "https://content.api.news/v3/images/bin/5b6f064a500181f0f9b6009d516b69cb",
            "source_id": "heraldsun",
            "source_priority": 11450,
            "source_name": "Herald Sun",
            "source_url": "https://www.heraldsun.com.au",
            "source_icon": "https://i.bytvi.com/domain_icons/heraldsun.png",
            "language": "english",
            "country": [
                "australia"
            ],
            "category": [
                "top"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": true
            },
            {
            "article_id": "3656202af2a31833afa2c20b013e8ff7",
            "title": "Awas, Zat Pestisida Ditemukan di Anggur Impor Asal Tiongkok",
            "link": "https://mediaindonesia.com/humaniora/713511/awas-zat-pestisida-ditemukan-di-anggur-impor-asal-tiongkok",
            "keywords": null,
            "creator": null,
            "video_url": null,
            "description": "Berdasarkan hasil uji coba, sebanyak 23 dari 24 sampel anggur ditemukan terdapat 50 jenis residu pestisida berbahaya.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": null,
            "source_id": "mediaindonesia",
            "source_priority": 846889,
            "source_name": "Mediaindonesia",
            "source_url": "https://mediaindonesia.com",
            "source_icon": "https://i.bytvi.com/domain_icons/mediaindonesia.png",
            "language": "english",
            "country": [
                "indonesia"
            ],
            "category": [
                "top"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "c02f611b4905eeca3a487a3e6918bf9f",
            "title": "Today’s daily horoscope for October 30, 2024",
            "link": "https://www.cleveland.com/advice/2024/10/todays-daily-horoscope-for-october-30-2024.html",
            "keywords": null,
            "creator": null,
            "video_url": null,
            "description": "Your free daily horoscope readings for October 30, 2024 from Nancy Black",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": "https://www.cleveland.com/resizer/v2/GRESXLUHM5BSHB7PECOYDP26NU.jpg?auth=2b47114d73bcab3e2810a8a250d1e37d4b98467fc24d7044a934f5e3ad3b9b8a&height=570&smart=true&width=601",
            "source_id": "cleveland",
            "source_priority": 1265,
            "source_name": "Cleveland",
            "source_url": "https://www.cleveland.com",
            "source_icon": "https://i.bytvi.com/domain_icons/cleveland.png",
            "language": "english",
            "country": [
                "united states of america"
            ],
            "category": [
                "top"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "1bc6bce5d54f11faf8105cffcebc3757",
            "title": "Samsung shares plummet 32%, losing $122b to chip rivals",
            "link": "https://www.techinasia.com/news/samsung-shares-plummet-32-losing-122b-chip-rivals",
            "keywords": [
                "ai memory",
                "news",
                "samsung electronics",
                "chipmakers",
                "south korea"
            ],
            "creator": [
                "Grace Priscilla Teo"
            ],
            "video_url": null,
            "description": "This loss is the most significant among global chipmakers, as investors become concerned amid advancements by competitors.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": "https://cdn.techinasia.com/wp-content/uploads/2023/07/1688695922_shutterstock_1686362245.jpg",
            "source_id": "techinasia",
            "source_priority": 171120,
            "source_name": "Tech In Asia",
            "source_url": "https://www.techinasia.com",
            "source_icon": "https://i.bytvi.com/domain_icons/techinasia.png",
            "language": "english",
            "country": [
                "singapore"
            ],
            "category": [
                "top"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "1b8d5fbdaa1a35eef822e00b44ef851c",
            "title": "Two Shell",
            "link": "https://pitchfork.com/reviews/albums/two-shell-two-shell",
            "keywords": [
                "reviews / albums"
            ],
            "creator": [
                "Will Pritchard"
            ],
            "video_url": null,
            "description": "On its debut album, a quasi-anonymous UK duo famous for cutting-edge bass music and rascally pranks seeks a balance of mystery, mischief, and unbridled dancefloor hedonism.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:02:00",
            "pubDateTZ": "UTC",
            "image_url": "https://media.pitchfork.com/photos/66f4243bf33f8fdc984eee85/master/pass/889030035271.png",
            "source_id": "pitchfork",
            "source_priority": 5995,
            "source_name": "Pitchfork",
            "source_url": "https://pitchfork.com",
            "source_icon": "https://i.bytvi.com/domain_icons/pitchfork.png",
            "language": "english",
            "country": [
                "world"
            ],
            "category": [
                "entertainment"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "ec0bb4a4709b1adf0fe7aac4f03af76e",
            "title": "When Aamir Khan And Mira Nair Battled Over Oscar Nominations",
            "link": "https://www.timesnownews.com/entertainment-news/bollywood/when-aamir-khan-and-mira-nair-battled-over-oscar-nominations-article-114758609",
            "keywords": null,
            "creator": [
                "Subhash K Jha"
            ],
            "video_url": null,
            "description": "Aamir Khan was surprised and somewhat irked by Mira Nair’s open declaration of her film Monsoon Wedding's superior chances at the Oscars due to her film’s US exhibitors' lobbying powers.",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:01:59",
            "pubDateTZ": "UTC",
            "image_url": "https://static.tnn.in/thumb/msid-114758609,imgsize-1650627,width-1280,height-720/114758609.jpg",
            "source_id": "timesnownews",
            "source_priority": 2243,
            "source_name": "Times Now News",
            "source_url": "https://www.timesnownews.com",
            "source_icon": "https://i.bytvi.com/domain_icons/timesnownews.png",
            "language": "english",
            "country": [
                "india"
            ],
            "category": [
                "entertainment"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            },
            {
            "article_id": "8323c14a0a56c3c2d5e21626a11665b4",
            "title": "'It will take time, but in the end I believe the IDF will do the job and bring him home'",
            "link": "https://www.haaretz.com/israel-news/2024-10-30/ty-article/.premium/it-will-take-time-but-in-the-end-i-believe-the-idf-will-do-the-job-and-bring-him-home/00000192-d9c0-d775-a59b-d9fe229b0000",
            "keywords": null,
            "creator": [
                "Noa Shpigel"
            ],
            "video_url": null,
            "description": "Kobi and Ayelet Samerano watched the video of their son Jonathan being kidnapped by an UNRWA employee and taken into Gaza in a United Nations vehicle October 7. Despite a committee declaring their son dead, they still believe there's a chance he is alive",
            "content": "ONLY AVAILABLE IN PAID PLANS",
            "pubDate": "2024-10-30 04:01:55",
            "pubDateTZ": "UTC",
            "image_url": "https://img.haarets.co.il/bs/00000192-dad9-d605-a3b2-dedd64130000/0b/17/ae6922de455988b5aea699e5dc3d/388548.jpg",
            "source_id": "haaretz_is",
            "source_priority": 9051,
            "source_name": "Haaretz",
            "source_url": "https://www.haaretz.com",
            "source_icon": "https://i.bytvi.com/domain_icons/haaretz_is.png",
            "language": "english",
            "country": [
                "israel"
            ],
            "category": [
                "top"
            ],
            "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
            "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
            "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
            "duplicate": false
            }
        ],
        "nextPage": "1730260915454799191"
    }
    `);

    data.results.forEach((article: any) => {
        const newsElement = document.createElement('news-item');
        newsElement.setAttribute('title', article.title);
        newsElement.setAttribute('date', article.pubDate);
        newsElement.setAttribute('source', article.source_name);
        newsElement.setAttribute('url', article.link);
        if (article.image_url) newsElement.setAttribute('desc', article.description);
        if (article.image_url) newsElement.setAttribute('img', article.image_url);

        if (container != null) {
            container.appendChild(newsElement);
        }
    });
}

displayNews();