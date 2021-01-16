const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data (will place in session storage later)
const cardsData = getCardsData();

// const cardsData = [
//   {
//     question: 'What is the forEach() method?',
//     answer:
//       'Executes a provided callback function once for each value in Array, Map (made up of key-value pairs), Set, NodeList (an array-like object often returned by Document.querySelectorAll()), or HTMLCollection (an array-like object often returned by Document.getElementsByClassName()) objects, in ascending order (ES5).',
//   },
//   {
//     question: 'What is a for-in statement?',
//     answer:
//       'Creates a loop that iterates over all non-Symbol, enumerable properties of an object, sometimes in an arbitrary order.',
//   },
//   {
//     question: 'What is a for-of statement?',
//     answer:
//       'Creates a loop that iterates over iterable objects (see below for clarification) in iterable order. A common use is looping through values in an array, but it also works on most array-like objects.',
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM (data is object)
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  // Add class `active` to first card
  index === 0 && card.classList.add('active');

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
      <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
      <p>${data.answer}</p>
    </div>
  </div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show card number out of total cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from session storage
function getCardsData() {
  // session storage only stores strings - will stringify array of cards and store it - but when extracting it from storage need to parse it back into an array
  const cards = JSON.parse(sessionStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add cards to session storage
function setCardsData(cards) {
  sessionStorage.setItem('cards', JSON.stringify(cards));
  // Though added to session storage, won't reflect in DOM; reloading page as workaround
  window.location.reload();
}

createCards();

function nextCard() {
  // Hide the card by moving it to the left (notice it only has left class for a moment, achieving the CSS effect - below left is changed to active)
  // With className, overwriting existing class(es); that's why need to include card
  cardsEl[currentActiveCard].className = 'card left';

  // Get new card index (next one)
  currentActiveCard = currentActiveCard + 1;

  // Stay within range of total cards
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
}

function prevCard() {
  cardsEl[currentActiveCard].className = 'card';

  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
}

// Event listeners

// Next button
nextBtn.addEventListener('click', nextCard);

// Prev button
prevBtn.addEventListener('click', prevCard);

// Allow use of left/right arrow keys to navigate cards
window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowRight') {
    nextCard();
  }

  if (e.code === 'ArrowLeft') {
    prevCard();
  }
});

// Show add card form
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide add card form
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add new card
addCardBtn.addEventListener('click', () => {
  // .value because it's an input
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});
