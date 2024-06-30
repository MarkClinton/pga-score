# PGA Score 
Live: https://markclinton.github.io/pga-score/

## Index – Table of Contents
* [About](#about) 
* [Design](#design)
* [Target Audience](#target-audience)
* [Features](#features)
* [Testing](#testing)
* [Languages Used](#technologies-used)
* [Deployment](#deployment)
* [Credits](#credits)
* [Issues](#issues)

## About
PGA Score is a golf themed Javascript web game. The game itself is based upon the classic card memory game. A user must 
click a card, whoch is face down, and click another card to find the corresponding match. If they dont find a match, both
cards flip back over. If they do find a match, the cards remain flipped. The game is only over when all cards are flipped. 
The underlying game itself is simple, the theme of golf is to give the game a fun aspect. 

## Design
The game is intended to be fun and engaging. Green colours used are to represent a golf course. The accent colours mimic 
the colours used by the PGA website. 

- ### Colour Scheme 
The main colours of the site (#009f6b, #009966) are different shades of green. Used to represent the different shades found
on a golf course. the accent colours (#163B7C) mimic the colour used by PGA. It elicits a familiar, nostalgic feeling 
 used by the already exisitng brand PGA.  

- ### Imagery
The main logo is a play on the PGA Tour logo. It was traced from the original PGA Tour logo and tour was replaced with the word
score. The imagery used on the back of the playing cards is the same image of a golfer used by the PGA. The front face of the 
cards is images of golfers who play on the PGA Tour. 

- ### Typography 


- ### Wireframes

## Target Audience
The target audience would be anyone who like to play web based games and has an interest in golf. The idea behind this game
would that it wouldnt look out of place in a list on one of those old flash based game websites.

## Features

### Future Features
- A timer. A timer starts when the game are is populated with cards and records the time taken for a user to match all cards. 
I intially wrote this into the spec before starting the project but never got the time to try and implement it. The idea would
be that, depending on the time, a user would be a given a score based on a handicap, just like in golf. It would have been done
in groups i.e. if the user gets a time of 15-20 seconds they would get a handicap of -1. 20-25s would get a handicap of par.
- Another Game Mode. Currently there is Easy or Hard and determines the amount of cards to be shown on the game area. Hard 
would be renamed to Medium and a new game mode introduced as Hard. The new Hard game mode would consist of half the cards 
being images of golfers and the other half being text. The text would be the last time they won a PGA Championship. The 
player would have to match the image to the last time that golfer won a PGA Championship.
- Implement more cards. Implement functionality to have a big list of cards created that the game would choose from depending
on the game mode chosen. This would mean that we could have a mix of different cards that could be displayed so a user doesnt
see the same cards every time they play. 
- Dynamic Modal. Currently the game is using two separate modals defined on index.html. One that popups when the user starts
a game. One that pop ups when a user finishes a game. Having a dynamoc modal could mean only defining one modal on index.html
and populating it with elements using javascript, depending on the need for the content. Javascript could handle the content
of a modal making it re-usable. 

## Technologies

### Languages
- HTML
- CSS
- JavaScript

### Other Tools
- [GitHub](https://github.com/)
- [Git](https://git-scm.com/)
- [Google Fonts](https://fonts.google.com/)
- [GoFullPage](https://gofullpage.com/) to take full page screenshots.
- [Responsive Viewer](https://chrome.google.com/webstore/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb/related?hl=en) for testing my site on all screen sizes.


## Deployment

- ### Github Pages
  - In the repository, navigate to Settings > Pages.
  - From the Source dropdown choose "Deploy from a branch".
  - Choose "main" as the branch.
  - When the master branch is selected it will initiate a build and deployment of the site.
  - Any changes pushed to the main branch will automatically be built and deployed once set up.
  - Link to live GitHub Page can be found [here](https://markclinton.github.io/pga-score/)

- ### Clone Repo
  - Navigate to the [PGA Score](https://github.com/MarkClinton/pga-score) repository.
  - Click "Code" and choose the HTTPS tab.
  - Copy the URL. 
  - Open a terminal window and paste `git clone https://github.com/MarkClinton/pga-score.git` to the directory you want.

## Testing

- ### Screen Size Testing

- ### Validator Testing

- ### Manual Testing 

- ### Compatibility Testing

## Bugs
- The footer, when resizing the screen was overlapping onto the main element. The fix for this was to add a display: flex 
to the body and align the header, main & footer elements using flex-direction: column.
- The card flip functionlaity made a weird transition when turning. The fix for this was adding the perspective property to the game-area. 
- When a first card was flipped it was still able to be selected which invoked the flipCard() function and turned it back over. The fix for this was to add a JS varibable firstCard which was initially set to null. Once the first card was selected and flipped, using 'this'
the first card was saved to that variable. FlipCard() then checks if the firstCard varibale is clicked, if so it just returns
out of the function not progressing any further. ??
- A user was able to click as many cards as they wanted, it wasnt limited to 2 cards. This messed with the flow of the game.
In the flipCard() function I added a lockFlip variable which didnt allow any other cards to be pressed until checkCardsMatch()
finished.
- Cards could still be clicked when they were a matching pair. They still had an EventListener attached. If we found a pair 
then we call a function to remove the EventListerner from those cards.
- When dynamically adding cards to the game area in a loop it would only ever add the last element to the game area. 
The reason being was I wasnt using the cloneNode() when appending. Not using this meant I was adding the same element 
multiple times just moving down in the DOM.
- Card was still flipping when the eventListener was removed. It wasnt fully flipping over as shown in the gif below. 
The reason behind this was I forgot to set my CSS class correctly. I only declared '.flip' instead of '.card.flip.' 
Which meant that the 'card:active' class was enabled to carry out the transform property when the card was active. 
- Needed to have variables used in the flipCard() function in the global scope to keep track of the logic (Used a namespace). 
It would have been easy to pass these variables to the needed functions and manipulate them. The issue arose when declaring 
the variables. Declaring them in the flipCard() function meant they would be re-declared every time a card was clicked, 
losing the value needed. 


## Credits

- ### Resources


- ### Media


- ### Helpful Links


- ### Acknowledgments 



