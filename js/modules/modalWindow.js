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

export default modalWindow;
export {open};
export {close};