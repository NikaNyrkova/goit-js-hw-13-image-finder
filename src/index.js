
import './js/apiService';
import './styles.css';
import LoadMoreBtn from './js/btn-load-more';
import NewApiService from './js/apiService';
import cardTmpl from './templates/createCard.hbs';


const galleryContainer = document.querySelector('.js-gallery');
const searchForm = document.querySelector('.js-search-form');


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imagesApiService = new NewApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;

  if (imagesApiService.query === '') {
    return alert('Enter something valid');
  }

  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearGalleryContainer();
  fetchGallery();
}

function fetchGallery() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(images => {
    const y = loadMoreBtn.refs.button.offsetTop;
    appendGalleryMarkup(images);
    loadMoreBtn.enable();
    window.scrollTo({
      top: y - 60,
      left: 0,
      behavior: 'smooth',
    });
  });
}

function appendGalleryMarkup(images) {
  galleryContainer.insertAdjacentHTML('beforeend', cardTmpl(images.hits));
}

function clearGalleryContainer() {
  galleryContainer.innerHTML = '';
}