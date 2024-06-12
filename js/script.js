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
        openModal = document.querySelectorAll('[data-modal]'),
        closeModal = document.querySelector('[data-closeModal]');
        
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

    closeModal.addEventListener('click', close);
    
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
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
        constructor (img, alt, header, text, price) {
            this.img = img;
            this.alt = alt;
            this.header = header;
            this.text = text;
            this.price = price;
            this.course = 89;
            this.exchanger();
        }

        exchanger() {
            this.price = this.price * this.course;
        }

        render() {
            const div = document.createElement('div'),
                container = document.querySelector('[data-container]');
            div.innerHTML = `<div class="menu__item">
                                <img src="${this.img}" alt="${this.alt}">
                                <h3 class="menu__item-subtitle">Меню "${this.header}"</h3>
                                <div class="menu__item-descr">${this.text}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                                </div>
                            </div>`
            
            container.appendChild(div);
        }    
    }

    const fitnesMenu = new FitoCard('img/tabs/vegy.jpg', 'vegy', 'Фитнес',
         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '15'),
        eliteMenu = new FitoCard('img/tabs/elite.jpg', 'elite', 'Премиум', 
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        '35'),
        postMenu = new FitoCard('img/tabs/post.jpg', 'post', 'Постное', 
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        '20');

    fitnesMenu.render();
    eliteMenu.render();
    postMenu.render();
})