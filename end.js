const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 10;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup',() => {
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
  e.preventDefault();

  const mostRecentScore = localStorage.getItem('mostRecentScore'); // Retrieve the most recent score
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value.trim(); // Trim whitespace from the username

  if (username !== '') {
    const score = {
      score: mostRecentScore,
      name: username
    };

    let highScores = JSON.parse(localStorage.getItem('highScores')) || []; // Retrieve existing high scores or initialize an empty array
    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10); // Keep only the top 10 scores

    localStorage.setItem('highScores', JSON.stringify(highScores)); // Save the updated high scores to localStorage

    window.location.assign('/'); // Redirect to the home page or any other desired page
  } else {
    alert('Please enter a valid username.'); // Alert the user if the username is empty
  }
};
