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
const cardsData = [
  {
    question: 'What is the forEach() method?',
    answer:
      'Executes a provided callback function once for each value in Array, Map (made up of key-value pairs), Set, NodeList (an array-like object often returned by Document.querySelectorAll()), or HTMLCollection (an array-like object often returned by Document.getElementsByClassName()) objects, in ascending order (ES5).',
  },
  {
    question: 'What is a for-in statement?',
    answer:
      'Creates a loop that iterates over all non-Symbol, enumerable properties of an object, sometimes in an arbitrary order.',
  },
  {
    question: 'What is a for-of statement?',
    answer:
      'Creates a loop that iterates over iterable objects (see below for clarification) in iterable order. A common use is looping through values in an array, but it also works on most array-like objects.',
  },
];

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

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);
}

createCards();
