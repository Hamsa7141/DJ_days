// Define variables to hold album data and references to DOM elements
let albums = [];
const albumCoverImg = document.getElementById('album-cover-img');
const albumTitleElem = document.getElementById('album-title');
const albumArtistElem = document.getElementById('album-artist');
const albumListUl = document.getElementById('album-list-ul');
const addAlbumForm = document.getElementById('add-album-form');
const libraryStatusMessage = document.getElementById('library-status-message');

// Function to render the album list
function renderAlbumList() {
    albumListUl.innerHTML = '';
    albums.forEach(album => {
        const li = document.createElement('li');
        li.textContent = `${album.title} - ${album.artist}`;
        li.addEventListener('click', () => {
            updateNowPlaying(album);
        });
        albumListUl.appendChild(li);
    });
}

// Function to update the "Now Playing" display
function updateNowPlaying(album) {
    albumCoverImg.src = album.coverArtURL;
    albumTitleElem.textContent = album.title;
    albumArtistElem.textContent = album.artist;
}

// Function to check the library status and display the appropriate message
function checkLibraryStatus() {
    if (albums.length < 10) {
        libraryStatusMessage.textContent = 'You need more albums to play a full set.';
    } else {
        libraryStatusMessage.textContent = 'You\'re ready to start playing your DJ set!';
    }
}

// Event listener for the "Add Album" form submission
addAlbumForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('album-title-input').value;
    const artist = document.getElementById('album-artist-input').value;
    const genre = document.getElementById('album-genre-input').value;
    const coverArtURL = document.getElementById('album-cover-input').value;

    const newAlbum = {
        title,
        artist,
        genre,
        coverArtURL
    };

    albums.push(newAlbum);
    renderAlbumList();
    checkLibraryStatus();
    addAlbumForm.reset();
});

// Render the album list and check the library status initially
renderAlbumList();
checkLibraryStatus();