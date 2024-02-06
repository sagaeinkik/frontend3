'use strict';
//Variabler
const burgerButton = document.querySelector('.burger-button'); //Själva burgarknappen
const mobileMenu = document.querySelector('.mobile-menu-items'); //Själva ul-elementet med menyns innehåll
const mobileNav = document.querySelector('div.mobile-menu'); //Hela wrappern för menyn

//Vid klick på knappen, toggla klass active på meny och knapp
burgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    burgerButton.classList.toggle('active');
});

//Stäng menyn vid klick utanför
document.addEventListener('click', (e) => {
    //Lagra om klicket skedde inuti hela menyområdet
    const clickInside = mobileNav.contains(e.target);
    if (!clickInside) {
        //Om nej, ta bort active från meny och knapp
        burgerButton.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});
