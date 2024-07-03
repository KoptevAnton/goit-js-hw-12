const createMarkup = images => {
  return images
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <li class="card-container">
            <a href=${largeImageURL} class="card-container__link js-card-link">
              <img loading="lazy" class="card-container__photo" src="${webformatURL}" alt="${tags}" >
            </a>
            <div class="card-container__thumb">
              <div class="card-container__meta">
                <span class="card-container__title">Likes</span>
                <span class="card-container__info">${likes}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Views</span>
                <span class="card-container__info">${views}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Comments</span>
                <span class="card-container__info">${comments}</span>
              </div>
              <div class="card-container__meta">
                <span class="card-container__title">Downloads</span>
                <span class="card-container__info">${downloads}</span>
              </div>
            </div>
          </li>
        `;
      }
    )
    .join('');
};
export default createMarkup;
