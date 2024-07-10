function slider() {
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
};

module.exports = slider;