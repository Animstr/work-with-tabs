document.addEventListener('DOMContentLoaded', () => {
    const calc = require('./modules/calc'),
          cards = require('./modules/cards'),
          modalAfterPush = require('./modules/modalAfterPush'),
          modalWindow = require('./modules/modalWindow'),
          slider = require('./modules/slider'),
          slideTop = require('./modules/slideTop'),
          tabs = require('./modules/calc'),
          timer = require('./modules/timer');

    calc();
    cards();
    modalAfterPush();
    modalWindow();
    slider();
    slideTop();
    tabs();
    timer(); 
})