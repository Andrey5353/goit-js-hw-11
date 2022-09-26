import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30121970-37046de66120e4c834217209a';

export class ApiService {
  constructor() {
    this.searchText = '';
    this.page = 0;
  }

  async getImages() {
    this.page += 1;
    try {
      const { data } = await axios.get(
        `?key=${KEY}&q=${this.searchText}s&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );
      return data;
    } catch (error) {
      Report.failure(error);
    }
  }

  resetPage() {
    this.page = 0;
  }

  get text() {
    return this.searchText;
  }

  set text(newText) {
    this.searchText = newText;
  }
}
