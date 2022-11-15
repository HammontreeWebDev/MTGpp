// element variables
let cardSearch = $("#card-search");
let searchResults = $("#card-name-results");

// function to handle the autocomplete api call
function handleAutocomplete() {
    if (this.value) {
        fetch(`api/scry/autocomplete/${this.value}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            // console.log(response);
            cardSearch.autocomplete({
                source: response,
            });
        });
    }
}

cardSearch.on("input", handleAutocomplete);
// cardSearch.on("submit", handleSubmit);
