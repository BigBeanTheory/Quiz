const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('SaveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentStore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentStore + " Points";

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    e.preventDefault();
}