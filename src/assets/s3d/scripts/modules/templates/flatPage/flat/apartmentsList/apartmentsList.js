import Card from '../../../../templates/card/card';
import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function s3dApartmentsList(i18n, flat, favouritesIds$, showPrices, otherTypeFlats, card_bottom_labels = []) {
  console.log(otherTypeFlats);
  if (otherTypeFlats.length == 0) {
    return '';
  }
  const containerId = `flat-progress-swiper-${Date.now()}`;
  const apartmentsListHtml = `
    <div class="s3d-flat-new__apartments-list">

      <div class="s3d-villa__floor__title-wrap">
        <div class="s3d-villa__floor__title-wrap__line"></div>
        <span class="s3d-villa__floor__title"> ${i18n.t(`Flat.same_apartment_type`)}</span>
        <div class="s3d-villa__floor__title-wrap__line"></div>
      </div>

    <div id="${containerId}" class="s3d-flat-new__apartments-list-wrapper s3d-villa__construction-progress-screen__list swiper-container">
            <div class="s3d-flat-new__apartments-list-swiper s3d-villa__construction-progress-screen__list swiper">
                <div class="swiper-wrapper">
                    ${otherTypeFlats
                      .map(otherTypeFlat =>
                        Card(i18n, otherTypeFlat, favouritesIds$, showPrices, '', '', true, card_bottom_labels),
                      )
                      .join('')}
                </div>
            </div>
            <div class="s3d-flat-new__apartments-list-swiper-nav-wrap s3d-villa__construction-swiper-nav-wrap">
                    <div class="s3d-flat-new__apartments-list-swiper-button-prev s3d-villa__construction-swiper-button-prev swiper-button-prev">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.90658 12.5062L12.7036 17.3055L11.9963 18.0124L6.34625 12.3597L5.99294 12.0062L6.34625 11.6527L11.9963 6L12.7036 6.70694L7.90658 11.5062H18V12.5062H7.90658Z" fill="#1A1E21"/>
                        </svg>
                    </div>
                    <div class="s3d-flat-new__apartments-list-swiper-button-next s3d-villa__construction-swiper-button-next swiper-button-next">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0864 12.6763L11.2932 17.4696L12.0003 18.1767L17.647 12.5298L18.0005 12.1763L17.647 11.8227L12.0003 6.17578L11.2932 6.88288L16.0864 11.6763H6V12.6763H16.0864Z" fill="#1A1E21"/>
                        </svg>
                    </div>
              </div>
          </div>
        
    </div>
    `;

  function updateNavigationButtons(swiper) {
    const prevButton = document.querySelector(
      `#${containerId} .s3d-flat-new__apartments-list-swiper-button-prev`,
    );
    const nextButton = document.querySelector(
      `#${containerId} .s3d-flat-new__apartments-list-swiper-button-next`,
    );

    const totalSlides = swiper.slides.length;
    const slidesPerView = swiper.params.slidesPerView;

    if (totalSlides <= slidesPerView) {
      // Если слайдов меньше или равно, чем количество видимых слайдов, отключаем обе кнопки
      prevButton.classList.add('disabled');
      nextButton.classList.add('disabled');
    } else {
      // Если слайды есть для прокрутки, проверяем первый и последний слайд
      if (swiper.isBeginning) {
        prevButton.classList.add('disabled');
      } else {
        prevButton.classList.remove('disabled');
      }

      if (swiper.isEnd) {
        nextButton.classList.add('disabled');
      } else {
        nextButton.classList.remove('disabled');
      }
    }
  }

  setTimeout(() => {
    const swiperContainer = document.querySelector(`#${containerId} .swiper`);
    if (swiperContainer) {
      new Swiper(swiperContainer, {
        navigation: {
          nextEl: `#${containerId} .s3d-flat-new__apartments-list-swiper-button-next`,
          prevEl: `#${containerId} .s3d-flat-new__apartments-list-swiper-button-prev`,
        },
        slidesPerView: 5,
        spaceBetween: 40,
        speed: 1000,
        // loop: true,
        breakpoints: {
          320: {
            slidesPerView: swiperContainer.querySelector('.s3d-villa__construction-progress-card') ? 2 : 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1366: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1920: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        },
        on: {
          init: function() {
            // Вызовите логику для начальной установки кнопок
            updateNavigationButtons(this); // Передаем текущий swiper объект
          },
          slideChange: function() {
            // Эта функция будет вызываться при смене слайда
            updateNavigationButtons(this); // Передаем текущий swiper объект
          },
        },
      });
    } else {
      console.warn(`Swiper container not found for ID: ${containerId}`);
    }
  }, 0);

  return apartmentsListHtml;
}
