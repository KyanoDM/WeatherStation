document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.updbut');
    const slider = document.querySelector('#slider');
   
    const database = firebase.database();
    var ref = database.ref('Datastate');
    
    button.addEventListener('click', () => {
      const sliderValue = parseInt(slider.value);
      ref.set(sliderValue);
    });
  });
  