const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const inputError = document.getElementById('input-error');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
  // Usage:
  // > getRandomNumber(1, 50)
  // <- 32
  // > getRandomNumber(1, 50)
  // <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkGuess() {
  
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  // Input validation
  if (guess < 1) {
    inputError.textContent = `The number must be greater than 0!`;
    return;
  }  else if (guess > 99) {
    inputError.textContent = `The number must be less than 100!`;
    return;
  } else{
    inputError.textContent = ''; // Clear error message
  }
  attempts += 1;

  hideAllMessages();

  if (guess === targetNumber) {
    correctMessage.style.display = 'block';
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You guessed correctly!`;
    submitButton.disabled = true;
    guessInput.disabled = true;
    // RUNS ANIMATION IF USER GUESSES CORRECTLY
    // DISREGARD FOR NOW AND FINISH LATER
    // document.querySelector('main').classList.add('correct-animation');
  
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = 'block';
    } else {
      tooHighMessage.style.display = 'block';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br>${remainingAttempts} guess${remainingAttempts === 1 ? '' : 'es'} remaining`;
  }

  if (attempts >= maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    numberOfGuessesMessage.innerHTML = `0 guesses remaining`;
  }

  guessInput.value = '';

  resetButton.style.display = 'block';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get ram=ndom number
  targetNumber = getRandomNumber(1, 99);
console.log(`target number: ${targetNumber}`);
// Reset number of attempts
  attempts = 0;
// Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;
// Reset the numberOfGuessesMessage style before updating
  hideAllMessages();
  resetButton.style.display = 'none';
  numberOfGuessesMessage.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup()