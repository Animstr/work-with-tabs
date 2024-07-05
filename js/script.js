document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabParent = document.querySelector('.tabheader__items');

    function removeTabs() {
        tabsContent.forEach((item, i) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(function(item, i) {
            item.classList.remove('tabheader__item_active')
        })
    }
    
    function setActiveTab(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    removeTabs();
    setActiveTab();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('tabheader__item') && target){
            tabs.forEach(function(item, i) {
                if(item == target) {
                    removeTabs();
                    setActiveTab(i);
                }
            })
        }
    });

    //Timer
    let endTime = '2024-09-01';
    
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
    
    alertTime('.timer', endTime);

    //slideTop

    const slideUp = document.querySelector('.pepper');
    slideUp.addEventListener('click', () => {
        document.documentElement.scrollTop = 0;
    })

    //modalWindow

    const modalWindow = document.querySelector('.modal'),
        openModal = document.querySelectorAll('[data-modal]');
        
    function open () {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    };

    function close () {
            modalWindow.style.display = 'none';
            document.body.style.overflow = '';
        };
    
    
    openModal.forEach(function (button) {
        button.addEventListener('click', open)
    });
    
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            close();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            close();
        }
    });

    let modalTimer = setTimeout(open, 5000);

    function scrollBottomOpenModal () {
        if (window.pageYOffset + document.documentElement.clientHeight >=
             document.documentElement.scrollHeight ) {
            open();
            removeEventListener('scroll', scrollBottomOpenModal);
        }
    };

    window.addEventListener('scroll', scrollBottomOpenModal)

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
                            <h3 class="menu__item-subtitle">Меню "${this.header}"</h3>
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

    //slider
    
    const   current = document.querySelector('#current'),
            total = document.querySelector('#total'),
            slider = document.querySelector('.offer__slider'),
            slide = document.querySelectorAll('[data-slider]'),
            nextSlide = document.querySelector('.offer__slider-next'),
            prevSlide = document.querySelector('.offer__slider-prev'),
            slidesField = document.querySelector('.offer__slider-inner'),
            slideWindow = document.querySelector('.offer__slider-wrapper');
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
    //Push form to server

    const forms = document.querySelectorAll('form');
    forms.forEach(function (item) {
        compilatingPushData(item);
    })

    const pushData = async (url, data) => {
        const res = await fetch (url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: data
        });   
        return await res.json();
    }

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

            pushData('http://localhost:3000/requests', json)
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
            open();

            const thanksMessage = document.createElement('div');

            thanksMessage.classList.add('modal__dialog');
            thanksMessage.innerHTML = 
            `<div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${text}</div>
            </div>`

            modalWindow.append(thanksMessage);

            setTimeout(function () {
                close();
                thanksMessage.remove();
                modalMessage.classList.add('show');
                modalMessage.classList.remove('hide');
            }, 3000);
    };

    //calc

    const result = document.querySelector('.calculating__result span');
    let gender = 'female', height, weight, age, ratio = 1.375;

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
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
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
})