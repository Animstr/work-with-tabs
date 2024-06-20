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

    const fitnesMenu = new FitoCard('img/tabs/vegy.jpg', 'vegy', 'Фитнес',
         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '15'),
        eliteMenu = new FitoCard('img/tabs/elite.jpg', 'elite', 'Премиум', 
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '35' ),
        postMenu = new FitoCard('img/tabs/post.jpg', 'post', 'Постное', 
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '20');

    fitnesMenu.render();
    eliteMenu.render();
    postMenu.render();

    //slider
    
    const sliderCounter = document.querySelector('#current'),
            slideImg = document.querySelectorAll('[data-slider]'),
            nextSlide = document.querySelector('.offer__slider-next'),
            prevSlide = document.querySelector('.offer__slider-prev');

    let i = 0;

    function removeSliderImgs () {
        slideImg.forEach(function (element) {
            element.classList.remove('show');
            element.classList.add('hide');
        })
    };

    function addShowClass() {
        slideImg[i].classList.remove('hide');
        slideImg[i].classList.add('show');
    }

    nextSlide.addEventListener('click', () => {
        removeSliderImgs();
        if (i < 3) {
            i++;
            addShowClass();
        } else {
            i = 0;
            addShowClass();
        }

        sliderCounter.innerHTML = `0${i+1}`
    })

    prevSlide.addEventListener('click', () => {
        removeSliderImgs();
        
        if (i > 0) {
            i--;
            addShowClass();
        } else {
            i = 3;
            addShowClass(); 
        }

        sliderCounter.innerHTML = `0${i+1}`
    })

    //Push form to server

    const forms = document.querySelectorAll('form');
    forms.forEach(function (item) {
        pushData(item);
    })

    function pushData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const status = document.createElement('img');
            const message = {
                loading: 'icons/modal/spinner.svg',
                done: 'Заявка успешно отправлена',
                failure: 'Что-то пошло не так, вернитесь позже'
            };

            const formData = new FormData(form);
            const object = {};
            formData.forEach((key, value) => {
                object[key] = value;
            });

            status.src = message.loading;
            status.style.cssText = `
                margin: 0 auto;
                display: block;
            `;

            fetch('server.php', {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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
})