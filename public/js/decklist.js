// require the SDK for scry
const Scry = require("scryfall-sdk");

// element variables
let cardSearch = $("#card-search");

// list cards based on user input
async function handleAutocomplete(event) {
    const results = await Scry.Cards.autoCompleteName(`${event.target.value}`);

    // logging for now to test
    results.forEach(console.log);

    cardSearch.autocomplete({
        source: results,
    });
}

// async function handleSubmit(event) {
//     const card = await Scry.Cards.byName(event.target.value);
// }

cardSearch.on("input", handleAutocomplete);
// cardSearch.on("submit", handleSubmit);
