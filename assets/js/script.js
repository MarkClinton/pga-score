/**
 * Wait for the DOM to finish loading before running the game.
 * get the button element and add eventListeners to it.
 */
window.addEventListener('load', function () {
    let startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', startModal);

    let closeModalPopup = document.getElementsByClassName("modal-close")[0];
    closeModalPopup.addEventListener('click', closeModal);

    let form = this.document.getElementById('UserGameDetails');
    form.addEventListener('submit', handleSubmitGameDetails);


});

function handleSubmitGameDetails(event) {
    event.preventDefault();

    const user = this.name.value;
    let userDisplay = document.getElementsByClassName('userDisplay')[0];
    userDisplay.innerHTML = `<p>Player: ${user}</p>`;
    userDisplay.style.display = "block";

    const gameMode = this.course.value;

    startGame(gameMode);
    closeModal();
}

function flipCard() {
    this.classList.toggle('flip');
}

/**
 * The beginning of the game. Function to display a popup modal to capture
 * details from the user before playing.
 */
function startModal() {

    let modal = document.getElementById("gameDetailsModal");
    modal.style.display = "block";

    // When the user clicks anywhere outside of the modal, close it.
    // Defined here as the modal is displayed.
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
};

/**
 * Fires from an EventListener to remove the modal from screen
 */
function closeModal() {
    let modal = document.getElementById("gameDetailsModal");
    modal.style.display = "none";
}

function startGame(gameMode) {

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
    let playingCards = getPlayingCards();

    // Remove the first element of the array and save it to a variable
    // First element is the back of card content and is only needed once.
    // Its not needed when looping through card array.
    const backOfCardContent = playingCards.shift();

    // Duplicate the array and overwrite the original. Means we now append 2
    // of each card to the game area.
    playingCards.push(...playingCards);

    for (let c of playingCards) {

        cardElement.dataset.card = c.data;
        frontOfCard.src = c.src;
        backOfCard.src = backOfCardContent.src;

        // Generate random number between 1 and the length of the object. Ideally. 
        // Currently its set to 12 and needs to be refactored. 
        let ramdomCardPosition = Math.floor(Math.random() * 12);
        // Give the card div a flex order style with that random number
        cardElement.style.order = ramdomCardPosition;

        // Append the elements to the game-area 
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