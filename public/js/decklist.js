// element variables
let cardSearch = $("#card-search");
let cardSubmit = $("#card-submit");
let cardArt = $("#card-art-results");
let cardName = $("#card-name");
let cardList = $("#card-list");

// define array that will be used to store card information as well as push to db
let cardArray = [];

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

// function / submit handler to show card art/ name/ and add card information to an array for chosen cards
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
        // Card Art Render Section
        .then((response) => {
            // console.log(response.name);
            cardArt.attr('src', response.image_uris.border_crop);
            cardName.text(response.name);
            return response;
        })
        // Add selected card information to array of objects and render to page
        .then((response) => {
            console.log(response);
            cardArray.push(
                {
                    name: response.name,
                    id: response.id,
                    art: response.image_uris.border_crop,
                    type: response.type_line,
                }
            )
            // let html = `<ul id="card-list" class="no-list">
            // <h5 id="card-type" class="card-type">Type 1</h5>
            // <li class="added-card">Card Name <span class="card-count">(# in Deck)</span></li></ul>`

            cardList.append(`<ul class="no-list">
            <h5 class="card-type">${response.type_line}</h5>
            <li class="added-card">${response.name}<span class="card-count">(# in Deck)</span></li></ul>`);

            console.log(cardArray);
        })
        .catch((error) => {
            console.log(error);
        }) 

    });

// Event Listeners:
cardSearch.on("input", handleAutocomplete);
// cardSearch.on("submit", handleSubmit);
// cardSearch.submit(handleCardArt(event));

