document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.updbut');
    const slider = document.querySelector('#slider');

    button.addEventListener('click', () => {
        const sliderValue = slider.value;
        console.log(sliderValue);
    });
});