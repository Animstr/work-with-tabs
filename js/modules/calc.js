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

module.exports = calc;