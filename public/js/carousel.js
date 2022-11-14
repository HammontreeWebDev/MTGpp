const Scry = require("scryfall-sdk");


async function randomImg() {
    let randomImages;
    for (let i = 0; i < 5; i++) {
    console.log('searching...');
    const card = await Scry.Cards.random()
    randomImages = (card.image_uris.art_crop);
    const randImg = document.createElement(`<img src='${randomImages}'>`)
    const carousel = document.getElementById('carouselImages');
    carousel.appendChild(randImg);
    }
console.log(randomImages);
}

randomImg();