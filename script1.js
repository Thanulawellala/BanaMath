document.addEventListener("DOMContentLoaded", () => {
    const leaderboardContainer = document.getElementById('leaderboard-container'); 

    fetch('leaderboardfront.php')  //chatgpt
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.text(); 
        })
        .then(data => {
            leaderboardContainer.innerHTML = data; 
        })
        .catch(error => {
            console.error('Error fetching leaderboard data:', error);
            leaderboardContainer.innerHTML = '<p>Error loading leaderboard. Please try again later.</p>';
        });
});
function restartGame() {
    
    window.location.href = 'gamescreen.php'; 
    
    
}

