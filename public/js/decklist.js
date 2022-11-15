// element variables
let cardSearch = $("#card-search");
let cardSubmit = $("#card-submit");
let cardArt = $("#card-art-results");
let cardName = $("#card-name");

// function to handle the autocomplete api call
function handleAutocomplete() {
    if (this.value) {
        fetch(`../api/scry/autocomplete/${this.value}`)
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

// function / submit handler to show card art when a card is chosen
cardSubmit.submit(function(event) {

    event.preventDefault();
        fetch(`../api/scry/name/${$( "input" ).first().val()}`)
        .then((response) => {
            // console.log($( "input" ).first().val());
            if(response.ok) {
            return response.json();
            }
            else{
                throw new Error(response.status)
            }
        })
        .then((response) => {
            console.log(response.name);
            cardArt.attr('src', response.image_uris.border_crop);
            cardName.text(response.name);
        }
        )
        .catch((error) => {
            console.log(error);
        }) 

    });


// Event Listeners:
cardSearch.on("input", handleAutocomplete);
// cardSearch.on("submit", handleSubmit);
// cardSearch.submit(handleCardArt(event));

