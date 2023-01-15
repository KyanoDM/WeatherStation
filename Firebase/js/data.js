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

firebase.initializeApp(firebaseConfig)
const database = firebase.database()
var fetchedData = database.ref('bme/')
fetchedData.on('value', (snapshot) => {
    var data = snapshot.val()
    var htmlData = ''
    
    let humidity, pressure, temperature;
    for (var key in data) {
        if (key === 'humidity') {
            humidity = data[key];
        }
        if (key === 'pressure') {
            pressure = data[key];
        }
        if (key === 'temperature') {
            temperature = data[key];
        }
    }
    var dataContainer = document.querySelector("#temp")
    htmlData +=`${temperature}`
    dataContainer.innerHTML = htmlData

    var dataContainer = document.querySelector("#hum")
    var htmlData = ''
    htmlData +=`${humidity}`
    dataContainer.innerHTML = htmlData

    var dataContainer = document.querySelector("#pres")
    var htmlData = ''
    htmlData +=`${pressure}`
    dataContainer.innerHTML = htmlData
})