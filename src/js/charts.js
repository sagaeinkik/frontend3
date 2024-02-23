'use strict';

import Chart from 'chart.js/auto';
const errorMessage = document.querySelector('p.no-top-margin');

window.addEventListener('load', getData);

async function getData() {
    //Fetch-anrop för att hämta alla kurser och program
    try {
        const response = await fetch(
            'https://studenter.miun.se/~mallar/dt211g/'
        );
        const data = await response.json();
        // Skapa arrayer för kurser och program, respektive
        let programs = [];
        let courses = [];

        //Loop som lägger program i program-array och kurser i kurs-array
        data.forEach((obj) => {
            if (obj.type === 'Program') {
                programs.push(obj);
            } else {
                courses.push(obj);
            }
        });

        //sortera efter mest sökta, begränsa till 5 och 6
        programs
            .sort((a, b) => a.applicantsTotal - b.applicantsTotal)
            .reverse();
        programs = programs.splice(0, 5);

        courses.sort((a, b) => a.applicantsTotal - b.applicantsTotal).reverse();
        courses = courses.splice(0, 6);

        //Kalla funktioner som skriver ut dessa till skärmen
        displayBarChart(courses);
        /* displayPieChart(programs); */
    } catch (error) {
        console.log(error);
        errorMessage.innerHTML = 'Det gick inte att hämta data..';
    }
}

async function displayBarChart(courses) {
    console.log(courses);

    const chartElement = document.getElementById('barchart').getContext('2d');
    const coursesChart = new Chart(chartElement, {
        type: 'bar',
        data: {
            labels: courses.map((course) => course.name),
            datasets: [
                {
                    label: 'Antal Sökande',
                    data: courses.map((course) => course.applicantsTotal),
                },
            ],
        },
        options: {},
    });
}
