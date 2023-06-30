"use strict";

// define variables

let remember = 0;
const userAnswers = [];
// end

const gameSection = document.querySelector(".game-section");

// start game

const getQuestions = async () => {
  try {
    const response = await fetch("questions.json"); // from local questions.json file
    const data = await response.json(); // data ready

    displayQuestions(data);
  } catch (error) {
    console.log(error);
  }
};

function startGame() {
  // hidden start screen

  document.querySelector(".start-section").classList.add("d-none");

  //e.target.classList.add("d-none");

  // show game screen

  gameSection.classList.remove("d-none");

  // start get data

  getQuestions();
}

const displayQuestions = (data) => {
  if (data.length) {
    /*
    [
       0:{
        "id": 1,
        "question": "2 + 2 = ?",
        "answers": {
            "a": "1",
            "b": "2",
            "c": "4",
            "d": "5"
        },
        "correct_answer": "c"
    },
    ]
   */

    const question = document.querySelector("#question");

    const answers = document.getElementsByTagName("label");


    question.textContent = remember+1 + ")  " + data[remember]["question"];

    const ans = data[remember]["answers"];



    Object.entries(ans).forEach((value, index, array)=>{
      answers[index].textContent =value[0].toUpperCase() + ") " + value[1];
    })

    

  } else {
    gameSection.textContent = "Not found data!";
  }
};

function handleSubmit(e){
  e.preventDefault();
  console.log(e);
}
