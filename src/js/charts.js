'use strict';

import Chart from 'chart.js/auto';
const errorMessage = document.querySelector('p.no-top-margin');
const mediaQuery = window.matchMedia('(max-width: 700px)');

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
        displayPieChart(programs);
    } catch (error) {
        console.log(error);
        errorMessage.innerHTML = 'Det gick inte att hämta data..';
    }
}

function displayBarChart(courses) {
    const chartElement = document.getElementById('barchart');
    //Dela upp kursnamnen i varsin array så de kan radbrytas
    let courseNames = courses.map((course) => course.name.split(' '));

    const barChart = new Chart(chartElement, {
        type: 'bar',
        options: {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        display: true,
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (context) => {
                            return context[0].label.replaceAll(',', ' ');
                        },
                    },
                },
            },
        },
        data: {
            labels: courseNames,
            datasets: [
                {
                    label: 'Antal Sökande',
                    data: courses.map((course) => course.applicantsTotal),
                    backgroundColor: [
                        'palevioletred',
                        'palegreen',
                        'palegoldenrod',
                        'paleturquoise',
                        'skyblue',
                        'pink',
                    ],
                },
            ],
        },
    });

    //Kontrollera maxbredd och ta bort labels om mindre än så
    labelCheck(barChart);
    mediaQuery.addEventListener('change', () => {
        labelCheck(barChart);
    });
}

function labelCheck(barChart) {
    const mediaQuery = window.matchMedia('(max-width: 700px)');
    // Kontrollera om mediefrågan matchar
    if (mediaQuery.matches) {
        // Dölj labels om mediefrågan matchar
        barChart.options.scales.x.ticks.display = false;
    } else {
        // Visa labels om mediefrågan inte matchar
        barChart.options.scales.x.ticks.display = true;
    }

    // Uppdatera diagrammet för att applicera ändringarna
    barChart.update();
}

function displayPieChart(programs) {
    console.log(programs);
}
