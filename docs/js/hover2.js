const bigCard = document.querySelector('.big-card');
const smallCards = document.querySelectorAll('.small-card');
const chartCanvases = document.querySelectorAll('canvas');
const mainChartsContainer = document.getElementById('MainCharts');

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

// Define a function to handle chart click event
function handleChartClick(event) {
  console.log(window.innerWidth);
  const clickedChart = event.currentTarget;
  const clickedCard = clickedChart.parentElement;

  // Trigger a click event on the parent card element
  clickedCard.click();
}

// Define a function to check the screen size and enable/disable the script
function checkScreenSize() {
  if (window.innerWidth < 1500) {
    // Remove 'big-card' and 'small-card' classes and apply 'maingraphs' class
    bigCard.classList.remove('big-card');
    smallCards.forEach(card => {
      card.classList.remove('small-card');
    });
    bigCard.classList.add('maingraphs');
    smallCards.forEach(card => {
      card.classList.add('maingraphs');
    });

    // Remove class 'container' from the main charts container
    mainChartsContainer.classList.remove('container');
    mainChartsContainer.classList.add('row');
    // Remove event listeners for card clicks
    bigCard.removeEventListener('click', handleCardClick);
    smallCards.forEach(card => {
      card.removeEventListener('click', handleCardClick);
    });

    // Add event listeners for chart clicks
    chartCanvases.forEach(canvas => {
      canvas.addEventListener('click', handleChartClick);
    });
  } else {
    // Add 'big-card' and 'small-card' classes and remove 'maingraphs' class
    bigCard.classList.add('big-card');
    smallCards.forEach(card => {
      card.classList.add('small-card');
    });
    bigCard.classList.remove('maingraphs');
    smallCards.forEach(card => {
      card.classList.remove('maingraphs');
    });

    // Add class 'container' to the main charts container
    mainChartsContainer.classList.add('container');
    mainChartsContainer.classList.remove('row');
    // Add event listeners for card clicks
    bigCard.addEventListener('click', handleCardClick);
    smallCards.forEach(card => {
      card.addEventListener('click', handleCardClick);
    });

    // Remove event listeners for chart clicks
    chartCanvases.forEach(canvas => {
      canvas.removeEventListener('click', handleChartClick);
    });
  }
}

// Initial check of screen size
checkScreenSize();

// Add event listener to check for screen size changes
window.addEventListener('resize', checkScreenSize);
