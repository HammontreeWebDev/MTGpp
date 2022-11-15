// element variables
let cardSearch = $("#card-search");
let searchResults = $("#card-name-results");

// function to handle the autocomplete api call
function handleAutocomplete() {
    fetch(`https://api.scryfall.com/cards/autocomplete?q=${this.value}`)
        .then(response => {
            return response.json()
        })
        .then(response => {
            // console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                let cardNames = response.data[i];
                console.log(cardNames);
                let button = $(`<button class="result-btn" value="">${cardNames}</button>`)
                searchResults.append(button);
            }
        })
}

cardSearch.on("input", handleAutocomplete);
// cardSearch.on("submit", handleSubmit);
