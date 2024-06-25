document.addEventListener('DOMContentLoaded', function () {
    const gameDropdown = document.getElementById('gameDropdown');
    const gameTitle = document.querySelector('h6[data-testid="standard-game-card-title"]');
    const gameImages = [
        document.querySelector('#game0 img'),
        document.querySelector('#game1 img'),
        document.querySelector('#game2 img'),
        document.querySelector('#game3 img')
    ];

    let gameData = [];

    // Fetch and populate the dropdown with game names
    fetch('game_recommendations.json')
        .then(response => response.json())
        .then(data => {
            gameData = data;
            data.forEach(entry => {
                const option = document.createElement('option');
                option.value = entry.GameName;
                option.textContent = entry.GameName;
                gameDropdown.appendChild(option);
            });
    })
    .catch(error => console.error('Error loading JSON:', error));

    // Add event listener to update the h6 text and images when a game is selected
    gameDropdown.addEventListener('change', function () {
        const selectedGame = gameDropdown.value;
        if (selectedGame) {
            gameTitle.textContent = "Because You Played ${selectedGame}";
            const selectedGameData = gameData.find(game => game.GameName === selectedGame);
            if (selectedGameData && selectedGameData.Recommendations) {
                selectedGameData.Recommendations.forEach((url, index) => {
                    if (gameImages[index]) {
                        gameImages[index].src = url;
                    }
                });
            }
        } else {
            gameTitle.textContent = "Because You Played";
            gameImages.forEach(img => img.src = '');
        }
    });
});