const questionAPI = 'http://jservice.io/api/random';
let currentQuestion;
let parsedAnswer;

const lettersContainer = document.querySelector('.letters');
const answerContainer = document.querySelector('.answer-block');

function getQuestion() {
  fetch(questionAPI)
    .then(response => response.json())
    .catch(e => console.log(e))
    .then(data => {
      currentQuestion = data[0];
      parseAnswer();
      updateView();
      logAnswer();
      clearLetters();
      showLetters();
    });
}

function parseAnswer() {
  currentQuestion.answer = currentQuestion.answer
    .replace(/<i>/g, '')
    .replace(/<\/i>/g, '')
    .replace(/\\/g, '')
    .replace(/"/g, '')
    .replace(/\(.*\)/g, '')
    .replace(/  /g, ' ')
    .replace(/\/.*/g, '')
    .trim();

    //remove all after comas?
}

function updateView() {
  const categoryEl = document.querySelector('.q-category');
  const questionEl = document.querySelector('.q-question');

  categoryEl.textContent = `(category: ${currentQuestion.category.title})`;
  questionEl.textContent = currentQuestion.question;
}

function logAnswer() {
  console.log(currentQuestion.answer);
}

function showLetters () {
  //TODO: shuffle answer

  for (let char of currentQuestion.answer) {
    const button = document.createElement('a');
    button.classList.add('waves-effect', 'waves-grey', 'btn-flat', 'letter', 'valign');
    const letter = document.createTextNode(char);
    button.appendChild(letter);
    button.addEventListener('click', moveLetterToAnswer, { once: true });
    lettersContainer.appendChild(button);
  }
}

function moveLetterToAnswer(e) {
  const targetLetter = e.target;

  answerContainer.appendChild(targetLetter);
  targetLetter.addEventListener('click', moveLetterFromAnswer, { once: true });

  checkAnswer();
}

function checkAnswer() {
  let userAnswer = '';

  for (let child of answerContainer.children) {
    child.innerText ? userAnswer += child.innerText : userAnswer += ' ';
  }

  if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    console.log('YOU WON!');
  }
}

function moveLetterFromAnswer(e) {
  const targetLetter = e.target;

  lettersContainer.appendChild(targetLetter);
  targetLetter.addEventListener('click', moveLetterToAnswer, { once: true });
}

function clearLetters() {
  while (lettersContainer.firstChild) {
    lettersContainer.removeChild(lettersContainer.firstChild);
  }

  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

getQuestion();

