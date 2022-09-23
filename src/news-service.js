const KEY = '30121970-37046de66120e4c834217209a';
const perPage = 40;
const BASE_URL = `https://pixabay.com/api/?key=${KEY}&per_page=${perPage}&q=`;

export default class NewsApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    
    fetchArticles() {
        fetch(`${BASE_URL}${this.searchQuery}&page=${this.page}`)
            .then(r => r.json())
            .then(data => {
                this.incrementPage();
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}