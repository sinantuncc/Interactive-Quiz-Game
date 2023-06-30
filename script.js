"use strict";

// define variables

let remember = 0; // remember current question index

const userAnswers = [];

const gameSection = document.querySelector(".game-section");

let data;

let message = document.querySelector(".message");

const answerBtn = document.querySelector("#answer");

// get data

const getQuestions = async () => {
  try {
    const response = await fetch("questions.json"); // from  questions.json file
    const result = await response.json(); // data ready
    data = result;
    displayQuestions();
  } catch (error) {
    console.log(error);
  }
};

function startGame() {
  // hidden start screen

  const startSection = document.querySelector(".start-section");

  startSection.classList.add("d-none");

  // show game screen

  gameSection.classList.remove("d-none");

  // start get data

  getQuestions();
}

const displayQuestions = (isShowAnswer = false, newData = null) => {
  if (newData) data = newData;

  if (data.length > remember) {
    const question = document.querySelector("#question");

    const answers = document.getElementsByTagName("label");

    question.textContent = remember + 1 + ")  " + data[remember]["question"];

    const ans = data[remember]["answers"];

    Object.entries(ans).forEach((value, index) => {
      answers[index].textContent = value[0].toUpperCase() + ") " + value[1];
    });

    if (isShowAnswer) message.textContent = data[remember]["correct_answer"];
  } else {
    showResults();
  }
};

document.querySelector("#buttons").addEventListener("click", (event) => {
  let choice = document.querySelector('input[name="answer"]:checked');

  switch (event.target.id) {
    case "skip":
      skip(choice);
      break;
    case "answer":
      answer(choice);
      break;
    case "showAnswer":
      showAnswer();
      break;
    case "newGame":
      newGame();
      break;
  }
});

function answer(choice) {
  if (choice) {
    userAnswers.push(choice.value);
    remember++;
    displayQuestions();
    choice.checked = false;
  } else {
    message.textContent = "Choice a option or skip";
  }
}

function skip(choice) {
  userAnswers.push(null);
  if (choice) choice.checked = false;

  remember++;
  displayQuestions();

  message.textContent = "";
  answerBtn.disabled = false;
}
function showAnswer() {
  displayQuestions(true);

  answerBtn.disabled = true;
}

const showResults = () => {
  const [correctAnswer, wrongAnswer, blankAnswer] = [[], [], []];

  let i;
  for (i = 0; i < data.length; i++) {
    if (userAnswers[i] === data[i]["correct_answer"]) {
      correctAnswer.push(data[i].id);
    }
    if (
      userAnswers[i] !== data[i]["correct_answer"] &&
      userAnswers[i] !== null
    ) {
      wrongAnswer.push(data[i].id);
    }
    if (userAnswers[i] === null) {
      blankAnswer.push(data[i].id);
    }
  }

  let text = `
 "Game Over!"
 
 Scores

 Total Question: ${data.length} <br>
 Correct Answer: ${correctAnswer.length} :> ${correctAnswer} <br>
 Wrong Answer  : ${wrongAnswer.length}  :>  ${wrongAnswer} <br>
 Blank Answer  : ${blankAnswer.length}  :> ${blankAnswer} <br>

 `;

  gameSection.innerHTML = text;
};

const newGame = () => {
  remember = 0;
  const newData = [];

  let i = 10;

  while (i) {
    let random = Math.floor(Math.random() * 10);
    let newItem = data[random];

    if (!newData.includes(newItem)) {
      newData.push(newItem);
      i--;
    }
  }

  displayQuestions(false, newData);
};
