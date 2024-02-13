'use strict';

//Hämta häst och knapp
const button = document.querySelector(
    '.wrapper.underpage div.horsetransition button'
);

const horse = document.querySelector(
    '.wrapper.underpage div.horsetransition svg'
);

button.addEventListener('click', () => {
    horse.classList.toggle('active');
});
