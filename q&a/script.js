const apiUrl = 'https://opentdb.com/api_category.php';
const categoryUrl = 'https://opentdb.com/api.php?amount=10&category=';

const questionListContainer = document.getElementById('question-list');
const leftButton = document.getElementById('left-button');
const centralButton = document.getElementById('central-button');
const rightButton = document.getElementById('right-button');

async function runMain() {
  const arrayOfCategories = await fetchData(apiUrl);
  const { leftButtonId, centralButtonId, rightButtonId } = placeCategoryNamesIntoButtons(arrayOfCategories.trivia_categories);
  leftButton.addEventListener('click', () => {
    displayQuestions(leftButtonId);
  });
  centralButton.addEventListener('click', () => {
    displayQuestions(centralButtonId);
  });
  rightButton.addEventListener('click', () => {
    displayQuestions(rightButtonId);
  });
}

window.addEventListener('load', runMain);

async function fetchData(url, id = '') {
  try {
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Oh no! ${error.message}`);
  }
}

async function displayQuestions(id) {
  const response = await fetchData(categoryUrl, id);
  const arrayOfQuestionsAndAnswers = response.results;
  questionListContainer.innerHTML = '';
  arrayOfQuestionsAndAnswers.forEach(element => {
    const container = createContainer();
    createQuestionLabel(element.question, container);
    createAnswerLabel(element.correct_answer, container);
  })
}

function createContainer() {
  const container = document.createElement('div');
  container.classList.add('question-container');
  questionListContainer.appendChild(container);
  return container;
}

function createQuestionLabel(question, container) {
  const questionLabel = document.createElement('span');
  questionLabel.classList.add('question-label');
  questionLabel.innerHTML = question;
  container.appendChild(questionLabel);
}

function createAnswerLabel(answer, container) {
  const answerLabel = document.createElement('span');
  answerLabel.classList.add('answer-label');
  answerLabel.innerHTML = answer;
  container.appendChild(answerLabel);
}

function placeCategoryNamesIntoButtons(array) {
  const [leftButtonIndex, centralButtonIndex, rightButtonIndex] = getRandomIndex(array);
  const leftButtonId = array[leftButtonIndex].id;
  leftButton.innerText = array[leftButtonIndex].name;
  const centralButtonId = array[centralButtonIndex].id;
  centralButton.innerText = array[centralButtonIndex].name;
  const rightButtonId = array[rightButtonIndex].id;
  rightButton.innerText = array[rightButtonIndex].name;
  return { leftButtonId, centralButtonId, rightButtonId }
}

function getRandomIndex(array) {
  const arrayOfRandomIndexes = [];
  for (let i = 0; arrayOfRandomIndexes.length < 3; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!arrayOfRandomIndexes.includes(randomIndex)) {
      arrayOfRandomIndexes.push(randomIndex);
    } else {
      continue;
    }
  }
  return arrayOfRandomIndexes;
}
