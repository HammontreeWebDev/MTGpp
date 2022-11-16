// element variables
let cardSearch = $("#card-search");
let cardSubmit = $("#card-submit");
let cardArt = $("#card-art-results");
let cardName = $("#card-name");
let cardList = $("#card-list");
let cardType = $(".card-type");


let saveDeckBtn = $("#decklist-save-btn");
let clearDeckBtn = $("#decklist-delete-btn");
let renameDeckBtn = $("#edit-deck-name");


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

// initialize cardArray with deck info
async function init() {
    // Get deck id from url
    let deck_id = parseInt(location.pathname.split("/").pop());

    // Fetch collection using deck_id
    fetch(`../api/scry/collection/${deck_id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((response) => {
            cardArray = response.map((element) => {
                return {
                    name: element.name,
                    id: element.id,
                    art: element.image_uris.border_crop,
                    type: element.type_line,
                };
            });

            return cardArray;

        })
        // TODO: Render cards to page
        .then((cardArray) => {

            console.log(cardArray);

            for (i = 0; i < cardArray.length; i++) {

                // console.log(cardArray[i].name);
                // console.log(cardArray[i].type);

                let nameResponse = cardArray[i].name;
                let typeResponse = cardArray[i].type;
                let listId;
                // console.log(cardArray[i].name);

                if (typeResponse.includes("Creature")) {
                    listId = "Creature";
                }

                else if (typeResponse.includes("Land")) {
                    listId = "Land";
                }

                else if (typeResponse.includes("Artifact")) {
                    listId = "Artifact";
                }

                else if (typeResponse.includes("Enchantment")) {
                    listId = "Enchantment";
                }

                else if (typeResponse.includes("Instant")) {
                    listId = "Instant";
                }

                else if (typeResponse.includes("Sorcery")) {
                    listId = "Sorcery";
                }

                else if (typeResponse.includes("Planeswalker")) {
                    listId = "planeswalker";
                }

                if (document.body.textContent.includes(listId)) {
                    $(`#${listId}`).append(`
                    <li><button class="added-card">${nameResponse}</button><span class="card-count">(# in Deck)</span></li>`);
                }

                // otherwise, create the ID, ul, and first li
                else {
                    console.log(listId);

                    cardList.append(`<ul id="${listId}" class="no-list">
                    <h5 class="card-type">${listId}</h5>
                    <li><button class="added-card">${nameResponse}</button><span class="card-count">(# in Deck)</span></li></ul>`);
                }
            }
        })

}

// save deck details to database
function handleSaveDeck() {
    fetch(`../api/decklist`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            deck_id: parseInt(location.pathname.split("/").pop()),
            deck_list: JSON.stringify(
                cardArray.map((element) => {
                    return {
                        id: element.id,
                        amount: 1, //TODO: placeholder
                    };
                })
            ),
        }),
    });
}

// clear deck changes
function handleClearDeck() {
    location.reload();
}



// rename the deck
function handleRenameDeck(event) {
    // TODO: Replace with modal
    let newName = prompt("Enter a new name for the deck:");
    fetch(`../api/decklist`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            deck_id: parseInt(location.pathname.split("/").pop()),
            deck_name: newName,
        }),
    });
}


// function / submit handler to show card art/ name/ and add card information to an array for chosen cards
cardSubmit.submit(function (event) {
    event.preventDefault();
    fetch(`../api/scry/name/${$("input").first().val()}`)
        .then((response) => {
            // console.log($( "input" ).first().val());
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        // Card Art Render Section
        .then((response) => {
            // console.log(response.name);
            cardArt.attr("src", response.image_uris.border_crop);
            cardName.text(response.name);
            return response;
        })
        // Add selected card information to array of objects
        .then((response) => {
            // console.log(response);
            cardArray.push({
                name: response.name,
                id: response.id,
                art: response.image_uris.border_crop,
                type: response.type_line,
            });
            // append selected cards to the page
            checkType();

            console.log(cardArray);

            function checkType() {

                let typeResponse = response.type_line;

                let listId;

                // Set the list Id based on what the response includes
                if (typeResponse.includes("Creature")) {
                    listId = "Creature";
                }

                else if (typeResponse.includes("Land")) {
                    listId = "Land";
                }

                else if (typeResponse.includes("Artifact")) {
                    listId = "Artifact";
                }

                else if (typeResponse.includes("Enchantment")) {
                    listId = "Enchantment";
                }

                else if (typeResponse.includes("Instant")) {
                    listId = "Instant";
                }

                else if (typeResponse.includes("Sorcery")) {
                    listId = "Sorcery";
                }

                else if (typeResponse.includes("Planeswalker")) {
                    listId = "planeswalker";
                }

                // If the type of card exists, append the card name only to existing ID for that card type
                if (document.body.textContent.includes(listId)) {
                    $(`#${listId}`).append(`
                    <li><button class="added-card">${response.name}</button><span class="card-count">(# in Deck)</span></li>`);
                }

                // otherwise, create the ID, ul, and first li
                else {
                    console.log(listId);

                    cardList.append(`<ul id="${listId}" class="no-list">
                    <h5 class="card-type">${listId}</h5>
                    <li><button class="added-card">${response.name}</button><span class="card-count">(# in Deck)</span></li></ul>`);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

// Event Listeners:
cardSearch.on("input", handleAutocomplete);

saveDeckBtn.on("click", handleSaveDeck);
clearDeckBtn.on("click", handleClearDeck);
renameDeckBtn.on("click", handleRenameDeck);

$(document).on(
    {
        mouseenter: function () {
            //fetch card information based on hovered card name
            fetch(`../api/scry/name/${this.textContent}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(response.status);
                    }
                })
                .then((response) => {
                    // console.log(response);
                    // set card art area based on hovered card name
                    cardArt.attr("src", response.image_uris.border_crop);
                    cardName.text(response.name);
                });
        },
        mouseleave: function () {
            //stuff to do on mouse leave
            cardArt.attr("src", "");
            cardName.text("");
        },
    },
    ".added-card"
);

init();
