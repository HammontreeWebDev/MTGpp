fetch('https://api.scryfall.com/cards/search?order=cmc&q=c%3Ared+pow%3D3')
.then(response => {
    return response.json()
})
.then(data => {
    console.log(data);
})