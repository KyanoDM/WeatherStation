const firebaseConfig6 = {
    apiKey: "AIzaSyCG-BjnGE1V3X_18oxB325QroJ4UNftec8",
    authDomain: "weatherdata-a36d3.firebaseapp.com",
    databaseURL: "https://weatherdata-a36d3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "weatherdata-a36d3",
    storageBucket: "weatherdata-a36d3.appspot.com",
    messagingSenderId: "237528717792",
    appId: "1:237528717792:web:7ef4f5049fbc381e04b385",
    measurementId: "G-VTTYPK4W1N"
};

let dataArray6 = [{ value: 0, timestamp: new Date() }]; // initialize dataArray with an object containing temperature value and timestamp
if (firebase.apps.length === 0) { // check if Firebase app has already been initialized
    firebase.initializeApp(firebaseConfig6);
}
const database6 = firebase.database();
const fetchedData6 = database6.ref('graph/rain');
const fetchedDate6 = database6.ref('graph/time');

fetchedData6.on('value', (snapshot) => {
    const data = snapshot.val();
    const dataLength = data.length;

    // fetch timestamps from the database
    fetchedDate6.limitToLast(dataLength).once('value', (snapshot) => {
        const dates = snapshot.val();
        const dateValues = Object.values(dates);
        // update the chart labels with the fetched timestamps
        chart6.data.labels = dateValues;

        // update the chart data with the fetched temperatures
        chart6.data.datasets[0].data = data;

        chart6.update();

    });
});

fetchedData6.orderByKey().limitToLast(10).on('value', (snapshot) => {
    var data = snapshot.val();
    dataArray6 = Object.values(data); // update the dataArray with the last 10 values
    chart6.data.datasets[0].data.splice(0, 9, ...dataArray6); // update the chart's datasets with the updated dataArray
    chart6.update();
});

fetchedData6.on('child_added', (snapshot) => {
    const value = snapshot.val();
    const timestamp = new Date(parseInt(snapshot.key));
    const newData = { value, timestamp };
    dataArray6.push(newData); // update the dataArray with the new data
    chart6.data.datasets[0].data.push(value); // update the chart's datasets with the updated dataArray
    chart6.data.labels.push(timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // update the chart's labels with the updated dataArray
    chart6.update();
});

const ctx6 = document.getElementById('myChartRain').getContext('2d');
const chart6 = new Chart(ctx6, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Rain',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {}
        }
    }
});