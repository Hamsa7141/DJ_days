// app.js
const albumDisplay = document.getElementById('album-display');
const albumList = document.getElementById('album-items');
const addAlbumForm = document.getElementById('add-album-form');
const libraryStatus = document.getElementById('library-status');

let albums = [];

// Load albums from JSON file
fetch('albums.json')
  .then(response => response.json())
  .then(data => {
    albums = data;
    renderAlbumList();
    updateLibraryStatus();
  })
  .catch(error => console.error('Error loading albums:', error));

// Render album list
function renderAlbumList() {
  albumList.innerHTML = '';
  albums.forEach(album => {
    const listItem = document.createElement('li');
    listItem.textContent = `${album.title} - ${album.artist}`;
    listItem.addEventListener('click', () => {
      showAlbumDetails(album);
    });
    albumList.appendChild(listItem);
  });
}

// Show album details in the "Now Playing" section
function showAlbumDetails(album) {
  albumDisplay.innerHTML = `
    <img src="${album.coverUrl}" alt="${album.title} Cover Art">
    <h3>${album.title}</h3>
    <p>${album.artist}</p>
  `;
}

// Add new album
addAlbumForm.addEventListener('submit', event => {
  event.preventDefault();

  const title = document.getElementById('album-title').value;
  const artist = document.getElementById('album-artist').value;
  const genre = document.getElementById('album-genre').value;
  const coverUrl = document.getElementById('album-cover').value;

  const newAlbum = { title, artist, genre, coverUrl };
  albums.push(newAlbum);

  renderAlbumList();
  updateLibraryStatus();

  addAlbumForm.reset();
});

// Update library status message
function updateLibraryStatus() {
  const albumCount = albums.length;
  if (albumCount < 10) {
    libraryStatus.textContent = 'You need more albums to play a full set.';
  } else {
    libraryStatus.textContent = "You're ready to start playing your DJ set!";
  }
}