'use strict';

import Chart from 'chart.js/auto';
const errorMessage = document.querySelector('p.no-top-margin');
const mediaQuery700 = window.matchMedia('(max-width: 700px)');
const mediaQuery900 = window.matchMedia('(max-width: 900px');

window.addEventListener('load', getData);

/* Hämta hem alla kurser och program */
async function getData() {
    //Fetch-anrop
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

/* Funktion för att skapa stapeldiagram */

function displayBarChart(courses) {
    const chartElement = document.getElementById('barchart');
    //Dela upp kursnamnen i varsin array så de kan radbrytas
    let courseNames = courses.map((course) => course.name.split(' '));

    const barChart = new Chart(chartElement, {
        type: 'bar',
        options: {
            /* events: [], */
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
                        '#d4afb9',
                        '#b6cfb6',
                        '#c6def1',
                        '#dbcdf0',
                        '#f2c6de',
                        '#f7d9c4',
                    ],
                },
            ],
        },
    });

    //Kontrollera maxbredd och ta bort labels om mindre än så
    hideLabels(barChart);
    mediaQuery700.addEventListener('change', () => {
        hideLabels(barChart);
    });
}

function hideLabels(barChart) {
    // Kontrollera om mediefrågan matchar
    if (mediaQuery700.matches) {
        // Dölj labels om mediefrågan matchar
        barChart.options.scales.x.ticks.display = false;
    } else {
        // Visa labels om mediefrågan inte matchar
        barChart.options.scales.x.ticks.display = true;
    }

    // Uppdatera diagrammet för att applicera ändringarna
    barChart.update();
}

function displayPieChart(program) {
    const pieChartEl = document.getElementById('piechart');

    const pieChart = new Chart(pieChartEl, {
        type: 'pie',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
            },
            maintainAspectRatio: true,
        },
        data: {
            labels: program.map((program) => program.name),
            datasets: [
                {
                    label: 'Antal Sökande',
                    data: program.map((prog) => prog.applicantsTotal),
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
    moveLabels(pieChart);
    mediaQuery900.addEventListener('change', () => {
        moveLabels(pieChart);
    });
}

function moveLabels(pieChart) {
    // Kontrollera om mediefrågan matchar
    if (mediaQuery900.matches) {
        // Dölj labels om mediefrågan matchar
        pieChart.options.plugins.legend.position = 'bottom';
    } else {
        pieChart.options.plugins.legend.position = 'left';
    }

    // Uppdatera diagrammet för att applicera ändringarna
    pieChart.update();
}
