// element variables
let cardSearch = $("#card-search");
let cardSubmit = $("#card-submit");
let cardArt = $("#card-art-results");
let cardName = $("#card-name");
let cardList = $("#card-list");
let cardType = $(".card-type");

let saveDeckBtn = $("#save-deck");
let clearDeckBtn = $("#clear-deck");

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

// save deck details to database
function handleSaveDeck(event) {}

// clear deck changes
function handleClearDeck(event) {
    // TODO: Replace with modal
    let clear = confirm("Are you sure you want to clear your changes?");
    if (clear) {
        location.reload();
    }
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
                // remove hyphen then white space from response type to pass as created elements ID for card types
                let typeResponse = response.type_line;
                let replaceHyphen = typeResponse.replace("—", "");
                let replaceWhiteSpace = $.trim(
                    replaceHyphen.replace(/\s/g, "")
                );
                let listId = replaceWhiteSpace.toLowerCase();

                // If the type of card exists, append the card name only to existing ID for that card type
                if (document.body.textContent.includes(response.type_line)) {
                    $(`#${listId}`).append(`
                    <li><button class="added-card">${response.name}</button><span class="card-count">(# in Deck)</span></li>`);
                }

                // otherwise, create the ID, ul, and first li
                else {
                    console.log(listId);

                    cardList.append(`<ul id="${listId}" class="no-list">
                    <h5 class="card-type" value="${response.type_line}">${response.type_line}</h5>
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
