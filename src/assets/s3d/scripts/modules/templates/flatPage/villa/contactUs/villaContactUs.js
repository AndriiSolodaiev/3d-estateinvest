import get from 'lodash/get';
import FormViewPage from '../../../../../../../s3d/scripts/modules/form/form/formViewApartmentPage';
import ButtonIconLeft from '../../../../../../../s3d2/scripts/templates/common/ButtonIconLeft';
import { socialMediaIcons } from '../../../../../../../s3d2/scripts/templates/common/icons/social-media-icons';

export default function renderVillaContact(i18n, managerInfo = {}, contactAdvantagesList = []) {
  const containerId = `villa-contact-form-${Math.random()
    .toFixed(5)
    .slice(2)}`;

  const $managerContacts = Object.entries(get(managerInfo, ['socials'], {}))
    .map(([key, link]) => {
      if (!link) return '';
      return `
    <a href="${link}" class="s3d-villa__contact__manager__socials-link" target="_blank">
      ${socialMediaIcons[key]}
    </a>
    `;
    })
    .join('');

  const lang = i18n.language;

  const $advantagesList = contactAdvantagesList
    .map((advantage, index) => {
      let title = get(advantage, ['title', lang], '');
      if (!title) title = advantage[`${lang}`];
      return `
      <div class="s3d-villa__contact__advantages-item">
        <div class="s3d-villa__contact__advantages-item-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5859 5.11834L12.2338 5.4733L6.90199 10.8478C6.80811 10.9424 6.68033 10.9957 6.54703 10.9957C6.41373 10.9957 6.28595 10.9424 6.19207 10.8478L3.76853 8.40485L3.41639 8.04989L4.12631 7.34561L4.47845 7.70057L6.54703 9.78572L11.5239 4.76902L11.876 4.41406L12.5859 5.11834Z" fill="#1A1E21"/>
          </svg>
        </div>
        <div class="s3d-villa__contact__advantages-item-title">
          ${title}
        </div>
      </div>
    `;
    })
    .join('');

  return `
    <div class="s3d-villa__contact">
      <div class="s3d-villa__contact__content">
        <div class="s3d-villa__contact__content__column">
          <div class="s3d-villa__contact__intro">
            <div class="s3d-villa__contact__intro__title">${i18n.t(
              'Flat.contactUs.introTitle',
            )}</div>
            <div class="s3d-villa__contact__intro__description">
              ${i18n.t('Flat.contactUs.introDescription')}
            </div>
            <div class="s3d-villa__contact__intro__img">
              <img src="/wp-content/themes/3d/assets/s3d/images/contacts-deco.png" alt="">
            </div>
          </div>
        </div>  
        <div class="s3d-villa__contact__content__column">
          <div class="s3d-villa__contact__form" id="${containerId}"> 
          </div>
        </div>
        <div class="s3d-villa__contact__content__column">
          <div class="s3d-villa__contact__manager">
            <div class="s3d-villa__contact__manager__name">
              ${get(managerInfo, ['name', lang], '')}
            </div>
            <div class="s3d-villa__contact__manager__title">
              ${get(managerInfo, ['position', lang], '')}
            </div>
            <div class="s3d-villa__contact__manager__img-wrap">
              <img src="${get(
                managerInfo,
                ['img'],
                '/wp-content/themes/3d/assets/s3d/images/manager.png',
              )}" alt="">
            </div>
            <a href="tel:${get(
              managerInfo,
              ['tel'],
              '',
            )}" class="s3d-villa__contact__manager__phone">
              ${get(managerInfo, ['tel'], '')}
            </a>
            <a href="tel:${get(
              managerInfo,
              ['tel2'],
              '',
            )}" class="s3d-villa__contact__manager__phone">
              ${get(managerInfo, ['tel2'], '')}
            </a>
            <div class="s3d-villa__contact__manager__socials">
              ${$managerContacts}
            </div>

          </div>
        </div>
        <!-- <div class="s3d-villa__contact__content__column">
          <div class="s3d-villa__contact__advantages">
            <div class="s3d-villa__contact__advantages__title">
              ${i18n.t('Flat.contactUs.ourAdvantages')}
            </div>
            <div class="s3d-villa__contact__advantages-list">
              ${$advantagesList}
            </div>
             <button class="ButtonIconLeft active ButtonIconLeft--secondary" data-open-form="">
                <svg class="ButtonIconLeft__icon--no-paints" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="var(--color-gray-200)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.88978 4.53638C6.88976 4.5364 6.88974 4.53642 6.88972 4.53644L5.0702 6.26193C5.0702 6.26193 5.07019 6.26194 5.07019 6.26194C4.63931 6.67057 4.45268 7.16852 4.51028 7.80011C4.57038 8.45913 4.90032 9.28114 5.56562 10.2726L5.56564 10.2727C6.64022 11.8743 8.25549 13.4085 8.96717 14.0835L8.96725 14.0835C9.5765 14.6615 11.3846 16.3734 13.2814 17.4795C14.4837 18.1804 15.4843 18.5 16.2706 18.5C16.9001 18.5 17.4162 18.296 17.8329 17.9008L19.4733 16.3452L19.8174 16.708L19.4733 16.3451C19.4939 16.3256 19.5 16.3067 19.5 16.2884C19.5 16.2689 19.4936 16.2508 19.4745 16.2327L19.4739 16.2321L16.1928 13.1207L16.5209 12.7747L16.1928 13.1207C16.1712 13.1002 16.1385 13.0847 16.0945 13.0847C16.0509 13.0847 16.0181 13.1 15.9959 13.1209C15.9958 13.1209 15.9958 13.121 15.9957 13.121L14.0498 14.9664L13.7586 15.2426L13.426 15.0181C12.4184 14.338 11.4421 13.5514 10.5239 12.6806L10.5239 12.6806C9.72806 11.9259 8.99577 11.1262 8.34712 10.303L8.06476 9.94469L8.39579 9.63076L10.3675 7.76095L10.3675 7.76094C10.3886 7.74097 10.3945 7.72085 10.3945 7.70432C10.3945 7.68778 10.3886 7.66749 10.3673 7.64734C10.3673 7.64733 10.3673 7.64733 10.3673 7.64732L7.08659 4.53627L7.08658 4.53626C7.06415 4.51498 7.02993 4.5 6.98835 4.5C6.9468 4.5 6.91243 4.51496 6.88978 4.53638ZM7.77469 3.81065C7.33781 3.39635 6.63887 3.39661 6.202 3.81047L6.20181 3.81065L4.38208 5.53633L4.38208 5.53633C3.71918 6.16499 3.43027 6.96823 3.51441 7.89093C3.59606 8.78622 4.02517 9.77162 4.73524 10.8298C5.87622 12.5304 7.56334 14.1303 8.27078 14.8012L8.27899 14.809L8.27907 14.8091L8.28183 14.8117C8.88857 15.3873 10.7708 17.1731 12.7776 18.3433L12.7777 18.3434C14.0532 19.0869 15.2336 19.5 16.2706 19.5C17.1404 19.5 17.9074 19.2083 18.521 18.6264L20.1614 17.0708C20.3763 16.867 20.5 16.5878 20.5 16.2884C20.5 15.9899 20.3775 15.7104 20.1616 15.5062C20.1615 15.5061 20.1614 15.506 20.1614 15.506L16.8809 12.3951C16.667 12.1922 16.3854 12.0847 16.0945 12.0847C15.8034 12.0847 15.5222 12.1924 15.3084 12.3947L15.308 12.395L13.6558 13.9619C12.8117 13.3675 11.9909 12.6937 11.212 11.955C10.565 11.3414 9.96336 10.6983 9.41876 10.0388L11.0556 8.48656C11.5075 8.058 11.5073 7.35064 11.0558 6.92207L11.0556 6.92188L7.7747 3.81065C7.77469 3.81065 7.77469 3.81065 7.77469 3.81065Z" stroke="none" fill="var(--color-gray-200)"/>
                </svg>
                <span>${i18n.t('Flat.contactUs.contactButton')}</span>
              </button>
          </div>
        </div> -->
      </div>
    </div>
  `;
}

export function initializeVillaContact(containerId, i18n) {
  const container = document.getElementById(containerId);
  if (container) {
    new FormViewPage({ target: container, i18n: i18n });
  } else {
    console.error('Contact form container not found:', containerId);
  }
}
