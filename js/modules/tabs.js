function tabs () {
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
};

module.exports = tabs;