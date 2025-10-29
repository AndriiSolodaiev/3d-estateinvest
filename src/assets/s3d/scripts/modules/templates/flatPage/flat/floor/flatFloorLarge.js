export default function floorPlanLarge(flat, i18n) {
  console.log('flat floor plan large', flat);
  return `
    <div class="s3d-flat-new__floor-plan-large s3d-villa__gallery-wrap">
       <div class="s3d-villa__floor__title-wrap">
            <div class="s3d-villa__floor__title-wrap__line"></div>
            <span class="s3d-villa__floor__title">${i18n.t('Flat.floorPlanLarge')} </span>
            <div class="s3d-villa__floor__title-wrap__line"></div>
        </div>

        <div class="s3d-flat-new__floor-plan-large__image">
            <img src="/wp-content/themes/3d/assets/s3d/images/PLAN-GENERAL-BLOC-A.png" alt="Flat Floor Large">
            <svg   xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" version="1.1" data-apartment_type="svg1" width="1920" height="1850" viewBox="0 0 1920 1850" >
                <defs data-apartment_type="defs1" id="defs1"/>
                <g id="g51">
                    <path  d="m 391.56442,337.93712 h 79.16411 v 26.10429 h 53.34356 V 211.67178 H 493.71166 V 195.21472 H 391.56442 Z" ${
                      flat.floor_plan_gen == 'A1'
                        ? 'data-apartment_type="A1" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path1"/>
                    <path  d="M 391.56442,195.49847 V 32.630368 H 521.51841 V 157.19325 h -3.9724 v 32.34663 h -23.83435 v 5.67484 z" ${
                      flat.floor_plan_gen == 'A2'
                        ? 'data-apartment_type="A2" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path2"/>
                    <path  d="m 521.23466,32.630368 h 92.5 V 189.53988 h -95.9049 v -32.34663 h 3.97239 z"${
                      flat.floor_plan_gen == 'A3'
                        ? 'data-apartment_type="A3" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path3"/>
                    <path  d="M 613.73466,32.630368 H 748.22853 V 189.25614 H 614.01841 Z" ${
                      flat.floor_plan_gen == 'A4'
                        ? 'data-apartment_type="A4" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path4"/>
                    <path  d="M 748.22853,189.53988 H 877.89877 V 32.630368 H 748.22853 Z" ${
                      flat.floor_plan_gen == 'A5'
                        ? 'data-apartment_type="A5" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path5"/>
                    <path  d="M 881.30368,189.25614 V 32.630368 h 94.4862 V 189.25614 Z" ${
                      flat.floor_plan_gen == 'A6'
                        ? 'data-apartment_type="A6" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path6"/>
                    <path  d="m 975.78988,189.25614 h 61.28832 v -36.03528 h 149.5322 V 32.91411 H 975.78988 Z" ${
                      flat.floor_plan_gen == 'A7'
                        ? 'data-apartment_type="A7" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path7"/>
                    <path  d="m 1025.4448,189.25614 v 35.18404 h 34.6166 v 18.44326 h 126.549 v -89.94632 h -149.8159 v 36.31902 z" ${
                      flat.floor_plan_gen == 'A8'
                        ? 'data-apartment_type="A8" class="selected"'
                        : 'data-apartment_type="other"'
                    }" id="path8"/>
                    <path  d="m 1059.7776,242.59969 v 7.09356 h -34.6166 v 81.43405 h 161.7332 v -88.81135 z" ${
                      flat.floor_plan_gen == 'A9'
                        ? 'data-apartment_type="A9" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path9"/>
                    <path  d="m 1025.161,331.1273 v 107.82209 h 36.6028 v 27.23926 h 125.1304 V 331.1273 Z" ${
                      flat.floor_plan_gen == 'A10'
                        ? 'data-apartment_type="A10" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path10"/>
                    <path  d="m 1025.161,438.3819 v 75.19172 h -4.5398 v 77.46166 h 139.6012 v -73.77301 h 25.8205 v -51.35736 h -123.9954 v -26.95552 z" ${
                      flat.floor_plan_gen == 'A11'
                        ? 'data-apartment_type="A11" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path11"/>
                    <path  d="m 1025.161,475.26841 h -22.4156 v -8.51227 H 854.06442 v 50.22239 h 26.95552 v 74.34049 h 139.31746 v -78.02914 h 4.5399 z" ${
                      flat.floor_plan_gen == 'A12'
                        ? 'data-apartment_type="A12" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path12"/>
                    <path  d="M 1002.7454,467.03988 V 372.83742 H 881.30368 v 41.99387 h -27.23926 v 51.92485 z" ${
                      flat.floor_plan_gen == 'A13'
                        ? 'data-apartment_type="A13" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path13"/>
                    <path  d="M 877.61503,338.22086 V 212.23926 H 747.94479 V 364.6089 h 50.50613 v -26.67178 z" ${
                      flat.floor_plan_gen == 'A14'
                        ? 'data-apartment_type="A14" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path14"/>
                    <path  d="M 747.94479,212.23926 H 638.42025 v 32.63037 h 17.87576 v 118.88804 h 91.64878 z" ${
                      flat.floor_plan_gen == 'A15'
                        ? 'data-apartment_type="A15" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path15"/>
                    <path  d="M 225.57515,820.29908 H 383.33589 V 720.13804 h 34.04908 V 656.8635 H 225.29141 Z" ${
                      flat.floor_plan_gen == 'B1'
                        ? 'data-apartment_type="B1" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path16"/>
                    <path  d="M 197.20092,820.58282 H 0.28374233 V 657.99847 H 197.48466 Z" ${
                      flat.floor_plan_gen == 'B2'
                        ? 'data-apartment_type="B2" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path17"/>
                    <path  d="M 197.48466,657.99847 V 547.05522 H 0.28374233 v 110.6595 z" ${
                      flat.floor_plan_gen == 'B3'
                        ? 'data-apartment_type="B3" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path18"/>
                    <path  d="M 197.48466,546.77147 V 378.79601 H -0.28374233 v 168.25921 z" ${
                      flat.floor_plan_gen == 'B4'
                        ? 'data-apartment_type="B4" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path19"/>
                    <path  d="M 197.20092,378.79601 V 264.7316 H 0 v 114.06441 z" ${
                      flat.floor_plan_gen == 'B5'
                        ? 'data-apartment_type="B5" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path20"/>
                    <path  d="M 196.91718,264.44785 V 175.6365 H 151.51841 V 153.5046 H -0.28374233 v 110.94325 z" ${
                      flat.floor_plan_gen == 'B6'
                        ? 'data-apartment_type="B6" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path21"/>
                    <path  d="M 0,153.78834 V 0.28374233 H 157.76074 V 32.630368 h 55.61349 v 77.177912 h 28.09049 v 46.53374 h -44.54754 v 19.29448 h -45.11503 v -21.84816 z" ${
                      flat.floor_plan_gen == 'B7'
                        ? 'data-apartment_type="B7" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path22"/>
                    <path  d="m 213.09049,32.630368 h 4.53988 v -8.796012 h 40.00767 v 9.363497 H 383.90337 V 265.29908 H 225.57515 v -38.58896 h 35.75154 v -69.23313 h -19.86197 v -47.66871 h -27.80674 z" ${
                      flat.floor_plan_gen == 'B8'
                        ? 'data-apartment_type="B8" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path23"/>
                    <path  d="m 225.57515,373.68865 v 175.06902 h 191.80982 v -61.28834 h -33.4816 V 373.68865 Z" ${
                      flat.floor_plan_gen == 'B9'
                        ? 'data-apartment_type="B9" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path24"/>
                    <path  d="m 211.95552,1407.0782 v 125.4141 h 170.81289 v -158.6119 h -157.477 v 33.4816 z" ${
                      flat.floor_plan_gen == 'С1'
                        ? 'data-apartment_type="С1" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path25"/>
                    <path  d="m 211.95552,1532.2086 h -21.84816 v 9.3635 h -40.57515 v -9.0798 H 35.184049 v -91.9325 H 2.2699387 v -66.9632 H 197.20092 v 33.4816 h 14.7546 z" ${
                      flat.floor_plan_gen == 'С2'
                        ? 'data-apartment_type="С2" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path26"/>
                    <path  d="M 196.91718,1373.3129 V 1261.8021 H 1.9861963 v 111.7945 z" ${
                      flat.floor_plan_gen == 'С3'
                        ? 'data-apartment_type="С3" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path27"/>
                    <path  d="M 196.91718,1261.8021 V 1149.4402 H 2.553681 v 112.0782 z" ${
                      flat.floor_plan_gen == 'С4'
                        ? 'data-apartment_type="С4" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path28"/>
                    <path  d="M 196.91718,1149.7239 V 985.72086 H 1.9861963 v 62.70704 H 34.616564 v 100.7285 z" ${
                      flat.floor_plan_gen == 'С5'
                        ? 'data-apartment_type="С5" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path29"/>
                    <path  d="M 197.20092,985.72086 V 825.1227 H 1.702454 v 160.59816 z" ${
                      flat.floor_plan_gen == 'С6'
                        ? 'data-apartment_type="С6" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path30"/>
                    <path  d="m 225.29141,825.1227 h 157.19325 v 99.02607 h 33.19786 v 64.12577 H 225.8589 Z" ${
                      flat.floor_plan_gen == 'С7'
                        ? 'data-apartment_type="С7" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path31"/>
                    <path  d="M 225.29141,987.70706 V 1096.0966 H 415.96626 V 988.27454 Z" ${
                      flat.floor_plan_gen == 'С8'
                        ? 'data-apartment_type="С8" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path32"/>
                    <path  d="m 225.29141,1095.8129 v 85.4064 h 34.61657 v 26.9555 H 416.25 v -112.0782 z" ${
                      flat.floor_plan_gen == 'С9'
                        ? 'data-apartment_type="С9" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path33"/>
                    <path  d="m 742.55368,1287.0552 h -73.20552 v 161.1657 h 47.38497 v 45.115 h 92.5 v -82.569 h -11.06595 v -89.0951 h -55.04601 z" ${
                      flat.floor_plan_gen == 'D1'
                        ? 'data-apartment_type="D1" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path34"/>
                    <path  d="m 798.16718,1321.388 h 50.78988 v -34.9003 h 68.94938 v 158.612 h -17.87576 v 48.5199 h -90.79755 v -83.1365 h -11.06595 z" ${
                      flat.floor_plan_gen == 'D2'
                        ? 'data-apartment_type="D2" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path35"/>
                    <path  d="m 899.74693,1493.6196 h 40.29142 v 29.2255 h 32.63036 v -5.6749 h 52.77609 v -195.2147 h -40.29142 v -35.184 h -67.24694 v 158.3282 h -17.59202 z" ${
                      flat.floor_plan_gen == 'D3'
                        ? 'data-apartment_type="D3" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path36"/>
                    <path  d="m 1025.161,1516.8865 v 207.1319 H 855.76687 v -201.457 h 116.90184 v -5.6749 z" ${
                      flat.floor_plan_gen == 'D4'
                        ? 'data-apartment_type="D4" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path37"/>
                    <path  d="M 855.76687,1724.0184 H 671.90184 v -158.3282 h 23.26687 v -43.1288 h 160.59816 z" ${
                      flat.floor_plan_gen == 'D5'
                        ? 'data-apartment_type="D5" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path38"/>
                    <path  d="M 671.6181,1724.0184 H 556.41871 v -201.457 h 112.92945 v 42.5613 h 2.55368 z" ${
                      flat.floor_plan_gen == 'D6'
                        ? 'data-apartment_type="D6" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path39"/>
                    <path  d="M 555.85123,1723.7347 H 387.30828 v -209.6856 h 49.08743 v 15.6058 h 120.023 z" ${
                      flat.floor_plan_gen == 'D7'
                        ? 'data-apartment_type="D7" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path40"/>
                    <path  d="m 387.02454,1513.4816 v -191.5261 h 103.56595 v -35.184 h 70.08436 v 193.796 h -123.9954 v 33.4816 z" ${
                      flat.floor_plan_gen == 'D8'
                        ? 'data-apartment_type="D8" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path41"/>
                    <path  d="m 1680.6058,1293.2975 h -169.3941 v -248.5582 h 125.4141 v 166.8405 h 43.98 z" ${
                      flat.floor_plan_gen == 'E_F1'
                        ? 'data-apartment_type="E_F1" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path42"/>
                    <path  d="m 1636.342,1044.4555 h 116.6181 v 170.2454 h -72.3543 v -3.4049 h -43.98 z" ${
                      flat.floor_plan_gen == 'E_F2'
                        ? 'data-apartment_type="E_F2" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path43"/>
                    <path  d="m 1752.6764,1044.4555 h 126.2653 v 249.6933 h -168.5429 v -79.7316 h 42.5613 z" ${
                      flat.floor_plan_gen == 'E_F3'
                        ? 'data-apartment_type="E_F3" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path44"/>
                    <path  d="m 1710.115,1520.8589 h 209.6856 v 168.8267 h -40.5751 v 160.0307 H 1757.5 v -183.8651 h -47.6687 z" ${
                      flat.floor_plan_gen == 'E_F4'
                        ? 'data-apartment_type="E_F4" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path45"/>
                    <path  d="m 1756.9325,1850 h -124.8466 v -184.1488 h 48.2362 v -41.4264 h 29.5092 v 41.1427 h 47.385 z" ${
                      flat.floor_plan_gen == 'E_F5'
                        ? 'data-apartment_type="E_F5" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path46"/>
                    <path  d="m 1631.8021,1850 h -120.5904 v -159.4632 h -40.2915 v -169.6779 h 209.4019 v 144.9923 h -48.2362 z" ${
                      flat.floor_plan_gen == 'E_F6'
                        ? 'data-apartment_type="E_F6" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path47"/>
                    <path  d="m 1466.6641,1521.7101 v 167.9755 h -63.842 v 35.7515 h -67.2469 v -203.727 z" ${
                      flat.floor_plan_gen == 'E_F7'
                        ? 'data-apartment_type="E_F7" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path48"/>
                    <path  d="m 1335.2914,1521.7101 h -127.9678 v 45.1151 h -51.6411 v 158.6119 h 179.8927 z" ${
                      flat.floor_plan_gen == 'E_F8'
                        ? 'data-apartment_type="E_F8" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path49"/>
                    <path  d="m 1155.6825,1725.4371 h -63.5583 v -34.6165 h -60.1533 v -187.5537 h 47.3849 v -11.6335 h 75.4755 v 30.0767 h 5.3911 v 44.8313 h -4.8236 z" ${
                      flat.floor_plan_gen == 'E_F9'
                        ? 'data-apartment_type="E_F9" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path50"/>
                    <path  d="m 1154.5475,1491.6334 h 71.7869 v -49.3711 h -9.0798 v -154.0721 h -67.5307 v 34.3328 h -117.4693 v 180.7439 h 47.1012 v -11.9172 z" ${
                      flat.floor_plan_gen == 'E_F10'
                        ? 'data-apartment_type="E_F10" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path51"/>
                    <path  d="m 1342.6687,1322.8067 h 124.8466 v 168.2592 h -135.9125 v -5.1073 h -62.4234 v -197.7684 h 73.2056 z" ${
                      flat.floor_plan_gen == 'E_F11'
                        ? 'data-apartment_type="E_F11" class="selected"'
                        : 'data-apartment_type="other"'
                    } id="path52"/>
                </g>
                </svg>
        </div>
    </div>
  `;
}
