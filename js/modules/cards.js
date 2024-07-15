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

export default cards;