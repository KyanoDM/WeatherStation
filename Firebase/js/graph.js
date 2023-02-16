let humidity, pressure, temperature;
const firebaseConfig = {
  apiKey: "AIzaSyCG-BjnGE1V3X_18oxB325QroJ4UNftec8",
  authDomain: "weatherdata-a36d3.firebaseapp.com",
  databaseURL: "https://weatherdata-a36d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "weatherdata-a36d3",
  storageBucket: "weatherdata-a36d3.appspot.com",
  messagingSenderId: "237528717792",
  appId: "1:237528717792:web:7ef4f5049fbc381e04b385",
  measurementId: "G-VTTYPK4W1N"
}
var dataArray = [1]
firebase.initializeApp(firebaseConfig)
const database = firebase.database()
var fetchedData = database.ref('graph/temp')
fetchedData.on('value', (snapshot) => {
    var data = snapshot.val()
    
    data.forEach((value) => {
      dataArray.push(value)
    })
    console.log(dataArray)
  })
  
  
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
      y: {
        beginAtZero: true
      }
    }
  }
});
let counter = 0;
const intervalId = setInterval(() => {
  var randomNumber = Math.floor(Math.random() * 100);

  if (counter >= 10) {
    chart.data.labels.shift(); // remove the first label
    chart.data.datasets[0].data.shift(); // remove the first data point
  }
  chart.data.labels.push(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
  chart.data.datasets[0].data.push(dataArray[10]);
  chart.update();
  counter++;
}, 2000);