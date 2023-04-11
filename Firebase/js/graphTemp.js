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

var dataArray = [10];
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
var fetchedData = database.ref('graph/temp');
var fetchedDate = database.ref('graph/time');

database.ref('graph/temp').limitToLast(10).once('value', (snapshot) => {
  var data = snapshot.val();
  dataArray = data; // update the dataArray with the last 10 values
  console.log(dataArray);
  chart.data.datasets[0].data.splice(0, 9, ...dataArray); // update the chart's datasets with the updated dataArray
  chart.update();
});


fetchedData.on('value', (snapshot) => {
  var data = snapshot.val();
  dataArray = data.slice(-10); // update the dataArray with the last 10 values
  console.log(dataArray);
  chart.data.datasets[0].data.splice(0, 9, ...dataArray); // update the chart's datasets with the updated dataArray
  chart.update();
});

const ctx = document.getElementById('myChart').getContext('2d');
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


let counter = 0;
const intervalId = setInterval(() => {
  if (counter >= 10) {
    chart.data.labels.shift(); // remove the first label
    for (let i = 0; i < 10; i++) {
      chart.data.datasets[0].data[i] = dataArray[i];
    }
    chart.data.datasets[0].data.pop(); // remove the last data point
  }
  chart.data.labels.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
  chart.data.datasets[0].data.push(dataArray[counter-1]);
  
  chart.update();
  counter++;
}, 10);
