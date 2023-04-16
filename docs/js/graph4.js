const firebaseConfig4 = {
    apiKey: "AIzaSyCG-BjnGE1V3X_18oxB325QroJ4UNftec8",
    authDomain: "weatherdata-a36d3.firebaseapp.com",
    databaseURL: "https://weatherdata-a36d3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "weatherdata-a36d3",
    storageBucket: "weatherdata-a36d3.appspot.com",
    messagingSenderId: "237528717792",
    appId: "1:237528717792:web:7ef4f5049fbc381e04b385",
    measurementId: "G-VTTYPK4W1N"
};

let dataArray4 = [{ value4: 0, timestamp4: new Date() }]; // initialize dataArray4 with an object containing temperature value4 and timestamp4
if (firebase.apps.length === 0) { // check if Firebase app has already been initialized
    firebase.initializeApp(firebaseConfig4);
}
const database4 = firebase.database();
const fetchedData4 = database4.ref('graph/windd');

fetchedData4.on('value', (snapshot) => {
    const data4 = snapshot.val();
    const dataLength4 = data4.length;

    // fetch timestamps4 from the database4
    fetchedData4.limitToLast(dataLength4).once('value', (snapshot) => {
        const dates4 = snapshot.val();
        const dateValues4 = Object.values(dates4);

        // update the chart labels4 with the fetched timestamps4
        chart.data.labels4 = dateValues4;

        // update the chart data with the fetched temperatures
        chart.data.datasets[0].data4 = data4;

        chart.update();
    });

});

var North = 0;
var Northeast = 0;
var East = 0;
var Southeast = 0;
var South = 0;
var Southwest = 0;
var West = 0;
var Northwest = 0;



fetchedData4.orderByKey().limitToLast(10).on('value', (snapshot) => {
    var North = 0;
    var Northeast = 0;
    var East = 0;
    var Southeast = 0;
    var South = 0;
    var Southwest = 0;
    var West = 0;
    var Northwest = 0;
    var data4 = snapshot.val();
    dataArray4 = Object.values(data4); // update the dataArray4 with the last 10 values

    // convert the fetched data from strings to numbers
    const dataNumbers4 = dataArray4.map(value => Number(value));

    // update the chart's datasets with the updated dataArray4
    if (chart.data.datasets[0].data) {
        chart.data.datasets[0].data.splice(0, 9, ...dataArray4);
    }

    // Count occurrences of each wind direction
    for (let i = 0; i < dataArray4.length; i++) {
        const currentString = dataArray4[i];
        switch (currentString) {
            case 'North':
                North++;
                break;
            case 'Northeast':
                Northeast++;
                break;
            case 'East':
                East++;
                break;
            case 'Southeast':
                Southeast++;
                break;
            case 'South':
                South++;
                break;
            case 'Southwest':
                Southwest++;
                break;
            case 'West':
                West++;
                break;
            case 'Northwest':
                Northwest++;
                break;
            default:
                break;
        }
    }

    // Update the chart's data with the updated wind direction counts
    myChart.data.datasets[0].data = [North, Northeast, East, Southeast, South, Southwest, West, Northwest];
    myChart.update();
});


var data = {
    datasets: [{
        data: [North, Northeast, East, Southeast, South, Southwest, West, Northwest],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 255)',
            'rgb(54, 162, 86)'
        ],
        borderColor: [
            'rgb(255,255,255)',
            'rgb(255,255,255)',
            'rgb(255,255,255)',
            'rgb(255,255,255)',
            'rgb(255,255,255)'
        ],
        borderWidth: 3,
        label: 'Wind Directions'
    }],
    labels: [
        'North',
        'Northeast',
        'East',
        'Southeast',
        'South',
        'Southwest',
        'West',
        'Northwest'
    ]
};

var options = {
    title: {
        display: true,
        text: 'My Polar Chart'
    },
    scale: {
        ticks: {
            beginAtZero: true,
            max: 100
        },
        reverse: false
    }
};

var myChart = new Chart(document.getElementById("myChartWind"), {
    type: 'polarArea',
    data: data,
    options: options
});
