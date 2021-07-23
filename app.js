// select the cards
const cards = document.querySelectorAll('.memory-card');
// countdown 
const countUp = document.getElementById('countup');
// winning screen'
const winScreen = document.getElementById('winning-screen');

let minutes = 0;
let seconds = 0; /*startingMinutes  * 602*/;

let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let totalCards = 0;

cards.forEach(card => {
    totalCards++;
});

// call updateCountDown every second
//let timer = setInterval(updateCountUp, 1000);

// click any element inside the memory game and select it
cards.forEach(card => {
    card.addEventListener('click', flipCard);
});
/*

// update timer
function updateCountUp() {
    
    // if no cards are left unflipped, stop timer
    if(totalCards === 0) {
        clearInterval(timer);
        winningScreen();
    }
    
    if(seconds <= 60){
        seconds++;
    }
    else{
        seconds = 0;
        minutes++;
    }
    countUp.innerHTML = `${minutes}:${seconds}`;
}

// winning ftn
function winningScreen() {
    winScreen.classList.add('win');
}
*/
// flip card
function flipCard(e) {

    // if lockboard is true, do not execute the rest of the code
    if(lockBoard) return;

    if(e.target.parentElement === firstCard) return;

    e.target.parentElement.classList.toggle('flip');

    // if no card has been flipped
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = e.target.parentElement;
    }
    // second card flipped
    else{
        secondCard = e.target.parentElement;
        checkCards();
    }
}

function checkCards() {
    // do the flipped cards match?
    if(firstCard.dataset.cards === secondCard.dataset.cards) {
        disableCards();
        totalCards = totalCards - 2;
        console.log(totalCards);
    }
    else{
        // flipped cards do not match, unflip them
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000); 
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random() * 24);
        card.style.order = randomNumber;
    });
})();

