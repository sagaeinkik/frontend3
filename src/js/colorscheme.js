'use strict';
/* Det jag vill åstadkomma: 
- Ljust tema + inaktiv hamburgermeny = mörk logotyp
- Ljust tema + aktiv hamburgermeny = mörk logotyp
- Mörkt tema + inaktiv hamburgermeny = mörk logotyp
- Mörkt tema + aktiv hamburgermeny = ljus logotyp */

// Hämta sökvägarna till bilderna med import för att parcel ställer till det med vanliga sökvägarna
import logotypeLight from '../images/logo/signature-light.svg';
import logotypeDark from '../images/logo/signature-black.svg';

//Variabler
const burgerButton = document.querySelector('.burger-button'); //Burgarknappen, för att kolla om aktiv
const logotype = document.getElementById('logotyp'); //Logotyp-elementet, för att byta ut src-attribut
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)'); //Kolla om dark mode är på
const mobileNav = document.querySelector('div.mobile-menu'); //Hela mobilmenyn

function updateLogotype() {
    //Villkor: kolla om dark mode är på
    if (darkModeQuery.matches) {
        //Om ja, kolla om burgaren har klassen active
        if (burgerButton.classList.contains('active')) {
            //Om ja, byt logotyp
            logotype.src = logotypeLight;
        } else {
            //Om burgaren är inaktiv, byt tillbaka till mörk
            logotype.src = logotypeDark;
        }
    } else {
        //Om dark mode är av, se till att loggan är mörk
        logotype.src = logotypeDark;
    }
}

updateLogotype(); //Kalla funktionen direkt
darkModeQuery.addEventListener('change', updateLogotype); //Kalla funktionen om tema byts (så man inte behöver refresha)
burgerButton.addEventListener('click', updateLogotype); //Kalla funktionen om man klickar på burger, för då ändras ju klassen

/* Se till att loggan ändras tillbaka till mörk om man stänger menyn genom att klicka utanför menyområdet */
document.addEventListener('click', (e) => {
    //Kolla om klicket skedde innanför menyområdet
    const clickInside = mobileNav.contains(e.target);
    if (!clickInside) {
        //Om klick utanför, byt src-attribut
        logotype.src = logotypeDark;
    }
});
