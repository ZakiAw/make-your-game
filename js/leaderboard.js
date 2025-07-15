

// leaderboard.js
window.onload = function() {
    const scores = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const leaderboardDiv = document.getElementById('leaderboard');
    if (!leaderboardDiv) return;

    if (scores.length === 0) {
        leaderboardDiv.innerHTML = "<p>No scores yet!</p>";
        return;
    }

    // Only show the top 10 scores
    const topScores = scores.slice(0, 10);

    let html = "<ol>";
    for (const entry of topScores) {
        html += `<li>${entry.name}: ${entry.score}</li>`;
    }
    html += "</ol>";
    leaderboardDiv.innerHTML = html;
};
