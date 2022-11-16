// name vars
const createDeckBtn = document.getElementById('createDeckSave');
const deleteBtn = document.getElementsByClassName('deleteBtn');
const editBtn = document.getElementsByClassName('editBtn'); 

// function to create deck
async function createDeckHandler() {
  let answer = document.getElementById('createDeckName').value;

  const results = await fetch('api/deck', {
    method: 'POST',
    body: JSON.stringify({ deck_name: answer }),
    headers: { 'Content-Type': 'application/json' },
  })
  if (results.ok) {
    document.location.replace('/decks');
  }
  else {
    console.error(new Error());
  }
}

// function to edit deck contents - this will re-route to decklist
async function editDeckHandler() {
  const edit = await fetch(`/decklist/${this.dataset.editDeckId}`);

  console.log(this.dataset.editDeckId);
  // we can see in dev tools that the proper id of the deck is being passed in
  console.log(edit);

  if (edit.ok) {
    document.location.replace(`/decklist/${this.dataset.editDeckId}`);
  }
  else {
    console.error(new Error());
  }
}

// function to delete specific deck
async function deleteDeckHandler() {

  const del = await fetch(`api/deck`, {
    method: 'DELETE',
    body: JSON.stringify({ id: this.dataset.deckId }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (del.ok) {
    document.location.replace('/decks');
  }
  else {
    console.error(new Error());
  }

}

// event listners
createDeckBtn.addEventListener('click', createDeckHandler);

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener('click', deleteDeckHandler);
}

for (let i = 0; i < editBtn.length; i++) {
  editBtn[i].addEventListener('click', editDeckHandler);
}