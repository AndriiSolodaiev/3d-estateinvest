import { gsap } from 'gsap';
import Card from '../templates/card/card';
import xor from 'lodash/xor';
import EventEmitter from '../eventEmitter/EventEmitter';
import dispatchTrigger from '../helpers/triggers';
import CompareItem from '../templates/CompareItem/CompareItem';
import { EmptyFavourites } from '../templates/favourites';
import { numberWithCommas } from '../../../../s3d2/scripts/helpers/helpers_s3d2';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

class FavouritesModel extends EventEmitter {
  constructor(config, i18n) {
    super();
    this.getFlat = config.getFlat;
    this.setFlat = config.setFlat;
    this.updateFsm = config.updateFsm;
    this.history = config.history;
    this.fsm = config.fsm;
    this.animationSpeed = 1400;
    this.i18n = i18n;
    this.favouritesIds$ = config.favouritesIds$;
    this.updateFavouritesBlock = this.updateFavouritesBlock.bind(this);
    this.isShowOnlyPropertiesDifference = new BehaviorSubject(false);

    // Кешування для DOM і обчислень
    this.cache = {
      dom: new Map(),
      flats: new Map(),
      properties: null,
    };

    this.updateFavouritesBlockThrottled = this.throttle(this.updateFavouritesBlock.bind(this), 50);

    this.propertiesToShow = [
      {
        keyPath: '_price',
        title: this.i18n.t('Flat.information.price'),
        valueFormat: value => `${this.i18n.t('currency_label')} ${numberWithCommas(value)}`,
      },
      {
        keyPath: 'price_m2',
        title: this.i18n.t('Flat.information.price_m2'),
        valueFormat: value => `${this.i18n.t('currency_label')} ${numberWithCommas(value)}`,
      },
      {
        keyPath: 'sale',
        title: this.i18n.t('Flat.information.sale'),
        valueFormat: value => `${value}`,
      },
      {
        keyPath: 'area',
        title: this.i18n.t('Flat.information.area'),
        valueFormat: value => `${value} ${this.i18n.t('area_unit')}`,
      },
      {
        keyPath: 'rooms',
        title: this.i18n.t('Flat.information.rooms'),
      },
      {
        keyPath: 'sec_name',
        title: this.i18n.t('Flat.information.build'),
      },
      {
        keyPath: 'floor',
        title: this.i18n.t('Flat.information.floor'),
        valueFormat: value => `${value == 0 ? this.i18n.t('Flat.information.parter') : value}`,
      },
      {
        keyPath: 'number',
        title: this.i18n.t('Flat.information.number'),
      },
    ];

    this.show_prices = config.show_prices;

    if (!this.show_prices) {
      this.propertiesToShow = this.propertiesToShow.filter(
        property => property.keyPath !== '_price' && property.keyPath !== 'price_m2',
      );
    }

    this.initEventListeners();
    this.initSubscriptions();
  }

  //  Оптимізований кеш для DOM
  getDomElement(selector) {
    if (!this.cache.dom.has(selector)) {
      this.cache.dom.set(selector, document.querySelector(selector));
    }
    return this.cache.dom.get(selector);
  }

  //  Кеш для квартир з TTL
  getCachedFlat(id) {
    const now = Date.now();
    const cached = this.cache.flats.get(id);

    if (cached && now - cached.timestamp < 5000) {
      return cached.data;
    }

    const flat = this.getFlat(id);
    this.cache.flats.set(id, { data: flat, timestamp: now });
    return flat;
  }

  clearCache() {
    this.cache.flats.clear();
    this.cache.dom.clear();
  }

  initEventListeners() {
    document.body.addEventListener('click', this.handleBodyClick.bind(this), { passive: true });
    document.body.addEventListener('change', this.handleBodyChange.bind(this), { passive: true });
  }

  handleBodyClick(event) {
    const target = event.target.closest('[data-favourites-empty-button]');
    if (!target) return;
    this.updateFsm({ type: 'plannings' });
  }

  handleBodyChange(event) {
    if (!event.target.matches('[data-compare-show-differences]')) return;
    this.isShowOnlyPropertiesDifference.next(event.target.checked);
  }

  // debaunce
  initSubscriptions() {
    this.favouritesIds$.pipe(debounceTime(30), distinctUntilChanged()).subscribe(favourites => {
      Promise.resolve().then(() => {
        this.emit('updateFavouritesTitle', favourites.length);
        this.updateCompareState(favourites);
      });
    });

    this.isShowOnlyPropertiesDifference
      .pipe(debounceTime(50), distinctUntilChanged())
      .subscribe(isShowOnlyPropertiesDifference => {
        this.updatePropertiesVisibility(isShowOnlyPropertiesDifference);
      });
  }

  updateCompareState(favourites) {
    const compareElement = this.getDomElement('[data-compare-show-differences]');
    const compareInput = this.getDomElement('input[data-compare-show-differences]');

    if (favourites.length <= 1) {
      this.isShowOnlyPropertiesDifference.next(false);
      compareElement?.setAttribute('disabled', 'disabled');
      if (compareInput) compareInput.checked = false;
    } else {
      compareElement?.removeAttribute('disabled');
    }
  }

  //  Кешування результатів порівняння
  updatePropertiesVisibility(isShowOnlyPropertiesDifference) {
    const flats = this.favouritesIds$.value.map(id => this.getCachedFlat(id));
    if (!this.cache.properties || this.cache.propertiesFlatsLength !== flats.length) {
      const comparisonMap = new Map();

      this.propertiesToShow.forEach(property => {
        const values = flats.map(flat => flat[property.keyPath]);
        const isEqual = values.every(v => v === values[0]);
        comparisonMap.set(property.keyPath, isEqual);
      });

      this.cache.properties = comparisonMap;
      this.cache.propertiesFlatsLength = flats.length;
    }

    this.propertiesToShow = this.propertiesToShow.map(property => ({
      ...property,
      hide: isShowOnlyPropertiesDifference && this.cache.properties.get(property.keyPath),
    }));

    this.updateFavouritesBlockThrottled();
  }

  init(initFavourites = []) {
    //  Batch операції з мінімальною затримкою
    this.favouritesIds$.pipe(debounceTime(20)).subscribe(favourites => {
      this.scheduleBatchEmit([
        ['updateCountFavourites', favourites.length],
        ['updateFavouritesInput', favourites],
      ]);
      this.updateHistory({ favourites });
    });

    const favouritesStore = this.getFavourites();
    const favouritesIds = favouritesStore.length > 0 ? favouritesStore : initFavourites;
    this.favouritesIds$.next(favouritesIds);
  }
  //  Оптимізований scheduler для batch операцій
  scheduleBatchEmit(operations) {
    if (this._batchTimeout) {
      clearTimeout(this._batchTimeout);
    }

    this._batchTimeout = setTimeout(() => {
      operations.forEach(([event, data]) => {
        this.emit(event, data);
      });
      this._batchTimeout = null;
    }, 0);
  }

  update() {
    this.updateFavouritesBlockThrottled();
    this.emit('updateFvCount', this.favouritesIds$.value.length);
  }

  selectElementHandler(id) {
    this.updateFsm({ type: 'flat', id });
  }

  updateHistory(name) {
    return this.history?.update?.(name) ?? false;
  }

  removeElement(id) {
    this.emit('removeElemInPageHtml', id);
  }

  getFavourites() {
    if (!this.isSessionStorageSupported()) {
      return [];
    }

    try {
      const storage = sessionStorage.getItem('favourites');
      if (!storage) return [];

      const parsed = JSON.parse(storage);
      return (parsed || [])
        .filter(el => this.checkValue(el))
        .reduce((acc, el) => {
          const numEl = +el;
          if (!acc.includes(numEl)) {
            acc.push(numEl);
          }
          return acc;
        }, []);
    } catch (e) {
      console.warn('Error parsing favourites:', e);
      return [];
    }
  }

  checkValue(value) {
    return value != null && value !== '' && !Number.isNaN(+value);
  }

  openFavouritesHandler() {
    this.updateFsm({ type: 'favourites' });
  }

  //throttling
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  updateFavouritesBlock() {
    //  Immediate execution для критичних операцій
    this.emit(
      'clearAllHtmlTag',
      '.js-s3d-fv__list .js-s3d-card, .js-s3d-fv__list .EmptyFavourites',
    );

    const html =
      this.favouritesIds$.value.length > 0
        ? this.favouritesIds$.value.map(id =>
            CompareItem({
              flat: this.getCachedFlat(id),
              i18n: this.i18n,
              id,
              propertiesToShow: this.propertiesToShow,
            }),
          )
        : [EmptyFavourites(this.i18n)];

    this.emit('setInPageHtml', html);
  }

  isSessionStorageSupported() {
    try {
      const storage = window.sessionStorage;
      const test = '__test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  changeFavouritesHandler(element, isAnimate) {
    const id = parseInt(element.getAttribute('data-id'), 10);
    if (!id) return;

    const favourites = this.favouritesIds$.value;
    const updatedFavourites = xor(favourites, [id]);

    if (!this.isSessionStorageSupported()) {
      console.warn('SessionStorage not supported');
      return;
    }

    try {
      sessionStorage.setItem('favourites', JSON.stringify(updatedFavourites));
      //  Async dispatch для неблокування UI
      Promise.resolve().then(() => {
        dispatchTrigger(
          updatedFavourites.includes(id)
            ? 'add-object-to-favourites'
            : 'delete-object-from-favourites',
          { url: window.location.href, id },
        );
      });

      if (isAnimate) {
        this.moveToFavouriteEffectHandler(element, !updatedFavourites.includes(id));
      }

      // затримкa для UI update
      const delay = isAnimate ? this.animationSpeed * 0.8 : 100;
      setTimeout(() => {
        this.favouritesIds$.next(updatedFavourites);
        if (updatedFavourites.length === 0 && this.fsm.state === 'favourites') {
          window.history.back();
        }
      }, delay);
    } catch (error) {
      console.error('Error saving favourites:', error);
    }
  }

  moveToFavouriteEffectHandler(target, reverse) {
    const animatingIcon = target.querySelector('svg');
    const endPositionElement = this.getDomElement('.js-s3d__favourite-icon');

    if (!animatingIcon || !endPositionElement) {
      console.warn('Animation elements not found');
      return;
    }

    const distance = this.getBetweenDistance(animatingIcon, endPositionElement);
    this.animateFavouriteElement(endPositionElement, animatingIcon, distance, reverse);
  }

  getBetweenDistance(animatingIcon, endPositionElement) {
    const animate = animatingIcon.getBoundingClientRect();
    const endAnimate = endPositionElement.getBoundingClientRect();
    const animateX = animate.left + animate.width / 2;
    const animateY = animate.top + animate.height / 2;
    const endAnimateX = endAnimate.left + endAnimate.width / 2;
    const endAnimateY = endAnimate.top + endAnimate.height / 2;
    return {
      x: endAnimateX - animateX,
      y: endAnimateY - animateY,
    };
  }

  getSpeedAnimateHeart(offsetObj) {
    return Math.abs(offsetObj.x) + Math.abs(offsetObj.y);
  }

  animateFavouriteElement(destination, element, distance, reverse) {
    if (typeof gsap === 'undefined') return;

    const clone = element.cloneNode(true);
    clone.classList.add('s3d-favourite__pulse');
    const rect = element.getBoundingClientRect();
    const container = this.getDomElement('.js-s3d__slideModule');

    if (!container) return;

    container.appendChild(clone);

    gsap.set(clone, {
      position: 'absolute',
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
      pointerEvents: 'none',
      zIndex: 9999,
    });

    if (reverse) {
      gsap.to(clone, {
        scale: 1.5,
        duration: 0.15,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });
      const particles = [];
      for (let i = 0; i < 8; i++) {
        const particle = clone.cloneNode(true);
        container.appendChild(particle);
        particles.push(particle);

        gsap.set(particle, {
          position: 'absolute',
          width: rect.width / 2.5,
          height: rect.height / 2.5,
          left: rect.left + rect.width / 2,
          top: rect.top + rect.height / 2,
          opacity: 0.9,
          filter: 'brightness(1.2)',
        });
      }

      setTimeout(() => clone.remove(), 300);

      return gsap.to(particles, {
        x: i => gsap.utils.random(-80, 80),
        y: i => gsap.utils.random(-80, 80),
        rotation: i => gsap.utils.random(-360, 360),
        scale: i => gsap.utils.random(0.1, 0.4),
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        onComplete: () => particles.forEach(p => p.remove()),
      });
    } else {
      const duration = Math.max(0.4, this.animationSpeed / 1500);

      return gsap
        .timeline()
        .to(clone, {
          scale: 1.2,
          duration: 0.1,
          ease: 'power2.out',
        })
        .to(
          clone,
          {
            x: distance.x,
            y: distance.y,
            scale: 0.2,
            opacity: 0,
            rotation: 180,
            duration,
            ease: 'power3.in',
          },
          '-=0.05',
        )
        .call(() => clone.remove());
    }
  }
}

export default FavouritesModel;
