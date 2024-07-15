import {open, close} from '../modules/modalWindow';
import {pushData} from '../services/services';

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
                open('.modal', modalTimer);
    
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
                    close('.modal', modalTimer);
                    thanksMessage.remove();
                    modalMessage.classList.add('show');
                    modalMessage.classList.remove('hide');
                }, 3000);
        };
};

export default modalAfterPush;