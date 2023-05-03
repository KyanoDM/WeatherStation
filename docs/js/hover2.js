const bigCard = document.querySelector('.big-card');
const smallCards = document.querySelectorAll('.small-card');

// Define a function to handle the click event
function handleCardClick(event) {
  const clickedCard = event.currentTarget;

  // Check if the event target is not the card itself
  if (event.target !== clickedCard) {
    return;
  }

  // If the clicked card is already big, do nothing
  if (clickedCard.classList.contains('big-card')) {
    return;
  }

  // Find the current big card
  const currentBigCard = document.querySelector('.big-card');

  // Toggle the 'big-card' and 'small-card' class names on the clicked card
  clickedCard.classList.toggle('big-card');
  clickedCard.classList.toggle('small-card');

  // Toggle the 'big-card' and 'small-card' class names on the current big card
  currentBigCard.classList.toggle('big-card');
  currentBigCard.classList.toggle('small-card');
}

// Add the click event listener to all three cards
bigCard.addEventListener('click', handleCardClick);
smallCards.forEach(card => {
  card.addEventListener('click', handleCardClick);
});

function handleChartClick(event) {
  const clickedChart = event.currentTarget;
  const clickedCard = clickedChart.parentElement;

  // Trigger a click event on the parent card element
  clickedCard.click();

  const chartCanvases = document.querySelectorAll('canvas');
  chartCanvases.forEach(canvas => {
    canvas.addEventListener('click', handleChartClick);
  });

}

const chartCanvases = document.querySelectorAll('canvas');
chartCanvases.forEach(canvas => {
  canvas.addEventListener('click', handleChartClick);
});