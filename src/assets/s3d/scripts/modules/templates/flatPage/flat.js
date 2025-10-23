import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import { format, parseISO } from 'date-fns';

import createFlatInfo from './$flatInfo';
import $addToFavourite from '../$addToFavourite';
import $goToFloor from './$goToFloor';
import ButtonWithoutIcon from '../../../../../s3d2/scripts/templates/common/ButtonWithoutIcon';
import s3d2spriteIcon from '../../../../../s3d2/scripts/templates/spriteIcon';
import IconButton from '../../../../../s3d2/scripts/templates/common/IconButton';
import { $highlightSvgElements } from '../controller/$highlightSvgElements';
import { numberWithCommas, showOn } from '../../../../../s3d2/scripts/helpers/helpers_s3d2';
import FlatDocCard from '../../../../../s3d2/scripts/templates/flat/FlatDocCard';
import FlatFinancialTermsCard from '../../../../../s3d2/scripts/templates/flat/FlatFinancialTermsCard';
import ButtonIconLeft from '../../../../../s3d2/scripts/templates/common/ButtonIconLeft';
import { TOOLTIP_ATTRIBUTE } from '../../../../../s3d2/scripts/constants';
import $s3dVillaNavigation from './villa/villaNavigation';
import s3dFlatFloor from './flat/floor/flatFloor';
import renderVillaContact, { initializeVillaContact } from './villa/contactUs/villaContactUs';
import VillaGalleryScreen from './villa/gallery/villaGalleryMarkup';
import VirtualTour from './villa/virtualTour/virtualTour';
import renderFaqList from './villa/faq/villaFaqList';
import VillaFinancialTermsScreen from './villa/terms/villaTermsScreen';
import FlatDocumentationScreen from './villa/documents/documents';
import FlatConstructionProgressScreen from './villa/constructionProgress/villaConstructionScreen';
import VillaContactLocation from './villa/contactUs/villaContactUsLocation';
import createFlybyVillaPage from './villa/flybyIndividual/villaFlybyView';
import generateButtonGroup from './villa/villaSpecifiedDropDown';
import s3dFloorPlan from '../flatPage/flat/floorPlan/floorPlan';
import s3dApartmentsList from '../flatPage/flat/apartmentsList/apartmentsList';
import $villaUpArrow from './villa/$villaUpArrow';
import initAnimations from './villa/animation/heroPinAnimation';
/**
 * Represents a Flat object.
 *
 * @constructor
 * @param {Object} i18n - The internationalization object.
 * @param {Object} flat - The flat object.
 * @param {Array} favouritesIds$ - The array of favourite IDs.
 * @param {Array} [otherTypeFlats=[]] - The array of other type flats.
 * @param {Array} [labelsToShowInInfoBlock=[]] - The array of labels to show in the info block.
 * @param {Object} [unit_statuses={}] - The unit statuses object.
 * @param {Array} [floorList=[]] - The array of floor list.
 * @param {Array} [projectDocs=[]] - The array of project documents.
 * @param {Array} [constructionProgressList=[]] - The array of constructionProgressList data.
 * @param {Array} [financialTermsData=[]] - The array of financial terms data.
 * @param {Array} [constructionProgressDataList=[]] - The construction progress array.

 */
function Flat(
  i18n,
  flat,
  favouritesIds$,
  otherTypeFlats = [],
  labelsToShowInInfoBlock = [],
  unit_statuses = {},
  floorList = [],
  projectDocs = [],
  exteriorData = [],
  financialTermsData = [],
  constructionProgress = null,
  constructionProgressDataList = [],
  showPrices,
  getFlat,
  socialMediaLinks = {},
  managerInfo = {},
  contacts = {},
  globalPhoneNumber = '',
  contactAdvantagesList = [],
  project_google_map_location,
  faq_questions = [],
  card_bottom_labels = [],
) {
  const contactFormHtml2 = renderVillaContact(i18n, managerInfo, contactAdvantagesList);

  const contactFormContainerId2 = extractContainerId(contactFormHtml2);

  const isChecked = favouritesIds$.value.includes(flat.id);

  const specifiedFlybyByGroup = groupBy(flat.specifiedFlybys, e => {
    return `flyby_${e.flyby}_${e.side}`;
  });

  const svgFlybyLink = flat.flatSvgLink ? flat.flatSvgLink : false;

  const $specifiedFlybysByGroup = Object.entries(specifiedFlybyByGroup)
    .map(([groupName, flybyList]) => generateButtonGroup(groupName, flybyList, flat, i18n))
    .join('');

  const flybyLists = Object.entries(specifiedFlybyByGroup).map(
    ([groupName, flybyList]) => flybyList,
  );

  const flatHtml = `
  <div class="s3d-flat-new s3d-villa">
    ${$s3dVillaNavigation({
      i18n,
      flat,
      isChecked,
      $specifiedFlybysByGroup,
    })}
    <div class="s3d-villa__container">
      ${s3dFlatFloor(i18n, flat, isChecked, flybyLists, labelsToShowInInfoBlock)}
      ${s3dFloorPlan(i18n, flat, floorList)}
      
      ${flat['gallery'] ? VillaGalleryScreen(flat['gallery'], i18n) : ''}
      ${
        flat['view_from_window_link']
          ? `
        <div class="s3d-villa__virtual-tour-wrap">
            <div class="s3d-villa__floor__title-wrap">
                <div class="s3d-villa__floor__title-wrap__line"></div>
                <span class="s3d-villa__floor__title"> ${i18n.t('Flat.from_window_view')}</span>
                <div class="s3d-villa__floor__title-wrap__line"></div>
            </div>
            <div class="s3d-villa__virtual-tour-iframe-wrap">
                <iframe src="${flat['view_from_window_link']}" loading="lazy"></iframe>
            </div>
        </div>
      `
          : ''
      }
      ${flat['3d_tour'] ? VirtualTour(i18n, flat) : ''}
     
      <div class="s3d-villa__video-screen">
        <div class="s3d-villa__floor__title-wrap">
          <div class="s3d-villa__floor__title-wrap__line"></div>
          <span class="s3d-villa__floor__title">${i18n.t('Flat.video')}</span>
          <div class="s3d-villa__floor__title-wrap__line"></div>
        </div>
        <div class="s3d-villa__video-screen-iframe-wrap">
          <video controls loading="lazy" playsinline>
            <source src="/wp-content/themes/3d/assets/s3d/images/estateinvest-video-mobile.mp4" media="(max-width: 648px)" type="video/mp4">
            <source src="/wp-content/themes/3d/assets/s3d/images/estateinvest-video-desktop.mp4" media="(min-width: 649px)" type="video/mp4">
            Ваш браузер не підтримує відео.
          </video>
          </video>
        </div>
      </div>
     
      ${s3dApartmentsList(
        i18n,
        flat,
        favouritesIds$,
        showPrices,
        otherTypeFlats,
        card_bottom_labels,
      )}
      ${VillaFinancialTermsScreen(i18n, financialTermsData)}
      ${FlatDocumentationScreen(i18n, projectDocs)}
      ${FlatConstructionProgressScreen(i18n, constructionProgressDataList)}
      <div class="s3d-villa__contact-screen">
        ${VillaContactLocation(
          i18n,
          socialMediaLinks,
          contacts,
          globalPhoneNumber,
          project_google_map_location,
        )}
       
        ${contactFormHtml2}
      </div>
      

      <div last-screen-animation>
        
        <div class="s3d-flat-new__bottom" ></div>
      </div>
    </div>
    ${svgFlybyLink ? createFlybyVillaPage(flat) : ''}
    ${$villaUpArrow()}

  </div>
`;

  if (svgFlybyLink) {
    renderFlatFlyby(svgFlybyLink, flat.id, flat, getFlat);
  }

  initializeContactForms(contactFormContainerId2, i18n);

  return flatHtml;
}
/**
 * Extracts the container ID from the given HTML string (assumes the first ID found is the target).
 *
 * @param {string} html - The HTML string to extract the ID from.
 * @returns {string|null} - The extracted ID or null if no ID is found.
 */
function extractContainerId(html) {
  const match = html.match(/id="([^"]+)"/);
  return match ? match[1] : null;
}

export function FlatExplicationPropertyRow(title, value, i18n) {
  return `
    <div class="s3d-flat__explication-screen-info-row text-style-3-d-fonts-1920-body-regular text-gray-800">
      <div class="s3d-flat__explication-screen-info-row-title">${title}</div>
      <div class="s3d-flat__explication-screen-info-row-value">
        ${value} ${i18n.t('area_unit')}
      </div>
    </div>
  `;
}

/**
 * Initializes the contact forms by their container IDs.
 *
 * @param {string|null} id1 - The ID of the first contact form container.
 * @param {string|null} id2 - The ID of the second contact form container.
 */

function initializeContactForms(id2, i18n) {
  setTimeout(() => {
    if (id2) {
      initializeVillaContact(id2, i18n);
    }
  }, 0);
}

function renderFlatFlyby(link, flatId, flat, getFlat) {
  axios.get(link).then(el => {
    const container = document.querySelector('[data-flat-flyby-svg-container]');
    const parser = new DOMParser();
    const doc = parser.parseFromString(el.data, 'text/html');
    const svg = doc.querySelector('svg');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg
      .querySelectorAll('[data-type="infrastructure"], [data-type="flyby"]')
      .forEach(el => el.remove());
    svg.querySelectorAll(`polygon`).forEach(el => el.setAttribute('fill', 'none'));
    svg.querySelectorAll(`polygon[data-type="flat"]`).forEach(el => {
      el.classList.add('polygon__filter-select');
      el.dataset['_type'] = getFlat(el.dataset.id)['build_name'];
    });
    svg.querySelectorAll(`polygon[data-_type="${flat.build_name}"]`).forEach(el => {
      el.classList.add('active');
      const sale = getFlat(el.dataset.id).sale;
      el.dataset['sale'] = sale;
      // el.classList.remove('polygon__filter-select');
    });

    svg.querySelectorAll(`[data-id="${flatId}"]`).forEach(el => el.classList.add('active-flat'));
    container.insertAdjacentElement('beforeend', svg);
    container.scrollTo({
      left: container.scrollWidth / 2 - window.innerWidth / 2,
      behavior: 'smooth',
    });
  });
}

export default Flat;
