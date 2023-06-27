const startGame = () => {
    getQuestions();
};

const getQuestions = async () => {
  try {
    const response = await fetch("file1.json");
    const data = await response.json();

    displayQuestions(data);
  } catch (error) {
    console.log(error);
  }
};

const displayQuestions = (data) => {
    
} 
    

  



//$response = Invoke-WebRequest -Uri "https://quizapi.io/api/v1/questions?apiKey=tEuVDyZu6iKOH9zOuZy35nkEaRRqvZopYYO4aIjc&limit=50&difficulty=easy" -Method "GET" -OutFile "file1.json"
