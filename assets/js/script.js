// jshint esversion: 6

// Declaring a 'namespace' to reduce the global scope of variables.
let CARD_IDENTIFIERS = {
    isCardFlipped: false,
    lockCardFlip: false,
    firstCard: null,
    secondCard: null
};

/**
 * Wait for the DOM to finish loading before running the game.
 * get the button element and add eventListeners to it.
 */
window.addEventListener('load', function () {
    const startGameBtn = document.getElementById('startGameBtn');
    startGameBtn.addEventListener('click', showModal);

    const closeModalPopup = document.getElementsByClassName("modal-close");
    for (let close of closeModalPopup) {
        close.addEventListener('click', closeModal);
    }

    const form = this.document.getElementById('userGameDetails');
    form.addEventListener('submit', submitGameDetails);

    const restartGameBtn = this.document.getElementById('restartGame');
    restartGameBtn.addEventListener('click', restartGame);
});

/**
 * This function gets the popup modal 'gameDetailsModal' 
 * and sets its display to block.
 */
function showModal() {
    // Reset the name input
    document.getElementById("name").value = "";
    // Reset the course input
    document.getElementById("course").value = "";

    const modal = document.getElementById("gameDetailsModal");
    modal.style.display = "block";

    // When the user clicks anywhere outside of the modal, close it.
    // Defined here as the modal is displayed.
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

/**
 * This function finds both popup modals by ID and sets their display to none.
 */
function closeModal() {
    // Tried using 'this' to grab the outermost parent and use the div to close
    // issue with that was on submit of new game the submit button also calls
    // this function. When the submit button is the 'this' element, it breaks
    const startModal = document.getElementById("gameDetailsModal");
    const endModal = document.getElementById("gameEndModal");
    startModal.style.display = "none";
    endModal.style.display = "none";
}

/**
 * This function gets the popup modal 'gameEndModal' 
 * and sets its display to block.
 */
function showGameEndModal() {
    const modal = document.getElementById("gameEndModal");
    modal.style.display = "block";
}

/**
 * This function gets details from the form before starting the game.
 * It prevents the default form submission.
 * @param {*} event - The form event
 */
function submitGameDetails(event) {
    event.preventDefault();

    const user = this.name.value.trim();
    const gameMode = parseInt(this.course.value);

    if (user) {
        //Update the input with the trimmed value
        this.name.value = user;
    } else {
        //Trimmed value is empty
        alert("Please enter valid input");
        this.name.focus();
        this.name.value = "";
        return false;
    }

    clearGameArea();
    setUserDisplayName(user);
    addElementsToGameArea(gameMode);
    closeModal();
}

/**
 * This function displays a users name above the game area
 * @param {*} user - The users name
 */
function setUserDisplayName(user) {
    const userDisplay = document.getElementsByClassName('user-display')[0];
    userDisplay.innerHTML = `<h3>Player: ${user}</h3>`;
    userDisplay.style.display = "block";
}

function restartGame() {
    closeModal();
    showModal();
}

/**
 * This function fires when a card elemant is clicked 
 * and if it passes the criteria applys the 
 * class 'flip' to the element. 
 */
function flipCard() {
    if (CARD_IDENTIFIERS.lockCardFlip) return;
    if (this === CARD_IDENTIFIERS.firstCard) return;

    this.classList.toggle('flip');

    if (!CARD_IDENTIFIERS.isCardFlipped) {
        CARD_IDENTIFIERS.firstCard = this;
        CARD_IDENTIFIERS.isCardFlipped = true;
        return;
    }

    CARD_IDENTIFIERS.secondCard = this;
    CARD_IDENTIFIERS.lockCardFlip = true;

    checkCardsMatch();
}

/**
 * This function checks whether two clicked cards have a matching data attribute
 */
function checkCardsMatch() {
    const isMatch = CARD_IDENTIFIERS.firstCard.dataset.card ===
        CARD_IDENTIFIERS.secondCard.dataset.card;

    if (isMatch) {
        setTimeout(() => {
            checkIfAllCardsFlipped();
            disableCards();
        }, 1000);

    } else {
        setTimeout(() => {
            CARD_IDENTIFIERS.firstCard.classList.remove('flip');
            CARD_IDENTIFIERS.secondCard.classList.remove('flip');
            resetCards();
        }, 1000);
    }
}

/**
 * This function removes the eventListener from a card element.
 */
function disableCards() {
    CARD_IDENTIFIERS.firstCard.removeEventListener('click', flipCard);
    CARD_IDENTIFIERS.secondCard.removeEventListener('click', flipCard);
    resetCards();
}

/**
 * This function sets variables needed in the flipCard function to 
 * null and false
 */
function resetCards() {
    CARD_IDENTIFIERS.firstCard = null;
    CARD_IDENTIFIERS.secondCard = null;
    CARD_IDENTIFIERS.isCardFlipped = false;
    CARD_IDENTIFIERS.lockCardFlip = false;
}

/**
 * This function checks if divs with the flip class applied are the 
 * same as divs with the card class applied. If so, game is finished. 
 */
function checkIfAllCardsFlipped() {

    const cardsNotFlipped = document.getElementsByClassName("card");
    const cardsFlipped = document.getElementsByClassName('card flip');
    const isMatch = cardsNotFlipped.length === cardsFlipped.length;
    if (isMatch) {
        showGameEndModal();
    }
}


/**
 * This function gathers all the elements and cards in one place. 
 * Loops through the cards and gives values to created elements
 * appends elements to the DOM
 */
function addElementsToGameArea(gameMode) {

    const gameArea = document.getElementsByClassName("game-area")[0];
    const [cardElement, frontOfCard, backOfCard] = createElementsForGameArea();
    const playingCards = getPlayingCards();

    // Remove the first element of the array and save it to a variable
    // First element is the back of card content and is only needed once.
    // Its not needed when looping through card array.
    const backOfCardContent = playingCards.shift();

    // Take the number of cards to display from the the gameMode.
    // gameMode will be a number
    playingCards.splice(gameMode);

    // Duplicate the array and overwrite the original. Means we now append 2
    // of each card to the game area.
    playingCards.push(...playingCards);
    // Number of cards to be displayed. Used to get a random number.
    const orderPos = gameMode * 2;

    for (let c of playingCards) {

        cardElement.dataset.card = c.data;
        frontOfCard.src = c.src;
        frontOfCard.alt = c.alt;
        backOfCard.src = backOfCardContent.src;
        backOfCard.alt = backOfCardContent.alt;

        // Generate random number between 1 and the length of the object. Ideally. 
        // Currently its set to 12 and needs to be refactored. 
        const ramdomCardPosition = Math.floor(Math.random() * orderPos);
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
 * This function removes all dynamically created elements 
 * from the game area
 */
function clearGameArea() {
    document.getElementById("name").value = "";
    document.getElementsByClassName("game-area")[0].innerHTML = "";
}

/**
 * This function defines an array of objects that contain card details
 * @returns {array} - The list of playing cards
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
 * This function defines all the elements that are going to be placed on the DOM
 * @returns {array} - List of elements to create
 */
function createElementsForGameArea() {

    // Specify a new card div to be created
    const createCardDiv = document.createElement("div");
    // // Add the card class to the div
    createCardDiv.classList.add("card");

    // Create new img element for front of
    // card content to be placed inside the card div
    const frontOfCard = document.createElement("img");
    // Add the front-face class to the img
    frontOfCard.classList.add("front-face");

    // Create new img element for back of
    // card content to be placed inside the card div
    const backOfCard = document.createElement("img");
    // Add the back-face class to the img
    backOfCard.classList.add("back-face");

    return [createCardDiv, frontOfCard, backOfCard];
}