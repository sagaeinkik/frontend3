'use strict';
const burgerButton = document.querySelector('.burger-button');
const mobileMenu = document.querySelector('.mobile-menu-items');

burgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    burgerButton.classList.toggle('active');
});
