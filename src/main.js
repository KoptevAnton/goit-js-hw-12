import './css/styles.scss';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import fetchPhotos from './js/pixabay-api';
import createMarkup from './js/render-functions';
import * as refs from './js/refs';

const { galleryEl, searchFormEl, loaderEl, loadMoreEl } = refs;
const params = {
  q: '',
  page: 1,
  pageSize: 15,
  maxPage: 0,
};

let lightbox = null;

searchFormEl.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  galleryEl.innerHTML = '';
  loadMoreEl.classList.add('is-hidden');
  params.q = event.target.elements.searchKeyword.value.trim();
  params.page = 1;

  if (!params.q) {
    return iziToast.error({
      message: 'The field in which you enter the text cannot be empty',
      position: 'center',
      backgroundColor: 'rgba(239, 64, 64, 1)',
      messageColor: 'rgba(250, 250, 251, 1)',
      messageSize: '16',
      messageLineHeight: '24',
    });
  }
  loaderEl.classList.remove('is-hidden');

  try {
    const imagesData = await fetchPhotos(params);
    params.maxPage = Math.ceil(imagesData.totalHits / params.pageSize);
    if (imagesData.hits.length === 0) {
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'center',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        messageColor: 'rgba(250, 250, 251, 1)',
        messageSize: '16',
        messageLineHeight: '24',
      });
    }

    if (!Array.isArray(imagesData.hits)) {
      throw new Error('Unexpected data format from API');
    }

    galleryEl.insertAdjacentHTML('beforeend', createMarkup(imagesData.hits));

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }

    if (params.page < params.maxPage) {
      loadMoreEl.classList.remove('is-hidden');
      loadMoreEl.addEventListener('click', onLoadMore);
    }
  } catch (err) {
    console.log(err);
  } finally {
    loaderEl.classList.add('is-hidden');
    event.target.reset();
  }
}

async function onLoadMore() {
  params.page += 1;
  try {
    const imagesData = await fetchPhotos(params);

    galleryEl.insertAdjacentHTML('beforeend', createMarkup(imagesData.hits));
    const cardHeight = galleryEl
      .querySelector('.card-container')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth',
    });

    lightbox.refresh();

    if (params.page >= params.maxPage) {
      loadMoreEl.classList.add('is-hidden');
      loadMoreEl.removeEventListener('click', onLoadMore);
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'center',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        messageColor: 'rgba(250, 250, 251, 1)',
        messageSize: '16',
        messageLineHeight: '24',
      });
    }
  } catch (err) {
    throw new Error('Sorry, something went wrong with the API request.');
  }
}