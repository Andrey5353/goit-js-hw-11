import { Report } from 'notiflix/build/notiflix-report-aio';
import { ApiService } from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
Report.init({ width: 'auto', titleMaxLength: 75 });

const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadBtnEl: document.querySelector('.load-more'),
};

refs.formEl.addEventListener('submit', onSubmit);
refs.loadBtnEl.addEventListener('click', onLoadMore);

const apiService = new ApiService();
let totalPages = 1;
let gallerySimpleLightbox = new SimpleLightbox('.photo-link');

function onSubmit(e) {
  e.preventDefault();
  loadMoreHidden();
  clearDisplay();
  const searchText = e.currentTarget.elements.searchQuery.value.trim();
  apiService.text = searchText;
  apiService.resetPage();

  if (!searchText) {
    Report.info('Enter a request, please', '');
    return;
  }
  apiService
    .getImages()
    .then(onFoundSuccess)
    .catch(error => {
      clearDisplay();
      Report.failure('Something is wrong. Please try again.', '');
    });
};

function onFoundSuccess(images) {
  const { totalHits, hits } = images;
  if (hits.length === 0) {
    Report.info(
      'Sorry, there are no images matching your search query. Please try again.',
      '',
      'I understand'
    );
    return;
  }
  totalPages = Math.ceil(totalHits / 40);
  loadMoreVisibility();
  insertImages(hits);
  gallerySimpleLightbox.refresh();
};

function insertImages(images) {
  const markup = renderImages(images);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);

  if (totalPages === apiService.page) {
    loadMoreHidden();
  }
};

function renderImages(images) {
  return images
    .map(
      image =>
        `<div class="photo-card">
    <a class="photo-link" href="${image.largeImageURL}"><img
    class="photo-image"
      src="${image.webformatURL}"
      alt="${image.tags}"
      loading="lazy"
      height=""
      width=""
    /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes <br />${image.likes}</b>
      </p>
      <p class="info-item">
        <b>Views <br />${image.views}</b>
      </p>
      <p class="info-item">
        <b>Comments<br />${image.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads<br />${image.downloads}</b>
      </p>
    </div>
  </div>`
    )
    .join('');
};

function clearDisplay() {
  refs.galleryEl.innerHTML = '';
};

async function onLoadMore() {
  await apiService.getImages().then(data => insertImages(data.hits));
  gallerySimpleLightbox.refresh();
   slowlyScroll();
};

function loadMoreHidden() {
  refs.loadBtnEl.classList.add('is-hidden');
};

function loadMoreVisibility() {
  refs.loadBtnEl.classList.remove('is-hidden');
};

function slowlyScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
