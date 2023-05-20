const firebaseConfig2 = {
  apiKey: "AIzaSyCG-BjnGE1V3X_18oxB325QroJ4UNftec8",
  authDomain: "weatherdata-a36d3.firebaseapp.com",
  databaseURL: "https://weatherdata-a36d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weatherdata-a36d3",
  storageBucket: "weatherdata-a36d3.appspot.com",
  messagingSenderId: "237528717792",
  appId: "1:237528717792:web:7ef4f5049fbc381e04b385",
  measurementId: "G-VTTYPK4W1N"
};

let dataArray2 = [{ value: 0, timestamp: new Date() }]; // initialize dataArray with an object containing temperature value and timestamp
if (firebase.apps.length === 0) { // check if Firebase app has already been initialized
  firebase.initializeApp(firebaseConfig2);
}
const database2 = firebase.database();
const fetchedData2 = database2.ref('graph/hum');
const fetchedDate2 = database2.ref('graph/time');

fetchedData2.on('value', (snapshot2) => {
  const data2 = snapshot2.val();
  const dataLength2 = data2.length;

  // fetch timestamps from the database
  fetchedDate2.limitToLast(dataLength2).once('value', (snapshot3) => {
    const dates2 = snapshot3.val();
    const dateValues2 = Object.values(dates2);

    // update the chart labels with the fetched timestamps
    chart2.data.labels = dateValues2;

    // update the chart data with the fetched temperatures
    chart2.data.datasets[0].data = data2;

    chart2.update();
  });
});

fetchedData2.orderByKey().limitToLast(10).on('value', (snapshot4) => {
  var data3 = snapshot4.val();
  dataArray2 = Object.values(data3); // update the dataArray with the last 10 values
  chart2.data.datasets[0].data.splice(0, 9, ...dataArray2); // update the chart's datasets with the updated dataArray 
  chart2.update();
});

fetchedData2.on('child_added', (snapshot5) => {
  const value2 = snapshot5.val();
  const timestamp2 = new Date(parseInt(snapshot5.key));
  const newData2 = { value: value2, timestamp: timestamp2 };
  dataArray2.push(newData2); // update the dataArray with the new data
  chart2.data.datasets[0].data.push(value2); // update the chart's datasets with the updated dataArray
  chart2.data.labels.push(timestamp2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // update the chart's labels with the updated dataArray
  chart2.update();
});

const ctx2 = document.getElementById('myChartHum').getContext('2d');
const chart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Humidity - in %',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {}
    }
  }
});
