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
    });
});
