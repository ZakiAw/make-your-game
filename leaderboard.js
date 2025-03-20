function updateLead(playerName, score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard.json'));

    leaderboard.push({ name: playerName, score: score });

    leaderboard.sort((a, b) => b.score - a.score);

    localStorage.setItem('leaderboard.json', JSON.stringify(leaderboard));
}
