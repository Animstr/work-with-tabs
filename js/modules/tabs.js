function tabs (tabsSelctor, tabsContentSelector, tabParentSelector, aciveClassSelector) {
        // Tabs
        const tabs = document.querySelectorAll(tabsSelctor),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabParent = document.querySelector(tabParentSelector);

    function removeTabs() {
        tabsContent.forEach((item, i) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(function(item, i) {
            item.classList.remove(aciveClassSelector)
        })
    }
    
    function setActiveTab(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(aciveClassSelector);
    }

    removeTabs();
    setActiveTab();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains(tabsSelctor.slice(1)) && target){
            tabs.forEach(function(item, i) {
                if(item == target) {
                    removeTabs();
                    setActiveTab(i);
                }
            })
        }
    });
};

export default tabs;