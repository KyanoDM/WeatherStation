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

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig4);
}

const database4 = firebase.database();
const fetchedData4 = database4.ref('graph/windd');
const time4 = database4.ref('graph/time');

// Get the container element
const container = document.getElementById('wind-direction');

// Attach a listener to the data and update the divs when the data changes
fetchedData4.on('value', async (snapshot) => {
  const values = snapshot.val();

  // Clear the container before adding new divs
  container.innerHTML = '';

  // Retrieve the value of the "graph/time" reference
  const timeSnapshot = await time4.once('value');
  const timeValues = timeSnapshot.val();

  // Loop through each value and create a new div and image for each one
  for (const valueKey in values) {
    if (values.hasOwnProperty(valueKey)) {
      const value = values[valueKey];
      const timeValue = timeValues[valueKey];

      const div = document.createElement('div');
      div.className = 'box';

      const text = document.createElement('div');
      const img = document.createElement('img');
      text.innerHTML = `${value}<br><img class="Richting" src="img/${value}.png"><br>${timeValue}`;
      div.appendChild(text);

      container.appendChild(div);
    }
  }
});
