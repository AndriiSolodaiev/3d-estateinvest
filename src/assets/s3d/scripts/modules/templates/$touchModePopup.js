import s3d2spriteIcon from "../../../../s3d2/scripts/templates/spriteIcon";

export default function $touchModePopup(i18n) {
  return `
    <div class="s3d-bottom-popup" data-s3d-touch-mode-popup>
      <div>${i18n.t('touchModePopup.title')}
      </div>
      <div class="s3d-bottom-popup__buttons">
        <button class="ButtonWithoutIcon s3d-bottom-popup__button" data-s3d-touch-mode="mouse">${i18n.t('touchModePopup.mouse')}</button>
        <button class="ButtonWithoutIcon s3d-bottom-popup__button" data-s3d-touch-mode="touch">${i18n.t('touchModePopup.touch')}</button>
        <svg class="s3d-bottom-popup__close" data-s3d-touch-mode-popup-close width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99991 6.58594L8.70701 7.29304L12.4999 11.0859L16.2928 7.29304L16.9999 6.58594L18.4141 8.00015L17.707 8.70726L13.9141 12.5002L17.707 16.293L18.4141 17.0002L16.9999 18.4144L16.2928 17.7073L12.4999 13.9144L8.70701 17.7073L7.99991 18.4144L6.58569 17.0002L7.2928 16.293L11.0857 12.5002L7.2928 8.70726L6.58569 8.00015L7.99991 6.58594Z"/>
        </svg>
      </div>
    </div>
  `;
}