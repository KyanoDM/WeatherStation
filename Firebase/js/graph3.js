const firebaseConfig3 = {
  apiKey: "AIzaSyCG-BjnGE1V3X_18oxB325QroJ4UNftec83",
  authDomain: "weatherdata-a36d3.firebaseapp.com",
  databaseURL: "https://weatherdata-a36d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weatherdata-a36d3",
  storageBucket: "weatherdata-a36d3.appspot.com",
  messagingSenderId: "2375287177923",
  appId: "1:237528717792:web:7ef4f5049fbc381e04b3853",
  measurementId: "G-VTTYPK4W1N3"
};

let dataArray3 = [{ value3: 0, timestamp3: new Date() }]; // initialize dataArray3 with an object containing temperature value3 and timestamp3
if (firebase.apps.length === 0) { // check if Firebase app has already been initialized
  firebase.initializeApp(firebaseConfig3);
}
const database3 = firebase.database();
const fetchedData3 = database3.ref('graph/pres');
const fetchedDate3 = database3.ref('graph/time');

fetchedData3.on('value', (snapshot3) => {
  const data3 = snapshot3.val();
  const dataLength3 = data3.length;

  // fetch timestamps3 from the database
  fetchedDate3.limitToLast(dataLength3).once('value', (snapshot3) => {
    const dates3 = snapshot3.val();
    const dateValues3 = Object.values(dates3);

    // update the chart labels with the fetched timestamps3
    chart3.data.labels = dateValues3;

    // update the chart data with the fetched temperatures
    chart3.data.datasets[0].data = data3;

    chart3.update();
  });
});

fetchedData3.orderByKey().limitToLast(10).on('value', (snapshot3) => {
  var data3 = snapshot3.val();
  dataArray3 = Object.values(data3); // update the dataArray3 with the last 10 values
  chart3.data.datasets[0].data.splice(0, 9, ...dataArray3); // update the chart's datasets with the updated dataArray3 
  chart3.update();
});

fetchedData3.on('child_added', (snapshot3) => {
  const value3 = snapshot3.val();
  const timestamp3 = new Date(parseInt(snapshot3.key));
  const newData3 = { value3, timestamp3 };
  dataArray3.push(newData3); // update the dataArray3 with the new data
  chart3.data.datasets[0].data.push(value3); // update the chart's datasets with the updated dataArray3
  chart3.data.labels.push(timestamp3.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // update the chart's labels with the updated dataArray3
  chart3.update();
});

const ctx3 = document.getElementById('myChartPres').getContext('2d');
const chart3 = new Chart(ctx3, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(0, 128, 0, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {}
    }
  }
});
