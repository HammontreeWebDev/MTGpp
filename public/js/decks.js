// name vars
const createDeckBtn = document.getElementById('create-deck');
const signOutBtn = document.getElementById('sign-out');
const deleteBtn = document.getElementsByClassName('deleteBtn');

// function to create deck
async function createDeckHandler() {
  let answer = prompt('Please name your deck:');

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
  const edit = await fetch('api/deck', {
    method: 'GET',
    
  });
  if (edit.ok) {
    document.location.replace('/decklist');
  }
  else {
    console.error(new Error());
  }
}

// function to delete specific deck
async function deleteDeckHandler() {

 const del = await fetch(`api/deck`, {
    method: 'DELETE',
    body: JSON.stringify({ id: this.dataset.deckId}),
    headers: { 'Content-Type': 'application/json' },
  });
  if (del.ok) {
    document.location.replace('/decks');
  }
  else {
    console.error(new Error());
  }

}
// function expression to sign out
const signOutHandler = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
    alert('You have been logged out.')
  } else {
    alert('Failed to log out.');
  }
};

// event listners
createDeckBtn.addEventListener('click', createDeckHandler);
signOutBtn.addEventListener('click', signOutHandler);

for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener('click', deleteDeckHandler);
}