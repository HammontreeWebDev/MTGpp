// element variables
let cardSearch = $("#card-search");
let cardSubmit = $("#card-submit");
let cardArt = $("#card-art-results");
let cardName = $("#card-name");
let cardList = $("#card-list");
let cardType = $(".card-type");


let saveDeckBtn = $("#decklist-save-btn");
let clearDeckBtn = $("#deck-clear-btn");
let renameDeckBtn = $("#deck-rename-btn");
let deleteCard = $(".delete-card");


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

        .then((cardArray) => {

            // console.log(cardArray);

            for (i = 0; i < cardArray.length; i++) {

                // console.log(cardArray[i].name);
                // console.log(cardArray[i].type);

                // set up array to count the number of duplicates
                let cardCount = [];
                const count = {};
                let nameArray = [];
                let countArray = [];
                renderAmount();


                let nameResponse = cardArray[i].name;
                let typeResponse = cardArray[i].type;
                let listId;
                let countID = $.trim(nameResponse.replace(/\s+/g, ''));
                countID = $.trim(countID.replace('//', ''));
                countID = $.trim(countID.replace(',', ''));

                // initialize card count to 1
                let countResponse = 1;
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

                if (document.body.textContent.includes(listId) && document.body.innerHTML.includes(countID)) {

                    let index = nameArray.indexOf(nameResponse);
                    nameResponse = nameArray[index];
                    countResponse = countArray[index];
                    console.log(countID);

                    $(`#${countID}`)[0].innerHTML = `(x${countResponse})`;

                }

                else if (document.body.textContent.includes(listId)) {
                    $(`#${listId}`).append(`
                    <li><button class="added-card">${nameResponse}</button><span id="${countID}" class="card-count">(x${countResponse})</span><iconify-icon icon="typcn:delete" data-card="${nameResponse}" class ="delete-card"></iconify-icon></li>`);
                }

                // otherwise, create the ID, ul, and first li
                else {
                    // console.log(listId);

                    cardList.append(`<ul id="${listId}" class="no-list">
                    <h5 class="card-type">${listId}</h5>
                    <li><button class="added-card">${nameResponse}</button><span id="${countID}" class="card-count">(x${countResponse})</span><iconify-icon icon="typcn:delete" data-card="${nameResponse}" class ="delete-card"></iconify-icon></li></ul>`);
                }
                function renderAmount() {
                    for (let i = 0; i < cardArray.length; i++) {
                        // console.log(cardArray[i].name);
                        cardCount.push(cardArray[i].name)
                    }
                    // console.log(cardCount);
                    cardCount.forEach(card => {
                        count[card] = (count[card] || 0) + 1;
                    })
        
                    nameArray = Object.keys(count)
                    countArray = Object.values(count)
                    console.log(countArray);
                    console.log(nameArray);
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
function handleRenameDeck() {
    let newName = $('#editDeckName').val();
    fetch(`../api/decklist`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            deck_id: parseInt(location.pathname.split("/").pop()),
            deck_name: newName,
        }),
    })
    // document.location.replace(`/decklist/${location.pathname.split("/").pop()}`);
    setTimeout(location.reload.bind(location), 600);
}

// function to check if ul is empty and delete it if it is. called in document.on event listener for delete buttons

function handleTypeHeaderDelete() {

    let listBody = $('ul.no-list');

    for (let i = 0; i < listBody.length; i++) {
        let children = listBody[i].children;

        if (!children[1]) {
            children[0].parentElement.remove();
            console.log('Removed Unordered List');
        }
    }
}

// render card art / add to array / render cards to page
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
                amount: '',
            });

            // set up array to count the number of duplicates
            let cardCount = [];
            const count = {};
            let nameArray = [];
            let countArray = [];

            // append selected cards to the page
            checkType();

            // console.log(cardArray);

            function checkType() {
                renderAmount();
                let typeResponse = response.type_line;
                let nameResponse = response.name;
                let countID = $.trim(nameResponse.replace(/\s+/g, ''));
                countID = $.trim(countID.replace('//', ''));
                countID = $.trim(countID.replace(',', ''));

                // initialize card count to 1
                let countResponse = 1;

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
                // check response name against name Array and update to name and amount, else it defaults to response.name and amount 1

                if (document.body.textContent.includes(listId) && document.body.innerHTML.includes(countID)) {

                    let index = nameArray.indexOf(nameResponse);
                    nameResponse = nameArray[index];
                    countResponse = countArray[index];
                    console.log(countID);

                    $(`#${countID}`)[0].innerHTML = `(x${countResponse})`;


                }

                else if (document.body.textContent.includes(listId)) {

                    let index = nameArray.indexOf(nameResponse);
                    nameResponse = nameArray[index];
                    countResponse = countArray[index];

                    // console.log(nameResponse);
                    // console.log(countResponse);

                    $(`#${listId}`).append(`
                    <li><button class="added-card">${nameResponse}</button><span id="${countID}" class="card-count">(x${countResponse})</span><iconify-icon icon="typcn:delete" data-card="${nameResponse}" class ="delete-card"></iconify-icon></li>`);
                }

                // otherwise, create the ID, ul, and first li
                else {
                    // console.log(listId);

                    cardList.append(`<ul id="${listId}" class="no-list">
                    <h5 class="card-type">${listId}</h5>
                    <li><button class="added-card">${nameResponse}</button><span id="${countID}" class="card-count">(x${countResponse})</span><iconify-icon icon="typcn:delete" data-card="${nameResponse}" class ="delete-card"></iconify-icon></li></ul>`);
                }


            };

            // function to render amount of cards to page and update cardArray
            // called in check type function
            // console.log(cardArray);
            function renderAmount() {
                for (let i = 0; i < cardArray.length; i++) {
                    // console.log(cardArray[i].name);
                    cardCount.push(cardArray[i].name)
                }
                // console.log(cardCount);
                cardCount.forEach(card => {
                    count[card] = (count[card] || 0) + 1;
                })

                nameArray = Object.keys(count)
                countArray = Object.values(count)
                console.log(countArray);
                console.log(nameArray);
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

// delete card from page
$(document).on({
    click: function (event) {
        event.preventDefault();

        let namesArray = [];
        for (let i = 0; i < cardArray.length; i++) {
            let names = cardArray[i].name
            namesArray.push(names);
        }
        // Get index of the name that matches in the name array
        let namesIndex = namesArray.indexOf(event.target.dataset.card);
        let index = namesIndex;

        // based on the index number found above, use that to delete all card information for that index number (the numbers will match)

        if (index > -1) {
            cardArray.splice(index, 1);
            this.parentElement.remove();
            // check if ul is empty and if so, delete type header from page as well
            handleTypeHeaderDelete();
        }
    }
}, ".delete-card")

// mouseover event to show card art
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
