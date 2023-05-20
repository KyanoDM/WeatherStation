const firebaseConfig5 = {
  apiKey: "AIzaSyCG-BjnGE1V3X_18oxB325QroJ4UNftec8",
  authDomain: "weatherdata-a36d3.firebaseapp.com",
  databaseURL: "https://weatherdata-a36d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weatherdata-a36d3",
  storageBucket: "weatherdata-a36d3.appspot.com",
  messagingSenderId: "237528717792",
  appId: "1:237528717792:web:7ef4f5049fbc381e04b385",
  measurementId: "G-VTTYPK4W1N"
};

let dataArray5 = [{ value: 0, timestamp: new Date() }]; // initialize dataArray with an object containing temperature value and timestamp
if (firebase.apps.length === 0) { // check if Firebase app has already been initialized
  firebase.initializeApp(firebaseConfig5);
}
const database5 = firebase.database();
const fetchedData5 = database5.ref('graph/winds');
const fetchedDate5 = database5.ref('graph/time');

fetchedData5.on('value', (snapshot) => {
  const data5 = snapshot.val();
  const dataLength5 = data5.length;

  // fetch timestamps from the database
  fetchedDate5.limitToLast(dataLength5).once('value', (snapshot) => {
    const dates5 = snapshot.val();
    const dateValues5 = Object.values(dates5);

    // update the chart labels with the fetched timestamps
    chart5.data.labels = dateValues5;

    // update the chart data with the fetched temperatures
    chart5.data.datasets[0].data = data5;

    chart5.update();
  });
});

fetchedData5.orderByKey().limitToLast(10).on('value', (snapshot) => {
  var data5 = snapshot.val();
  dataArray5 = Object.values(data5); // update the dataArray with the last 10 values
  chart5.data.datasets[0].data.splice(0, 9, ...dataArray5); // update the chart's datasets with the updated dataArray 
  chart5.update();
});

fetchedData5.on('child_added', (snapshot) => {
  const value5 = snapshot.val();
  const timestamp5 = new Date(parseInt(snapshot.key));
  const newData5 = { value: value5, timestamp: timestamp5 };
  dataArray5.push(newData5); // update the dataArray with the new data
  chart5.data.datasets[0].data.push(value5); // update the chart's datasets with the updated dataArray
  chart5.data.labels.push(timestamp5.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // update the chart's labels with the updated dataArray
  chart5.update();
});

const ctx5 = document.getElementById('myChartWinds').getContext('2d');
const chart5 = new Chart(ctx5, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Wind - in km/h',
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
