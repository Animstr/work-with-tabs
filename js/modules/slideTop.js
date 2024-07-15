function slideTop(peperSelector) {
        //slideTop

        const slideUp = document.querySelector(peperSelector);
        slideUp.addEventListener('click', () => {
            document.documentElement.scrollTop = 0;
        });
};

export default slideTop;