"use strict";

// define variables

let remember = 0; // remember current question index

const userAnswers = [];

const gameSection = document.querySelector(".game-section");


const getQuestions = async () => {
  try {
    const response = await fetch("questions.json"); // from  questions.json file
    const data = await response.json(); // data ready

    displayQuestions(data);
  } catch (error) {
    console.log(error);
  }
};

function startGame() {
  // hidden start screen

  document.querySelector(".start-section").classList.add("d-none");

  // show game screen

  gameSection.classList.remove("d-none");

  // start get data

  getQuestions();
}

const displayQuestions = (data) => {
  if (data.length > remember) {
    const question = document.querySelector("#question");

    const answers = document.getElementsByTagName("label");

    question.textContent = remember + 1 + ")  " + data[remember]["question"];

    const ans = data[remember]["answers"];

    Object.entries(ans).forEach((value, index) => {
      answers[index].textContent = value[0].toUpperCase() + ") " + value[1];
    });
  } else {
    gameSection.textContent = "Game Over!";
  }
};

let message = document.querySelector(".message");

document.querySelector("#buttons").addEventListener("click", (event) => {

  let choice = document.querySelector('input[name="answer"]:checked');

  switch (event.target.id) {
    case "skip":
      skip(choice);
      break;
    case "answer":
      answer(choice);
      break;
  }
});

function answer(choice) {
  if (choice) {
    userAnswers.push(choice.value);
    remember++;
    getQuestions();
    choice.checked = false;
  } else {
    message.textContent = "Choice a option or skip";
  }

  console.log(userAnswers);
}

function skip(choice) {
  userAnswers.push(null);
  if (choice) choice.checked = false;

  remember++;
  getQuestions();

  console.log(userAnswers);

}
