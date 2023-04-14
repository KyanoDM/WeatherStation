const firebaseConfig = {
  apiKey: "AIzaSyCG-BjnGE1V3X_18oxB325QroJ4UNftec8",
  authDomain: "weatherdata-a36d3.firebaseapp.com",
  databaseURL: "https://weatherdata-a36d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weatherdata-a36d3",
  storageBucket: "weatherdata-a36d3.appspot.com",
  messagingSenderId: "237528717792",
  appId: "1:237528717792:web:7ef4f5049fbc381e04b385",
  measurementId: "G-VTTYPK4W1N"
};

const dataArray = [{ value: 0, timestamp: new Date() }]; // initialize dataArray with an object containing temperature value and timestamp
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const fetchedData = database.ref('graph/temp');
const fetchedDate = database.ref('graph/temp/time');

fetchedData.on('value', (snapshot) => {
  const data = snapshot.val();
  const dataLength = data.length;

  // fetch timestamps from the database
  fetchedDate.limitToLast(dataLength).once('value', (snapshot) => {
    const dates = snapshot.val();
    const dateValues = Object.values(dates);

    // update the chart labels with the fetched timestamps
    chart.data.labels = dateValues;

    // update the chart data with the fetched temperatures
    chart.data.datasets[0].data = data;

    chart.update();
  });
});

fetchedData.orderByKey().limitToLast(10).on('value', (snapshot) => {
  var data = snapshot.val();
  dataArray = Object.values(data); // update the dataArray with the last 10 values
  console.log(dataArray);
  chart.data.datasets[0].data.splice(0, 9, ...dataArray); // update the chart's datasets with the updated dataArray
  chart.update();
});


fetchedData.on('child_added', (snapshot) => {
  const value = snapshot.val();
  const timestamp = new Date(parseInt(snapshot.key));
  const newData = { value, timestamp };
  dataArray.push(newData); // update the dataArray with the new data
  chart.data.datasets[0].data.push(value); // update the chart's datasets with the updated dataArray
  chart.data.labels.push(timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // update the chart's labels with the updated dataArray
  chart.update();
});

const ctx = document.getElementById('myChartTemp').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature',
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