/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
    //calc

    const result = document.querySelector('.calculating__result span');
    let gender, height, weight, age, ratio;

    if(localStorage.getItem('gender')){
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }
    
    if(localStorage.getItem('ratio')){
        ratio = +localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function localStorageStaticInformation (activeClass, selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if(element.getAttribute('id') == localStorage.getItem('gender')){
                element.classList.add(activeClass);
            } 
            if(element.getAttribute('data-ratio') == localStorage.getItem('ratio')){
                element.classList.add(activeClass);
            }
        })
    }

    localStorageStaticInformation('calculating__choose-item_active', '#gender div');
    localStorageStaticInformation('calculating__choose-item_active', '.calculating__choose_big div');

    function countCallories () {
        if ( !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (gender === 'female') {
            result.textContent = Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
        }
        if (gender === 'male') {
            result.textContent = Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
        }
    }

    countCallories();

    function staticInformation (statusClass, parentSellector) {
        const elements = document.querySelectorAll(`${parentSellector} div`);
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')){
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                    gender = e.target.getAttribute('id');
                }

                elements.forEach(element => {
                    element.classList.remove(statusClass);
                })
                e.target.classList.add(statusClass);

                countCallories();
            })
        })
    }

    staticInformation('calculating__choose-item_active', '#gender');
    staticInformation('calculating__choose-item_active', '.calculating__choose_big');

    function dynamicInformation (selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            };

            switch (input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                break;
                case 'weight':
                    weight = +input.value;
                break;
                case 'age':
                    age = +input.value;
                break;    
            }
            countCallories();
            console.log(height, weight, age);
        });  
    }
    
    dynamicInformation('#height');
    dynamicInformation('#weight');
    dynamicInformation('#age');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
        //make a shablone of cards

        class FitoCard {
            constructor (img, alt, header, text, price, ...classes) {
                this.img = img;
                this.alt = alt;
                this.header = header;
                this.text = text;
                this.price = price;
                this.classes = classes;
                this.course = 89;
                this.exchanger();
            }
    
            exchanger() {
                this.price = this.price * this.course;
            }
    
            render() {
                const div = document.createElement('div'),
                    container = document.querySelector('[data-container]');
                
                if (this.classes.length == 0) {
                    div.classList.add('menu__item');
                } else {
                    this.classes.forEach(className => div.classList.add(className));
                }
    
                div.innerHTML = `<img src="${this.img}" alt="${this.alt}">
                                <h3 class="menu__item-subtitle">${this.header}</h3>
                                <div class="menu__item-descr">${this.text}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                                </div>`
                
                container.appendChild(div);
            }    
        }
    
        axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new FitoCard(img, altimg, title, descr, price).render()
                })
            })
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/modalAfterPush.js":
/*!**************************************!*\
  !*** ./js/modules/modalAfterPush.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_modalWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function modalAfterPush(modalTimer, modalSelector, formSelector) {
        //Push form to server

        const forms = document.querySelectorAll(formSelector);
        forms.forEach(function (item) {
            compilatingPushData(item);
        });
    
        function compilatingPushData (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
    
                const status = document.createElement('img');
                const message = {
                    loading: 'icons/modal/spinner.svg',
                    done: 'Заявка успешно отправлена',
                    failure: 'Что-то пошло не так, вернитесь позже'
                };
    
                const formData = new FormData(form);
                
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
                status.src = message.loading;
                status.style.cssText = `
                    margin: 0 auto;
                    display: block;
                `;
                form.insertAdjacentElement('afterend', status);
    
                (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.pushData)('http://localhost:3000/requests', json)
                    .then(data => {console.log(data)})
                    .then(() => {modalAfterPush(message.done)})
                    .catch(() => {modalAfterPush(message.failure)})
                    .finally(() => {
                        form.reset();
                        status.remove();
                    })
            })
        };
    
        function modalAfterPush (text) {
            const modalMessage = document.querySelector('.modal__dialog');
                
                modalMessage.classList.add('hide');
                (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_0__.open)('.modal', modalTimer);
    
                const thanksMessage = document.createElement('div');
    
                thanksMessage.classList.add('modal__dialog');
                thanksMessage.innerHTML = 
                `<div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${text}</div>
                </div>`

                const modalWindow = document.querySelector(modalSelector);

                modalWindow.append(thanksMessage);
    
                setTimeout(function () {
                    (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_0__.close)('.modal', modalTimer);
                    thanksMessage.remove();
                    modalMessage.classList.add('show');
                    modalMessage.classList.remove('hide');
                }, 3000);
        };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalAfterPush);

/***/ }),

/***/ "./js/modules/modalWindow.js":
/*!***********************************!*\
  !*** ./js/modules/modalWindow.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   close: () => (/* binding */ close),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   open: () => (/* binding */ open)
/* harmony export */ });
function open (modalSelector, modalTimer) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if(modalTimer){
        clearTimeout(modalTimer);
    }
};

function close (modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.style.display = 'none';
    document.body.style.overflow = '';
};

function modalWindow(modalSelector, openModalSelector, modalTimer) {
        //modalWindow

        const modalWindow = document.querySelector(modalSelector),
        openModal = document.querySelectorAll(openModalSelector);
    
    openModal.forEach(function (button) {
        button.addEventListener('click', () => open(modalSelector, modalTimer))
    });
    
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            close(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            close(modalSelector);
        }
    });

    function scrollBottomOpenModal () {
        if (window.pageYOffset + document.documentElement.clientHeight >=
             document.documentElement.scrollHeight ) {
            open(modalSelector, modalTimer);
            removeEventListener('scroll', scrollBottomOpenModal);
        }
    };

    window.addEventListener('scroll', scrollBottomOpenModal);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalWindow);



/***/ }),

/***/ "./js/modules/slideTop.js":
/*!********************************!*\
  !*** ./js/modules/slideTop.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slideTop(peperSelector) {
        //slideTop

        const slideUp = document.querySelector(peperSelector);
        slideUp.addEventListener('click', () => {
            document.documentElement.scrollTop = 0;
        });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slideTop);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({currentSelector, totalSelector, sliderSelector, slideSelector, nextSlideSelector,
    prevSlideSelector, slidesFieldSelector, slideWindowSelector}) {
        //slider
    
        const   current = document.querySelector(currentSelector),
        total = document.querySelector(totalSelector),
        slider = document.querySelector(sliderSelector),
        slide = document.querySelectorAll(slideSelector),
        nextSlide = document.querySelector(nextSlideSelector),
        prevSlide = document.querySelector(prevSlideSelector),
        slidesField = document.querySelector(slidesFieldSelector),
        slideWindow = document.querySelector(slideWindowSelector),
        width = window.getComputedStyle(slideWindow).width;

let slideIndex = 1;
let offset = 0;

slidesField.style.width = 100 * slide.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = 'all .5s ease-in-out';

slideWindow.style.overflow = 'hidden';

slide.forEach(slide => {
    slide.style.width = width;
})

slider.style.position = 'relative';

const indicators = document.createElement('ol');
const dots = [];

indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
slider.append(indicators);

for (let i = 0; i < slide.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);

     dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    };

    dots.push(dot);
    indicators.append(dot);
}

const moveingImgsInSlideField = function() {
    slidesField.style.transform = `translateX(-${offset}px)`;
};

const lightAtiveIndicator = function() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
};

const showSlideNumber = function(){
    if (slide.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
};

const stringTransformToNumber = function(str) {
    return +str.replace(/\D/g, '');
}

nextSlide.addEventListener('click', () => {
    if (offset == stringTransformToNumber(width) * (slide.length - 1)) {
        offset = 0;
    } else {
        offset += stringTransformToNumber(width);
    }

    if (slideIndex == slide.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    showSlideNumber();

    moveingImgsInSlideField();

    lightAtiveIndicator();
});

prevSlide.addEventListener('click', () => {
    if (offset == 0) {
        offset = stringTransformToNumber(width) * (slide.length - 1)
    } else {
        offset -= stringTransformToNumber(width);
    }

    if (slideIndex == 1) {
        slideIndex = slide.length;
    } else {
        slideIndex--;
    }
    
    showSlideNumber();

    moveingImgsInSlideField();

    lightAtiveIndicator();
});

if (slide.length < 10) {
    total.textContent = `0${slide.length}`;
} else {
    total.textContent = slide.length;
}

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = stringTransformToNumber(width) * (slideTo - 1);

        moveingImgsInSlideField();

        lightAtiveIndicator();

        showSlideNumber();
    })
})
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsSelctor, tabsContentSelector, tabParentSelector, aciveClassSelector) {
        // Tabs
        const tabs = document.querySelectorAll(tabsSelctor),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabParent = document.querySelector(tabParentSelector);

    function removeTabs() {
        tabsContent.forEach((item, i) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(function(item, i) {
            item.classList.remove(aciveClassSelector)
        })
    }
    
    function setActiveTab(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(aciveClassSelector);
    }

    removeTabs();
    setActiveTab();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains(tabsSelctor.slice(1)) && target){
            tabs.forEach(function(item, i) {
                if(item == target) {
                    removeTabs();
                    setActiveTab(i);
                }
            })
        }
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, endTime) {
        //Timer
    
        function getRemainingTime(endDate) {
    
            let time, days, hours, minutes, seconds;
    
            time = Date.parse(endDate) - new Date();
    
            if (time <= 0) {
                document.querySelector('.timer').style.display = 'none';
                document.querySelector('#timer_title').innerHTML = 'Акция окончена!'
            } else {
                days = Math.floor(time/(1000 * 60 * 60 * 24));
                hours = Math.floor((time/(1000 * 60 * 60) % 24));
                minutes = Math.floor((time/(1000 * 60) % 60));
                seconds = Math.floor((time/1000 % 60));
            }
    
            return {
                'time': time,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            }
        }
    
        function getZero (num){
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    
        function alertTime(block, endDate) {
            const timeBlock = document.querySelector(block),
                days = timeBlock.querySelector('#days'),
                hours = timeBlock.querySelector('#hours'),
                minutes = timeBlock.querySelector('#minutes'),
                seconds = timeBlock.querySelector('#seconds');
                let timeInterval = setInterval(updateTimer, 1000);
    
                updateTimer();
                
            function updateTimer () {
                let t = getRemainingTime(endDate);
        
                if (t.time <= 0){
                    clearInterval(timeInterval);
                } else {
                    days.innerHTML = getZero(t.days);
                    hours.innerHTML = getZero(t.hours);
                    minutes.innerHTML = getZero(t.minutes);
                    seconds.innerHTML = getZero(t.seconds);    
                }
            }
        }
        
        alertTime(id, endTime);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pushData: () => (/* binding */ pushData)
/* harmony export */ });
const pushData = async (url, data) => {
    const res = await fetch (url, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: data
    });   
    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modalAfterPush__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modalAfterPush */ "./js/modules/modalAfterPush.js");
/* harmony import */ var _modules_modalWindow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modalWindow */ "./js/modules/modalWindow.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_slideTop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slideTop */ "./js/modules/slideTop.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");










document.addEventListener('DOMContentLoaded', () => {
    let modalTimer = setTimeout(() => (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_3__.open)('.modal', modalTimer), 50000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_modalAfterPush__WEBPACK_IMPORTED_MODULE_2__["default"])(modalTimer, '.modal', 'form');
    (0,_modules_modalWindow__WEBPACK_IMPORTED_MODULE_3__["default"])('.modal', '[data-modal]', modalTimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        currentSelector: '#current',
        totalSelector: '#total',
        sliderSelector: '.offer__slider',
        slideSelector: '[data-slider]',
        nextSlideSelector: '.offer__slider-next',
        prevSlideSelector: '.offer__slider-prev',
        slidesFieldSelector: '.offer__slider-inner',
        slideWindowSelector: '.offer__slider-wrapper'
    });
    (0,_modules_slideTop__WEBPACK_IMPORTED_MODULE_5__["default"])('.pepper');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])('.timer', '2024-09-01'); 
})
/******/ })()
;
//# sourceMappingURL=bundle.js.map