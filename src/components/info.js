export const createInfoTemplate = (startPlace, endPlace) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${startPlace} &mdash; ... &mdash; ${endPlace}</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>
</section>`;
};
