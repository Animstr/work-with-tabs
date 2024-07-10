function slideTop() {
        //slideTop

        const slideUp = document.querySelector('.pepper');
        slideUp.addEventListener('click', () => {
            document.documentElement.scrollTop = 0;
        });
};

module.exports = slideTop;