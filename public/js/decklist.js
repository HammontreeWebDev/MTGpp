// require the SDK for scry
const Scry = require('scryfall-sdk');

// element variables
let cardSearch = $('#card-search');

// list cards based on user input
const results = Scry.Cards.autoCompleteName(`${cardSearch.value}`);
results.forEach(console.log);