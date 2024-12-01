let timer;
let initialTime = 60; // Starting time for the first question
let timeLeft = initialTime;
let currentTimerValue = initialTime;
let score = 0;
let lives = 3;
let puzzleSolution = null; // Variable to store the solution
let questionNumber = 1; // Start from question 1

// Fetch the puzzle image and solution
async function fetchImage() {
    try {
        const response = await fetch('proxy.php');  // Call your server-side proxy
        const data = await response.json();

        if (!data.question || !data.solution) {
            console.error('Invalid response data:', data);
            return;
        }

        // Fetch the image URL and solution
        const imageUrl = data.question;  // URL of the image from the API
        puzzleSolution = parseInt(data.solution, 10); // Convert the solution to an integer

        // Update the puzzle image on the page
        const puzzleImage = document.getElementById('puzzle-image');
        puzzleImage.src = imageUrl;  // Dynamically set the image source

    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

// Start the timer
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            showToast('Time is up!');
            reduceLifeByTimeout(); // Handle life loss due to timeout
        } else {
            document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
            if (timeLeft <= 10) {
                showToast(`Hurry up! Only ${timeLeft} seconds left.`);
            }
            timeLeft--;
        }
    }, 1000);
}

// Get timer value based on the question number
function getTimerValue() {
    if (questionNumber === 1) return 60;
    if (questionNumber === 2) return 50;
    if (questionNumber === 3) return 40;
    if (questionNumber === 4) return 30;
    if (questionNumber === 5) return 20;
    return 10; // From the 6th question onwards, timer is always 10 seconds
}

// Reset the game state for a new question
function resetForNewQuestion() {
    currentTimerValue = getTimerValue(); // Adjust timer based on question number
    timeLeft = currentTimerValue;
    document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
    fetchImage(); // Load a new puzzle
    startTimer(); // Start the timer
}

// Reset the clock and timer for a life loss
function resetForLifeLoss() {
    timeLeft = 60; // Reset to 60 seconds on life loss
    document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
    fetchImage(); // Load a new puzzle
    startTimer(); // Restart the timer
}

// Check the answer and update the game state
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value, 10);
    if (userAnswer === puzzleSolution) {
        score += 5; // Increment score for a correct answer
        showToast('Correct! Moving to the next puzzle.');
        questionNumber++;
        document.querySelector('.question-number').innerText = `Q${questionNumber}`;
        resetForNewQuestion(); // Reset the game for the next question
    } else {
        showToast('Wrong answer! Try again.');
        questionNumber++;
        document.querySelector('.question-number').innerText = `Q${questionNumber}`;
        reduceLifeByWrongAnswer();
    }
    updateScoreAndLives();
}

// Reduce a life and update the heart icons
// Reduce a life and update the heart images
function reduceLife() {
    lives--;
    const hearts = document.querySelectorAll('.heart');
    const emptyHeartUrl = 'images/empty_heart_icon.png';  // Path to the empty heart image

    if (lives <= 2) {
        hearts[2].style.backgroundImage = `url(${emptyHeartUrl})`;
    }
    if (lives <= 1) {
        hearts[1].style.backgroundImage = `url(${emptyHeartUrl})`;
    }
    if (lives <= 0) {
        hearts[0].style.backgroundImage = `url(${emptyHeartUrl})`;
        clearInterval(timer); // Stop the timer

        // Send final score to the server
        sendFinalScore();

        // Show Game Over alert
        showGameOverModal();

        
        
    }
}


// Handle life loss due to wrong answer
function reduceLifeByWrongAnswer() {
    reduceLife(); // Shared logic for life reduction
    if (lives > 0) {
        resetForNewQuestion(); // Proceed to the next question
    }
}

// Handle life loss due to timeout
function reduceLifeByTimeout() {
    reduceLife(); // Shared logic for life reduction
    if (lives > 0) {
        resetForLifeLoss(); // Restart the current question with a reset timer
    }
}

// Update the score and lives display
function updateScoreAndLives() {
    document.querySelector('.score').innerText = `Score: ${score}`;
    document.querySelector('.timer').innerText = `Time Remaining: ${timeLeft}`;
}

// Initialize the game
function initializeGame() {
    fetchImage(); // Load the first puzzle
    resetForNewQuestion(); // Reset for the first question
    updateScoreAndLives(); // Update the initial score and lives
    document.querySelector('.question-number').innerText = `Q${questionNumber}`;
}

// Event listener for the "Submit Answer" button
document.querySelector('.button').addEventListener('click', () => {
    checkAnswer(); // Check the answer when the button is clicked
    document.getElementById('answer').value = ''; // Clear the input field
});
function sendFinalScore() {
    fetch('update_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `score=${score}`, // Send the score as a POST parameter
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

// Function to show game over modal
function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    const message = document.getElementById('gameOverMessage');
    const scoreMessage = document.getElementById('finalScoreMessage');
    message.innerText = `Game Over! Your final score is:`;
    scoreMessage.innerText = score;

    modal.style.display = "block"; // Show the modal

     //Optional: You can add a timeout to close the modal after a while (e.g., 5 seconds)
    // If you want it to disappear automatically after 5 seconds, uncomment this:
    setTimeout(() => {
         closeModal(); // Close after 5 seconds
     }, 5000);
}

// Function to close the modal when the user clicks the close button
function closeModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = "none"; // Hide the modal
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

function showInlineNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.visibility = 'visible';
    setTimeout(() => {
        notification.style.visibility = 'hidden';
    }, 3000);
}
window.onload = initializeGame;
