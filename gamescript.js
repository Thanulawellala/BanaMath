//chatgpt
//help from collegues
//github

let timer;
let initialTime = 90; 
let timeLeft = initialTime;
let currentTimerValue = initialTime;
let score = 0;
let lives = 3;
let puzzleSolution = null; 
let questionNumber = 1; 


async function fetchImage() {
    console.log('Fetching new image...')
    try {
        const response = await fetch('proxy.php');  
        const data = await response.json();

        if (!data.question || !data.solution) {
            console.error('Invalid response data:', data);
            return;
        }

        
        const imageUrl = data.question;  
        puzzleSolution = parseInt(data.solution, 10); 

        
        const puzzleImage = document.getElementById('puzzle-image');
        puzzleImage.src = imageUrl;  

    } catch (error) {
        console.error('Error fetching image:', error);  
    }
}


function startTimer() {
    clearInterval(timer); 
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            showToast('Time is up!');
            reduceLifeByTimeout(); 
        } else {
            document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
            if (timeLeft <= 10) {
                showToast(`Hurry up! Only ${timeLeft} seconds left.`);
            }
            timeLeft--;
        }
    }, 1000);
}


function getTimerValue() {
    if (questionNumber === 1) return 90;
    if (questionNumber === 2) return 70;
    if (questionNumber === 3) return 50;
    if (questionNumber === 4) return 40;
    if (questionNumber === 5) return 30;
    return 20; 
}


function resetForNewQuestion() {
    currentTimerValue = getTimerValue(); 
    timeLeft = currentTimerValue;
    document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
    fetchImage(); 
    startTimer(); 
}


function resetForLifeLoss() {
    timeLeft = 60; 
    document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
    fetchImage(); 
    startTimer(); 
}


function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    if (userAnswer === puzzleSolution) {
        score += 5; 
        showToast('Correct! Moving to the next puzzle.');
        questionNumber++;
        document.querySelector('.question-number').innerText = `Q${questionNumber}`;
        resetForNewQuestion(); 
    } else {
        showToast('Wrong answer! Try again.');
        questionNumber++;
        document.querySelector('.question-number').innerText = `Q${questionNumber}`;
        reduceLifeByWrongAnswer();
    }
    updateScoreAndLives();  
}


function reduceLife() {
    lives--;
    const hearts = document.querySelectorAll('.heart');
    const emptyHeartUrl = 'images/empty_heart_icon.png';  

    if (lives <= 2) {
        hearts[2].style.backgroundImage = `url(${emptyHeartUrl})`;
    }
    if (lives <= 1) {
        hearts[1].style.backgroundImage = `url(${emptyHeartUrl})`;
    }
    if (lives <= 0) {
        hearts[0].style.backgroundImage = `url(${emptyHeartUrl})`;
        clearInterval(timer); 

        
        sendFinalScore();

        
        showGameOverModal();

        
        
    }
}



function reduceLifeByWrongAnswer() {
    reduceLife(); 
    if (lives > 0) {
        resetForNewQuestion(); 
    }
}


function reduceLifeByTimeout() {
    reduceLife(); 
    if (lives > 0) {
        resetForLifeLoss(); 
    }
}


function updateScoreAndLives() {
    document.querySelector('.score').innerText = `Score: ${score}`;
    document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
}


function initializeGame() {
     
    resetForNewQuestion(); 
    updateScoreAndLives(); 
    document.querySelector('.question-number').innerText = `Q${questionNumber}`;
}


document.querySelector('.button').addEventListener('click', () => {
    checkAnswer(); 
    document.getElementById('answer').value = ''; 
});
function sendFinalScore() {
    fetch('update_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `score=${score}`, 
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Score updated successfully:', data.message);
            } else {
                console.error('Failed to update score:', data.message);
            }
        })
        .catch(error => {
            console.error('Error sending score:', error);
        });
}


function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    const message = document.getElementById('gameOverMessage');
    const scoreMessage = document.getElementById('finalScoreMessage');
    message.innerText = `Game Over! Your final score is:`;
    scoreMessage.innerText = score;

    modal.style.display = "block";   

     
    setTimeout(() => {
        window.location.href = "leaderboardfront.php";
    }, 5000);
}


function closeModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = "none"; 
}


function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show'); 
    }, 3000);
}
function checkLoginStatus() {
    const playerName = getCookie('playerName');
    if (!playerName) {
        alert("You are not logged in. Redirecting to login page.");
        window.location.href = 'continue.php';
    } else {
        console.log(`Welcome back, ${playerName}!`);
    }
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") == 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return null;
}

window.onload = checkLoginStatus;


document.addEventListener('DOMContentLoaded', initializeGame);


