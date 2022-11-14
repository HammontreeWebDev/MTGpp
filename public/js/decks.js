// name vars
const createDeck = document.getElementById('create-deck');

// function to create deck
function createDeckHandler() {
    let answer = prompt('Please name your deck:');
    fetch('api/deck', {
        method: 'POST',
        body: JSON.stringify({deck_name:answer}),
        headers: { 'Content-Type': 'application/json' },
    })
}

createDeck.addEventListener('click', createDeckHandler);