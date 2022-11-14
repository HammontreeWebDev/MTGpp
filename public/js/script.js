const Scry = require("scryfall-sdk");

async function randomCard() {
    console.log('searching...');
    const card = await Scry.Cards.random()
// .then(card => {
//     return card
// })
    console.log(card.name);
}

randomCard();