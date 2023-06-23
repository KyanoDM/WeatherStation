document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('.updbut');
  const slider = document.querySelector('#slider');

  const database = firebase.database();
  var ref = database.ref('Settings/Datastate');

  button.addEventListener('click', () => {
    const sliderValue = parseInt(slider.value);
    ref.set(sliderValue);

    var modal = document.getElementById("modal");
    modal.style.display = "none";
  });
});
