document.addEventListener("DOMContentLoaded", function () {
    var database = firebase.database();
  
    // Get the windstate from the database
    var windStateRef = database.ref('Settings/Datastate');
    windStateRef.on('value', function (snapshot) {
      var windstate = snapshot.val();
      var title;
      if (windstate === 3) {
        title = "Wind Direction - Past 20 Hours";
      } else if (windstate === 2) {
        title = "Wind Direction - Past 10 Hours";
      } else if (windstate === 1) {
        title = "Wind Direction - Past 1 Hour";
      }
      document.getElementById("windr").innerHTML = title;
  
      var slider = document.getElementById('slider');
      slider.max = 3; // Set the maximum value explicitly to 3
      slider.step = 1; // Set the step value explicitly to 1
      slider.value = windstate; // Set the initial value of the slider
    });
  });
  