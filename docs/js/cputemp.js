document.addEventListener("DOMContentLoaded", function () {
    var database = firebase.database();

    // Get the date from the database
    var dateRef = database.ref('Settings/Tempcpu');
    dateRef.on('value', function (snapshot) {
        var temp = snapshot.val();
        document.getElementById("cputemp").innerHTML = temp;
    });
});
