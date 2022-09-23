import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from './news-service';

const newsApiService = new NewsApiService();

const refs = {
    searchForm: document.querySelector('#search-form'),
    searchBtn: document.querySelector('[type=submit]'),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';

function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles();
};

function onLoadMore() {
    newsApiService.fetchArticles();
}