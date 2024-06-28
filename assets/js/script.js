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

/**
 * Gathers all the elements and cards in one place. 
 * Loops through the cards and give value to created elements
 * appends elements to the DOM
 */
function addElementsToGameArea() {

    let cards = getPlayingCards();
    // Remove the first element of the array and save it to a variable
    // First element is the back of card content and is only needed once.
    // Its not needed when looping through card array.
    let backOfCardContent = cards.shift();
    console.log(backOfCardContent);
    console.log(cards[0].src);

    const [cardElement, frontOfCard, backOfCard] = createElementsForGameArea();

    const gameArea = document.getElementsByClassName("game-area");
    const append = gameArea[0].appendChild(cardElement.cloneNode());
    append.appendChild(frontOfCard.cloneNode());
    append.appendChild(backOfCard.cloneNode());
    // append.addEventListener('click', flipCard);
}

/**
 * Define an array of objects that contains card details
 * @returns a list of playing cards
 */
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

/**
 * Define all the elements that are going to be placed on the DOM
 * @returns elements to be created
 */
function createElementsForGameArea() {

    // Specify a new card div to be created
    let createCardDiv = document.createElement("div");
    // // Add the card class to the div
    createCardDiv.classList.add("card");

    // Create new img element for front of
    // card content to be placed inside the card div
    let frontOfCard = document.createElement("img");
    // Add the front-face class to the img
    frontOfCard.classList.add("front-face");

    // Create new img element for back of
    // card content to be placed inside the card div
    let backOfCard = document.createElement("img");
    // Add the back-face class to the img
    backOfCard.classList.add("back-face");

    return [createCardDiv, frontOfCard, backOfCard]
}