import calc from './modules/calc';
import cards from './modules/cards';
import modalAfterPush from './modules/modalAfterPush';
import modalWindow from './modules/modalWindow';
import slider from './modules/slider';
import slideTop from './modules/slideTop';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {open} from './modules/modalWindow';

document.addEventListener('DOMContentLoaded', () => {
    let modalTimer = setTimeout(() => open('.modal', modalTimer), 50000);

    calc();
    cards();
    modalAfterPush(modalTimer, '.modal', 'form');
    modalWindow('.modal', '[data-modal]', modalTimer);
    slider({
        currentSelector: '#current',
        totalSelector: '#total',
        sliderSelector: '.offer__slider',
        slideSelector: '[data-slider]',
        nextSlideSelector: '.offer__slider-next',
        prevSlideSelector: '.offer__slider-prev',
        slidesFieldSelector: '.offer__slider-inner',
        slideWindowSelector: '.offer__slider-wrapper'
    });
    slideTop('.pepper');
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2024-09-01'); 
})