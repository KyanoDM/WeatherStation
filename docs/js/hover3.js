const bigCard2 = document.querySelector('.big-card2');
const smallCard2 = document.querySelector('.small-card2');

// Define a function to handle the click event
function handleCardClick2(event) {
  const clickedCard2 = event.currentTarget;

  // Check if the event target is not the card itself
  if (event.target !== clickedCard2) {
    return;
  }

  // If the clicked card is already big, do nothing
  if (clickedCard2.classList.contains('big-card2')) {
    return;
  }

  // Find the current big card
  const currentBigCard2 = document.querySelector('.big-card2');

  // Toggle the 'big-card' and 'small-card' class names on the clicked card
  clickedCard2.classList.toggle('big-card2');
  clickedCard2.classList.toggle('small-card2');

  // Toggle the 'big-card' and 'small-card' class names on the current big card
  currentBigCard2.classList.toggle('big-card2');
  currentBigCard2.classList.toggle('small-card2');
}

// Add the click event listener to both cards
bigCard2.addEventListener('click', handleCardClick2);
smallCard2.addEventListener('click', handleCardClick2);

function handleChartClick2(event) {
  const clickedChart2 = event.currentTarget;
  const clickedCard2 = clickedChart2.parentElement;

  // Trigger a click event on the parent card element
  clickedCard2.click();
}

const chartCanvases2 = document.querySelectorAll('canvas');
chartCanvases2.forEach(canvas => {
  canvas.addEventListener('click', handleChartClick2);
});
