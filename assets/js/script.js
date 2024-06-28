/**
 * Wait for the DOM to finish loading before running the game.
 * get the button element and add eventListeners to it.
 */
window.addEventListener('load', function () {
    let startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', startGame);
});

const card = document.getElementsByClassName('card');
card[0].addEventListener('click', flipCard);

function flipCard() {
    this.classList.toggle('flip');
}

/**
 * The beginning of the game. Function to display a popup modal to capture
 * details from the user before playing.
 */
function startModal() {
    alert("Hello");
};

function startGame() {

    addElementsToGameArea();

}

function addElementsToGameArea() {

    let cards = getPlayingCards();

    const [card, frontCard, backCard] = createElementsForGameArea();

    const gameArea = document.getElementsByClassName("game-area");
    const append = gameArea[0].appendChild(card.cloneNode());
    append.appendChild(frontCard.cloneNode());
    append.appendChild(backCard.cloneNode());
}

function getPlayingCards() {

    const listOfCards = [{
            src: "assets/images/back_of_card.jpg",
            alt: "PGA Golfer"
        },
        {
            src: "assets/images/golfers/john_daly.png",
            data: "daly",
            alt: "John Daly"
        }
    ];
    return listOfCards;
}

function createElementsForGameArea() {

    // Define all the elements that are going to be placed on the DOM

    // Specify a new card div to be created
    let createCardDiv = document.createElement("div");
    // // Add the card class to the div
    createCardDiv.classList.add("card");
    // Set the data attribute 
    // newCardDiv.dataset.card = Object.keys(cardContent)[1];

    // Create new img element for front of
    // card content to be placed inside the card div
    let frontOfCardContent = document.createElement("img");
    // Add the front-face class to the img
    frontOfCardContent.classList.add("front-face");
    // add the source to the img 
    //newCardContent.src = cardContent.jack;

    // Create new img element for back of
    // card content to be placed inside the card div
    let backOfCardContent = document.createElement("img");
    // Add the back-face class to the img
    backOfCardContent.classList.add("back-face");
    // Add src of img
    // backOfCardContent.src = "cardFace";

    return [createCardDiv, frontOfCardContent, backOfCardContent]
}