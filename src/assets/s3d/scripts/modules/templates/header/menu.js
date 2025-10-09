import smarto from "../$smarto-logo";

function menu(i18n) {
  return `
    <div class="menu-wrap" data-menu data-disable-page-scroll>
      <div class="menu-header-close" data-menu-close>
        <div class="menu-header-close-elem-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00008 7.29286L8.35363 7.64642L12.5001 11.7929L16.6465 7.64642L17.0001 7.29286L17.7072 7.99997L17.3536 8.35352L13.2072 12.5L17.3536 16.6464L17.7072 17L17.0001 17.7071L16.6465 17.3535L12.5001 13.2071L8.35363 17.3535L8.00008 17.7071L7.29297 17L7.64652 16.6464L11.793 12.5L7.64652 8.35352L7.29297 7.99997L8.00008 7.29286Z" fill="var(--icon-gray-900)"/>
          </svg>

        </div>
      </div>
      <div class="menu-nav-wrap">
        <div class="menu-nav">
          <ul>
            <li class="menu-nav-link">
              <a href="#" data-title="${i18n.t('menu.nav.1.nav-subtitle.1')}">
                <span>${i18n.t('menu.nav.1.nav-subtitle.1')}</span>
              </a>
            </li>
            <li class="menu-nav-link">
              <a href="#" data-title="${i18n.t('menu.nav.1.nav-subtitle.2')}">
                <span>${i18n.t('menu.nav.1.nav-subtitle.2')}</span>
              </a>
            </li>
            <li class="menu-nav-link">
              <a href="#" data-title="${i18n.t('menu.nav.1.nav-subtitle.3')}">
                <span>${i18n.t('menu.nav.1.nav-subtitle.3')}</span>
              </a>
            </li>
            <li class="menu-nav-link">
              <a href="#" data-title="${i18n.t('menu.nav.1.nav-subtitle.4')}">
                <span>${i18n.t('menu.nav.1.nav-subtitle.4')}</span>
              </a>
            </li>
            <li class="menu-nav-link">${i18n.t('menu.nav.2.nav-title')}
              <ul class="menu-nav-link2-wrap">
                <li class="menu-nav-link2">
                  <a href="#" data-title="${i18n.t('menu.nav.2.nav-subtitle.1')}">
                    <span>${i18n.t('menu.nav.2.nav-subtitle.1')}</span>
                  </a>
                </li>
                <li class="menu-nav-link2">
                  <a href="#" data-title="${i18n.t('menu.nav.2.nav-subtitle.2')}">
                    <span>${i18n.t('menu.nav.2.nav-subtitle.2')}</span>
                  </a>
                </li>
                <li class="menu-nav-link2">
                  <a href="#" data-title="${i18n.t('menu.nav.2.nav-subtitle.3')}">
                    <span>${i18n.t('menu.nav.2.nav-subtitle.3')}</span>
                  </a>
                </li>
                <li class="menu-nav-link2">
                  <a href="#" data-title="${i18n.t('menu.nav.2.nav-subtitle.4')}">
                    <span>${i18n.t('menu.nav.2.nav-subtitle.4')}</span>
                  </a>
                </li>
                <li class="menu-nav-link2">
                  <a href="#" data-title="${i18n.t('menu.nav.2.nav-subtitle.6')}">
                    <span>${i18n.t('menu.nav.2.nav-subtitle.6')}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      ${smarto()}
    </div>
  `;
}

export default menu;
