const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.user');
const timer = document.querySelector('.timer');

const players = [
    'baggio',
    'pele',
    'ronaldinho',
    'ronaldo',
    'zidane',
    'puskas',
    'eusebio',
    'yashin',
    'cruyff',
    'kaka'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}, você ganhou! Seu tempo foi de ${timer.innerHTML} segundos`);
    }
}

const checkCards = () => {
    const firstPlayer = firstCard.getAttribute('data-player');
    const secondPlayer = secondCard.getAttribute('data-player');

    if (firstPlayer === secondPlayer) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 700);
    }
}

const revealCard = ({ target }) => {
    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (player) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${player}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-player', player);

    return card;
}

const loadGame = () => {

    const duplicatePlayers = [ ...players, ...players ];

    const shuffledArray = duplicatePlayers.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((player)=> {

        const card = createCard(player);
        grid.appendChild(card)

    });

}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000);
}


window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
