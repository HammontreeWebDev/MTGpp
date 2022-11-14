const Scry = require("scryfall-sdk");


async function randomImg() {
    let randomImages = [];
    for (let i = 0; i < 5; i++) {
    console.log('searching...');
    const card = await Scry.Cards.random()
    randomImages.push(card.image_uris.art_crop);
    }
console.log(randomImages);
}

randomImg();