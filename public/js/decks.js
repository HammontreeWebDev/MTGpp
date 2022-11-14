// name vars
const createDeckBtn = document.getElementById('create-deck');
const signOutBtn = document.getElementById('sign-out');
const deleteBtn = document.getElementsByClassName('deleteBtn');

// function to create deck
function createDeckHandler() {
    let answer = prompt('Please name your deck:');
    fetch('api/deck', {
        method: 'POST',
        body: JSON.stringify({deck_name:answer}),
        headers: { 'Content-Type': 'application/json' },
    })
}

// function to delete specific deck
function deleteDeckHandler() {
  fetch(`api/deck`, {
    method: 'DELETE',
    body: JSON.stringify({id:17}),
    headers: { 'Content-Type': 'application/json' },
  });
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