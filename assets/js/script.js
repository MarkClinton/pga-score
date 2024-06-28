/**
 * Wait for the DOM to finish loading before running the game.
 * get the button elements and add eventListeners to them.
 */
window.addEventListener('load', function () {
    let startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', startModal);
});

/**
 * The beginning of the game. Function to display a popup modal to capture
 * details from the user before playing.
 */
function startModal() {
    alert("Hello");
};