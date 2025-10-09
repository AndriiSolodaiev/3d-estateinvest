import get from 'lodash/get';
import $favourite from '../../../../s3d/scripts/modules/templates/header/$favourite';
import getConfig from '../../getConfig';
import { isDesktop, isDeviceHybrid, isFullScreenAvailable } from '../../helpers/helpers_s3d2';
import ButtonIconLeft from '../common/ButtonIconLeft';
import ButtonIconRight from '../common/ButtonIconRight';

import IconButton from '../common/IconButton';
import navBar from './navBar';
function fullscreenMode(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
}
function exitFullscreenMode(element) {
  if (element.exitFullscreen) {
    element.exitFullscreen();
  } else if (element.mozCancelFullScreen) {
    element.mozCancelFullScreen();
  } else if (element.webkitExitFullscreen) {
    element.webkitExitFullscreen();
  } else if (element.msExitFullscreen) {
    element.msExitFullscreen();
  }
}

export default function header_2(i18n, { logo, menuSelector, config = {} }) {
  const $callback = document.documentElement.classList.contains('mobile')
    ? `
      <button class="IconButton" data-open-form> 
        <svg class="IconButton__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.88978 4.53637C6.88976 4.53639 6.88974 4.53641 6.88972 4.53642L5.0702 6.26191C5.0702 6.26192 5.07019 6.26192 5.07019 6.26192C4.63931 6.67055 4.45268 7.1685 4.51028 7.8001C4.57038 8.45911 4.90032 9.28112 5.56562 10.2726L5.56564 10.2727C6.64022 11.8743 8.25549 13.4085 8.96717 14.0834L8.96725 14.0835C9.5765 14.6615 11.3846 16.3734 13.2814 17.4795C14.4837 18.1804 15.4843 18.5 16.2706 18.5C16.9001 18.5 17.4162 18.296 17.8329 17.9008L19.4733 16.3451L19.8174 16.7079L19.4733 16.3451C19.4939 16.3256 19.5 16.3067 19.5 16.2884C19.5 16.2689 19.4936 16.2508 19.4745 16.2327L19.4739 16.2321L16.1928 13.1206L16.5209 12.7747L16.1928 13.1206C16.1712 13.1002 16.1385 13.0847 16.0945 13.0847C16.0509 13.0847 16.0181 13.0999 15.9959 13.1209C15.9958 13.1209 15.9958 13.121 15.9957 13.121L14.0498 14.9664L13.7586 15.2425L13.426 15.018C12.4184 14.3379 11.4421 13.5514 10.5239 12.6806L10.5239 12.6806C9.72806 11.9259 8.99577 11.1262 8.34712 10.303L8.06476 9.94467L8.39579 9.63075L10.3675 7.76093L10.3675 7.76093C10.3886 7.74095 10.3945 7.72083 10.3945 7.7043C10.3945 7.68776 10.3886 7.66748 10.3673 7.64732C10.3673 7.64732 10.3673 7.64731 10.3673 7.6473L7.08659 4.53625L7.08658 4.53624C7.06415 4.51496 7.02993 4.49998 6.98835 4.49998C6.9468 4.49998 6.91243 4.51495 6.88978 4.53637ZM7.77469 3.81063C7.33781 3.39633 6.63887 3.39659 6.202 3.81045L6.20181 3.81064L4.38208 5.53631L4.38208 5.53632C3.71918 6.16498 3.43027 6.96821 3.51441 7.89092C3.59606 8.7862 4.02517 9.7716 4.73524 10.8298C5.87622 12.5304 7.56334 14.1303 8.27078 14.8012L8.27899 14.809L8.27907 14.809L8.28183 14.8117C8.88857 15.3873 10.7708 17.173 12.7776 18.3433L12.7777 18.3434C14.0532 19.0869 15.2336 19.5 16.2706 19.5C17.1404 19.5 17.9074 19.2083 18.521 18.6264L20.1614 17.0707C20.3763 16.867 20.5 16.5878 20.5 16.2884C20.5 15.9899 20.3775 15.7103 20.1616 15.5062C20.1615 15.5061 20.1614 15.506 20.1614 15.506L16.8809 12.395C16.667 12.1922 16.3854 12.0847 16.0945 12.0847C15.8034 12.0847 15.5222 12.1924 15.3084 12.3947L15.308 12.395L13.6558 13.9619C12.8117 13.3675 11.9909 12.6937 11.212 11.955C10.565 11.3414 9.96336 10.6983 9.41876 10.0388L11.0556 8.48654C11.5075 8.05798 11.5073 7.35062 11.0558 6.92206L11.0556 6.92187L7.7747 3.81064C7.77469 3.81063 7.77469 3.81063 7.77469 3.81063Z" fill="var(--icon-gray-900)"/>
        </svg>
      </button>
    `
    : `
      <button class="ButtonIconLeft" data-open-form>
        <svg class="ButtonIconLeft__icon--no-paints" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6.88978 4.53637C6.88976 4.53639 6.88974 4.53641 6.88972 4.53642L5.0702 6.26191C5.0702 6.26192 5.07019 6.26192 5.07019 6.26192C4.63931 6.67055 4.45268 7.1685 4.51028 7.8001C4.57038 8.45911 4.90032 9.28112 5.56562 10.2726L5.56564 10.2727C6.64022 11.8743 8.25549 13.4085 8.96717 14.0834L8.96725 14.0835C9.5765 14.6615 11.3846 16.3734 13.2814 17.4795C14.4837 18.1804 15.4843 18.5 16.2706 18.5C16.9001 18.5 17.4162 18.296 17.8329 17.9008L19.4733 16.3451L19.8174 16.7079L19.4733 16.3451C19.4939 16.3256 19.5 16.3067 19.5 16.2884C19.5 16.2689 19.4936 16.2508 19.4745 16.2327L19.4739 16.2321L16.1928 13.1206L16.5209 12.7747L16.1928 13.1206C16.1712 13.1002 16.1385 13.0847 16.0945 13.0847C16.0509 13.0847 16.0181 13.0999 15.9959 13.1209C15.9958 13.1209 15.9958 13.121 15.9957 13.121L14.0498 14.9664L13.7586 15.2425L13.426 15.018C12.4184 14.3379 11.4421 13.5514 10.5239 12.6806L10.5239 12.6806C9.72806 11.9259 8.99577 11.1262 8.34712 10.303L8.06476 9.94467L8.39579 9.63075L10.3675 7.76093L10.3675 7.76093C10.3886 7.74095 10.3945 7.72083 10.3945 7.7043C10.3945 7.68776 10.3886 7.66748 10.3673 7.64732C10.3673 7.64732 10.3673 7.64731 10.3673 7.6473L7.08659 4.53625L7.08658 4.53624C7.06415 4.51496 7.02993 4.49998 6.98835 4.49998C6.9468 4.49998 6.91243 4.51495 6.88978 4.53637ZM7.77469 3.81063C7.33781 3.39633 6.63887 3.39659 6.202 3.81045L6.20181 3.81064L4.38208 5.53631L4.38208 5.53632C3.71918 6.16498 3.43027 6.96821 3.51441 7.89092C3.59606 8.7862 4.02517 9.7716 4.73524 10.8298C5.87622 12.5304 7.56334 14.1303 8.27078 14.8012L8.27899 14.809L8.27907 14.809L8.28183 14.8117C8.88857 15.3873 10.7708 17.173 12.7776 18.3433L12.7777 18.3434C14.0532 19.0869 15.2336 19.5 16.2706 19.5C17.1404 19.5 17.9074 19.2083 18.521 18.6264L20.1614 17.0707C20.3763 16.867 20.5 16.5878 20.5 16.2884C20.5 15.9899 20.3775 15.7103 20.1616 15.5062C20.1615 15.5061 20.1614 15.506 20.1614 15.506L16.8809 12.395C16.667 12.1922 16.3854 12.0847 16.0945 12.0847C15.8034 12.0847 15.5222 12.1924 15.3084 12.3947L15.308 12.395L13.6558 13.9619C12.8117 13.3675 11.9909 12.6937 11.212 11.955C10.565 11.3414 9.96336 10.6983 9.41876 10.0388L11.0556 8.48654C11.5075 8.05798 11.5073 7.35062 11.0558 6.92206L11.0556 6.92187L7.7747 3.81064C7.77469 3.81063 7.77469 3.81063 7.77469 3.81063Z" fill="var(--icon-gray-900)"/>
        </svg>
        <span>
          ${i18n.t('ctr.nav.callback')}
        </span>
      </button>
    `;

  const $languageList = config.languages.split('/');
  document.documentElement.style.setProperty('--lang-count', $languageList.length);
  const $languageHandler =
    $languageList && $languageList.length > 1
      ? `
  <div class="lang-wrap">
    <ul class="language-list">
      ${$languageList
        .map(lang => {
          const isActive = document.querySelector('html').getAttribute('lang') === lang;
          return `
            <li data-lang="${lang}" style="${isActive ? 'pointer-events: none; order: -1;' : ''}">
              <a href="${window.location.origin}/${lang}/3d/${window.location.search}${
            window.location.hash
          }">
                ${lang}
              </a>
            </li>`;
        })
        .join('')}
    </ul>
  </div>`
      : '';
      setTimeout(() => {
    document.querySelectorAll('.language-list li').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const lang = e.currentTarget.getAttribute('data-lang');
        window.location.href = `${window.location.origin}/${lang}/3d/${window.location.search}${window.location.hash}`;
      });
    });
  }, 100);
  const $phoneNumber = config.show_phoneNumber
    ? `<a class="ButtonWithoutIcon" href="tel:${config.show_phoneNumber.replace(/[\s-]/g, '')}"> ${
        config.show_phoneNumber
      }</a>`
    : '';
  document.body.addEventListener('click', e => {
    if (!e.target.closest('[data-fullscreen-mode]')) return;
    if (e.target.closest('[data-fullscreen-mode]') && !document.fullscreenElement) {
      fullscreenMode(document.documentElement);
    } else {
      exitFullscreenMode(document);
    }
    console.log('document.fullscreenElement', document.fullscreenElement);
  });
  document.body.addEventListener('click', e => {
    const langBtn = e.target.closest('[data-lang]');
    if (e.target.closest('[data-fullscreen-mode-off]') && document.fullscreenElement) {
      exitFullscreenMode(document);
    }
  });

  document.addEventListener('fullscreenchange', e => {
    document.querySelectorAll('[data-fullscreen-mode]').forEach(el => {
      el.classList.toggle('fullscreen', document.fullscreenElement);
    });
  });

  const currencyList = get(config, 'currency_list', []);
  const activeCurrency = new URLSearchParams(window.location.search).get('currency');

  return `
    <div class="header">
      <div class="header__left">
        ${navBar(i18n, { logo })}
      </div>
      <div class="header__right">
        ${$languageHandler}
        ${
          document.documentElement.classList.contains('desktop') && $phoneNumber ? $phoneNumber : ''
        }
        ${$callback}
        ${
          isDesktop() && isDeviceHybrid()
            ? `<button class="IconButton " type="button" data-s3d-touch-mode-popup-open>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5"/>
            <path fill="none" d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="#1C274C" stroke-width="1.5"/>
          </svg>
        </button>`
            : ''
        }
        ${IconButton('', 'data-s3d-share', 'Copy')}
        ${isFullScreenAvailable() ? IconButton('', 'data-fullscreen-mode', 'Full screen') : ''}
        ${
          isFullScreenAvailable()
            ? IconButton('', 'data-fullscreen-mode-off', 'Cancel full screen')
            : ''
        }
        ${$favourite()}
        ${
          currencyList.length > 1 && config.show_prices
            ? `
          <div class="s3d-ctr__theme s3d-ctr__theme--currencies s3d-ctr__menu-3d-btn-style s3d-display">
            <input ${
              currencyList[1].value == activeCurrency ? 'checked' : ''
            } type="checkbox" class="s3d-ctr__switch" id="currency-switch">
            <label for="currency-switch">
              ${currencyList
                .map(el => {
                  return `
                <div data-currency-value="${el.value}">${el.value}</div>`;
                })
                .join('')}
            </label>
          </div>  
        `
            : ''
        }
        <!--${IconButton('js-s3d__favourite-open', 'data-compare-go-to-page', 'Compare')}-->
        ${
          menuSelector ? ButtonIconRight('', `${menuSelector}`, i18n.t('ctr.nav.menu'), 'Menu') : ''
        }
      </div>
    </div>
  `;
}
