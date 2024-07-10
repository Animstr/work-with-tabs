function modalAfterPush() {
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
};

module.exports = modalAfterPush;