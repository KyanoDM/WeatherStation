document.addEventListener("DOMContentLoaded", function () {
    // Get the button element
    var button1 = document.querySelector("#lean");
    var button2 = document.querySelector("#sky");
    var button3 = document.querySelector("#sun");
  
    // When the button is clicked, change the background color of the body element
    button1.addEventListener("click", function () {
      document.body.style.backgroundColor = "#21D4FD";
      document.body.style['background-image'] = "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)";
    });

    button2.addEventListener("click", function () {
      document.body.style.backgroundColor = "#8BC6EC";
      document.body.style['background-image'] = "linear-gradient(180deg, #8BC6EC 0%, #9599E2 100%)";
    });
  
    button3.addEventListener("click", function () {
      document.body.style.backgroundColor = "#FBDA61";
      document.body.style['background-image'] = "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)";
    });
  });
  