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

    const gameArea = document.getElementsByClassName("game-area")[0];
    let [cardElement, frontOfCard, backOfCard] = createElementsForGameArea();
    const playingCards = getPlayingCards();

    // Remove the first element of the array and save it to a variable
    // First element is the back of card content and is only needed once.
    // Its not needed when looping through card array.
    let backOfCardContent = playingCards.shift();

    for (let c of playingCards) {
        console.log(c);

        cardElement.dataset.card = c.data;
        frontOfCard.src = c.src;
        backOfCard.src = backOfCardContent.src;

        // Generate random number between 1 and the length of the object. Ideally. 
        // Currently its set to 12 and needs to be refactored. 
        let ramdomCardPosition = Math.floor(Math.random() * 12);
        // Give the card div a flex order style with that random number
        cardElement.style.order = ramdomCardPosition;

        const append = gameArea.appendChild(cardElement.cloneNode());
        append.appendChild(frontOfCard.cloneNode());
        append.appendChild(backOfCard.cloneNode());
        append.addEventListener('click', flipCard);
    }
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
        },
        {
            src: "assets/images/golfers/robert_macintyre.png",
            data: "macintyre",
            alt: "Robert MacIntyre"
        },
        {
            src: "assets/images/golfers/rory_mcilroy.png",
            data: "mcilroy",
            alt: "Rory McIlroy"
        },
        {
            src: "assets/images/golfers/sahith_theegala.png",
            data: "theegala",
            alt: "Sahith Theegala"
        },
        {
            src: "assets/images/golfers/shane_lowry.png",
            data: "lowry",
            alt: "Shane Lowry"
        },
        {
            src: "assets/images/golfers/tiger_woods.png",
            data: "woods",
            alt: "Tiger Woods"
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