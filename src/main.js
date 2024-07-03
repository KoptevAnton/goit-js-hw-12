import './css/styles.scss';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import fetchPhotos from './js/pixabay-api';
import createMarkup from './js/render-functions';

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');

function onSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchKeyword.value.trim();
  galleryEl.innerHTML = '';
  if (searchQuery === '') {
    return iziToast.error({
      message: 'The field in which you enter the text cannot be empty',
      position: 'center',
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: 'rgba(250, 250, 251, 1)',
      iconUrl: './img/octagon.svg',
      messageSize: '16',
      messageLineHeight: '24',
    });
  }
  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');
  fetchPhotos(searchQuery)
    .then(imagesData => {
      if (imagesData.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'center',
          backgroundColor: 'rgba(239, 64, 64, 1)',
          messageColor: 'rgba(250, 250, 251, 1)',
          iconUrl: './img/octagon.svg',
          messageSize: '16',
          messageLineHeight: '24',
        });
      }

      galleryEl.innerHTML = createMarkup(imagesData.hits);
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh();
    })
    .catch(error => console.log(error))
    .finally(() => {
      event.target.reset();
      loaderEl.classList.add('is-hidden');
    });
}

searchFormEl.addEventListener('submit', onSearch);
