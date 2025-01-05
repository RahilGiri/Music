// Sample music data with real songs and working audio
const musicData = {
    songs: [
        {
            title: "Mooga Manasulu",
            artist: "Ed Sheeran",
            album: "Chill Mix",
            cover: "images/Mooga Manasulu .jpeg",
            audio: "audio/Mooga Manasulu - SenSongsMp3.Co.m4a"
        },
        {
            title: "Bekayali",
            artist: "Sachet–Parampara,Sachet Tandon",
            album: "Bekayalis",
            cover: "images/128Bekhayali - Kabir Singh 128 Kbps.jpg",
            audio: "audio/Kaise Hua - Kabir Singh 128 Kbps.mp3"
        },
        {
            title: "Phela Pyarr",
            artist: "Alex MakeMusic",
            album: "Electronic Vibes",
            cover: "images/phele pyar.jpeg",
            audio: "audio/Pehla Pyaar - Kabir Singh 128 Kbps copy.mp3"
        },
        
        {
            title: "Nuvvunte Naa",
            artist: "Music Unlimited",
            album: "Epic Collection",
            cover: "images/Nuvvunte Naa Jathagaa.jpeg",
            audio: "audio/Nuvvunte Naa Jathagaa.m4a"
        },
        {
            title: "Soulmate",
            artist: "FASSounds",
            album: "Folk Collection",
            cover: "images/Soulmate.jpeg",
            audio: "audio/Soulmate.m4a"
        },
        {
            title: "True Stories",
            artist: "SoulProd",
            album: "Ambient Waves",
            cover: "images/True Stories Ap Dhillon.jpeg",
            audio: "audio/True Stories Ap Dhillon 320 Kbps.m4a"
        },
        {
            title: "Yenti Yenti ",
            artist: "Lofi Sleep",
            album: "Jazz & Chill",
            cover: "images/Yenti Yenti.jpeg",
            audio: "audio/Yenti Yenti - SenSongsMp3.Co.m4a"
        },
        {
            title: "Kesariya",
            artist: "Beautiful Tunes",
            album: "Morning Mix",
            cover: "images/kesaraiya.jpeg",
            audio: "audio/videoplayback-mp3cut-net-57536.mp3"
        },
        {
            title: "Bekayali",
            artist: "Sachet–Parampara,Sachet Tandon",
            album: "Bekayalis",
            cover: "images/128Bekhayali - Kabir Singh 128 Kbps.jpg",
            audio: "audio/Kaise Hua - Kabir Singh 128 Kbps.mp3"
        },
        {
            title: "Phela Pyarr",
            artist: "Alex MakeMusic",
            album: "Electronic Vibes",
            cover: "images/phele pyar.jpeg",
            audio: "audio/Pehla Pyaar - Kabir Singh 128 Kbps copy.mp3"
        },
        {
            title: "Nuvvunte Naa",
            artist: "Music Unlimited",
            album: "Epic Collection",
            cover: "images/Nuvvunte Naa Jathagaa.jpeg",
            audio: "audio/Nuvvunte Naa Jathagaa.m4a"
        },
        {
            title: "Kesariya",
            artist: "Beautiful Tunes",
            album: "Morning Mix",
            cover: "images/kesaraiya.jpeg",
            audio: "audio/videoplayback-mp3cut-net-57536.mp3"
        },
     
        
    ],
    playlists: [
        {
            name: "Study & Focus",
            description: "Perfect for concentration",
            cover: "images/hum safar.jpeg",
            songs: ["Lofi Study", "Deep Focus", "Ambient Chill"]
        },
        {
            name: "Chill Vibes",
            description: "Relaxing beats for your day",
            cover: "images/phele bhi main.jpeg",
            songs: ["Morning Light", "Jazz Cafe", "Happy Folk"]
        },
        {
            name: "Energy Boost",
            description: "Upbeat tracks to energize",
            cover: "images/honey.jpeg",
            songs: ["Electronic Dance", "Upbeat Pop", "Summer Mood"]
        },
        {
            name: "Energy Boost",
            description: "Upbeat tracks to energize",
            cover: "images/phele bhi main.jpeg",
            songs: ["Electronic Dance", "Upbeat Pop", "Summer Mood"]
        },
        {
            name: "Bhakti",
            description: "Mix of different vibes",
            cover: "images/download.jpeg",
            songs: ["Cinematic Epic", "Deep Focus", "Jazz Cafe"]
        },
        

    ]
};

// Initialize liked songs and favorites in localStorage
if (!localStorage.getItem('likedSongs')) {
    localStorage.setItem('likedSongs', JSON.stringify([]));
}
if (!localStorage.getItem('favoriteSongs')) {
    localStorage.setItem('favoriteSongs', JSON.stringify([]));
}

// Initialize liked songs playlist if it doesn't exist
if (!musicData.playlists.find(p => p.name === "Liked Songs")) {
    musicData.playlists.push({
        name: "Liked Songs",
        description: "Your favorite tracks",
        cover: "images/liked-songs.jpeg",
        songs: []
    });
}

// Audio player
let audioPlayer = new Audio();
let isPlaying = false;
let currentSong = null;
let currentView = 'home';

// DOM Elements
const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progress');
const volumeBar = document.querySelector('.volume-bar');
const currentTimeSpan = document.querySelector('.current-time');
const totalTimeSpan = document.querySelector('.total-time');
const mainContent = document.querySelector('.content');

// Audio player functions
function playSong(title) {
    const song = musicData.songs.find(s => s.title === title);
    if (song) {
        if (currentSong?.title !== song.title) {
            audioPlayer.src = song.audio;
            currentSong = song;
            updateNowPlaying(song);
            
            // Remove playing class from all cards
            document.querySelectorAll('.card').forEach(card => card.classList.remove('playing'));
            // Add playing class to current song card
            document.querySelector(`.card[data-title="${song.title}"]`)?.classList.add('playing');
        }
        
        togglePlay();
    }
}

function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                alert('Error playing audio. Please try again.');
            });
    } else {
        audioPlayer.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Progress bar interaction
progressBar.addEventListener('click', (e) => {
    const progressBarWidth = progressBar.clientWidth;
    const clickPosition = e.offsetX;
    const percentageClicked = clickPosition / progressBarWidth;
    audioPlayer.currentTime = percentageClicked * audioPlayer.duration;
});

// Volume control
volumeBar.addEventListener('click', (e) => {
    const volumeBarWidth = volumeBar.clientWidth;
    const clickPosition = e.offsetX;
    const newVolume = clickPosition / volumeBarWidth;
    audioPlayer.volume = newVolume;
    document.querySelector('.volume-filled').style.width = `${newVolume * 100}%`;
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.querySelector('.progress-filled').style.width = `${progress}%`;
    currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    totalTimeSpan.textContent = formatTime(audioPlayer.duration);
});

// Handle audio ended
audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    // Optionally play next song
    playNextSong();
});

function playNextSong() {
    if (!currentSong) return;
    const currentIndex = musicData.songs.findIndex(s => s.title === currentSong.title);
    const nextSong = musicData.songs[(currentIndex + 1) % musicData.songs.length];
    playSong(nextSong.title);
}

// Format time in MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Navigation functions
function renderHome() {
    mainContent.innerHTML = `
        <div class="recently-played">
            <h2>Popular Tracks</h2>
            <div class="card-grid">
                ${musicData.songs.map(song => renderSongCard(song)).join('')}
            </div>
        </div>
    `;
}

function renderSearch() {
    mainContent.innerHTML = `
        <h1>Search</h1>
        <div class="search-container">
            <input type="text" id="searchInput" placeholder="Search for songs, artists, or albums..." 
                   style="width: 100%; padding: 12px; border-radius: 20px; border: none; background: var(--background-light); color: var(--text-primary); margin: 20px 0;">
            <div id="searchResults" class="card-grid"></div>
        </div>
    `;

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const results = searchMusic(e.target.value);
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = results.map(song => `
            <div class="card" onclick="playSong('${song.title}')">
                <img src="${song.cover}" alt="${song.title}">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `).join('');
    });
}

function renderLibrary() {
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs'));
    
    mainContent.innerHTML = `
        <h1>Your Library</h1>
        <div class="library-section">
            <h2>Liked Songs</h2>
            <div class="song-list">
                ${renderSongList(likedSongs)}
            </div>
        </div>
        <div class="library-section">
            <h2>Favorites</h2>
            <div class="song-list">
                ${renderSongList(favoriteSongs)}
            </div>
        </div>
        <div class="library-section">
            <h2>Your Playlists</h2>
            <div class="card-grid">
                ${musicData.playlists.map(playlist => `
                    <div class="card">
                        <div onclick="openPlaylist('${playlist.name}')" style="cursor: pointer;">
                            <img src="${playlist.cover}" alt="${playlist.name}">
                            <h4>${playlist.name}</h4>
                            <p>${playlist.description}</p>
                        </div>
                        <button onclick="deletePlaylist(event, '${playlist.name}')" class="delete-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Function to toggle like status of a song
function toggleLike(event, songTitle) {
    event.stopPropagation();
    let likedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    const songIndex = likedSongs.indexOf(songTitle);
    
    if (songIndex === -1) {
        likedSongs.push(songTitle);
        showNotification(`Added "${songTitle}" to Liked Songs`);
    } else {
        likedSongs.splice(songIndex, 1);
        showNotification(`Removed "${songTitle}" from Liked Songs`);
    }
    
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    renderCurrentView();
}

// Function to toggle favorite status of a song
function toggleFavorite(event, songTitle) {
    event.stopPropagation();
    let favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs'));
    const songIndex = favoriteSongs.indexOf(songTitle);
    
    if (songIndex === -1) {
        favoriteSongs.push(songTitle);
        showNotification(`Added "${songTitle}" to Favorites`);
    } else {
        favoriteSongs.splice(songIndex, 1);
        showNotification(`Removed "${songTitle}" from Favorites`);
    }
    
    localStorage.setItem('favoriteSongs', JSON.stringify(favoriteSongs));
    renderCurrentView();
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Function to render song card with like and favorite buttons
function renderSongCard(song) {
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs'));
    const isLiked = likedSongs.includes(song.title);
    const isFavorite = favoriteSongs.includes(song.title);
    
    return `
        <div class="card ${currentSong?.title === song.title ? 'playing' : ''}" data-title="${song.title}">
            <div onclick="playSong('${song.title}')" style="cursor: pointer;">
                <img src="${song.cover}" alt="${song.title}">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
                ${currentSong?.title === song.title ? '<div class="playing-indicator"><i class="fas fa-volume-up"></i></div>' : ''}
            </div>
            <div class="song-actions">
                <button onclick="toggleLike(event, '${song.title}')" class="like-btn ${isLiked ? 'active' : ''}" title="Like">
                    <i class="fas fa-heart"></i>
                </button>
                <button onclick="toggleFavorite(event, '${song.title}')" class="favorite-btn ${isFavorite ? 'active' : ''}" title="Add to Favorites">
                    <i class="fas fa-star"></i>
                </button>
            </div>
        </div>
    `;
}

// Function to render song list with like and favorite buttons
function renderSongList(songs) {
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    const favoriteSongs = JSON.parse(localStorage.getItem('favoriteSongs'));
    
    return songs.map((songTitle, index) => {
        const song = musicData.songs.find(s => s.title === songTitle);
        if (!song) return '';
        const isLiked = likedSongs.includes(song.title);
        const isFavorite = favoriteSongs.includes(song.title);
        
        return `
            <div class="song-item">
                <div onclick="playSong('${song.title}')" style="display: flex; align-items: center; padding: 10px; border-radius: 5px; cursor: pointer; transition: background 0.3s; flex-grow: 1;">
                    <span>${index + 1}</span>
                    <img src="${song.cover}" alt="${song.title}" style="width: 40px; height: 40px; margin: 0 10px;">
                    <div>
                        <h4>${song.title}</h4>
                        <p>${song.artist}</p>
                    </div>
                </div>
                <div class="song-actions">
                    <button onclick="toggleLike(event, '${song.title}')" class="like-btn ${isLiked ? 'active' : ''}" title="Like">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button onclick="toggleFavorite(event, '${song.title}')" class="favorite-btn ${isFavorite ? 'active' : ''}" title="Add to Favorites">
                        <i class="fas fa-star"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function openPlaylist(playlistName) {
    const playlist = musicData.playlists.find(p => p.name === playlistName);
    const likedPlaylist = musicData.playlists.find(p => p.name === "Liked Songs");
    mainContent.innerHTML = `
        <div class="playlist-header" style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
            <img src="${playlist.cover}" alt="${playlist.name}" style="width: 200px; height: 200px; border-radius: 10px;">
            <div>
                <h1>${playlist.name}</h1>
                <p>${playlist.description}</p>
            </div>
        </div>
        <div class="song-list">
            ${playlist.songs.length ? playlist.songs.map((songTitle, index) => {
                const song = musicData.songs.find(s => s.title === songTitle);
                return `
                    <div class="song-item">
                        <div onclick="playSong('${song.title}')" style="display: flex; align-items: center; padding: 10px; border-radius: 5px; cursor: pointer; transition: background 0.3s; flex-grow: 1;">
                            <span>${index + 1}</span>
                            <img src="${song.cover}" alt="${song.title}" style="width: 40px; height: 40px; margin: 0 10px;">
                            <div>
                                <h4>${song.title}</h4>
                                <p>${song.artist}</p>
                            </div>
                        </div>
                        <button onclick="toggleLike(event, '${song.title}')" class="like-btn ${likedPlaylist.songs.includes(song.title) ? 'active' : ''}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                `;
            }).join('') : '<p>No songs in this playlist yet</p>'}
        </div>
    `;
}

// Function to delete playlist
function deletePlaylist(event, playlistName) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete "${playlistName}"?`)) {
        const index = musicData.playlists.findIndex(p => p.name === playlistName);
        if (index !== -1) {
            musicData.playlists.splice(index, 1);
            showNotification(`Deleted playlist "${playlistName}"`);
            renderLibrary();
        }
    }
}

// Function to remove a song from a playlist
function removeSongFromPlaylist(event, playlistName, songTitle) {
    event.stopPropagation();
    const playlist = musicData.playlists.find(p => p.name === playlistName);
    if (playlist) {
        const songIndex = playlist.songs.indexOf(songTitle);
        if (songIndex !== -1) {
            playlist.songs.splice(songIndex, 1);
            showNotification(`Removed "${songTitle}" from ${playlistName}`);
            openPlaylist(playlistName); // Refresh the playlist view
        }
    }
}

// Modified renderLibrary function to include delete buttons
function renderLibrary() {
    mainContent.innerHTML = `
        <h1>Your Library</h1>
        <div class="library-container">
            <div class="card-grid">
                ${musicData.playlists.map(playlist => `
                    <div class="card">
                        <div onclick="openPlaylist('${playlist.name}')" style="cursor: pointer;">
                            <img src="${playlist.cover}" alt="${playlist.name}">
                            <h4>${playlist.name}</h4>
                            <p>${playlist.description}</p>
                        </div>
                        <button onclick="deletePlaylist(event, '${playlist.name}')" class="delete-btn" title="Delete Playlist">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Modified openPlaylist function to include delete button
function openPlaylist(playlistName) {
    const playlist = musicData.playlists.find(p => p.name === playlistName);
    mainContent.innerHTML = `
        <div class="playlist-header" style="display: flex; align-items: center; gap: 20px; margin-bottom: 30px;">
            <img src="${playlist.cover}" alt="${playlist.name}" style="width: 200px; height: 200px; border-radius: 10px;">
            <div style="flex-grow: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h1>${playlist.name}</h1>
                        <p>${playlist.description}</p>
                    </div>
                    <button onclick="deletePlaylist(event, '${playlist.name}')" class="delete-btn" style="width: 40px; height: 40px;" title="Delete Playlist">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="song-list">
            ${playlist.songs.length ? playlist.songs.map((songTitle, index) => {
                const song = musicData.songs.find(s => s.title === songTitle);
                if (!song) return '';
                return `
                    <div class="song-item" style="display: flex; align-items: center; padding: 12px 20px; margin-bottom: 8px; border-radius: 8px; background: var(--background-dark); transition: all 0.2s;">
                        <div onclick="playSong('${song.title}')" style="display: flex; align-items: center; gap: 20px; flex-grow: 1; cursor: pointer;">
                            <span style="color: var(--text-secondary); width: 24px;">${index + 1}</span>
                            <img src="${song.cover}" alt="${song.title}" style="width: 56px; height: 56px; border-radius: 4px; object-fit: cover;">
                            <div>
                                <h4 style="margin: 0; font-size: 1rem;">${song.title}</h4>
                                <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 0.9rem;">${song.artist}</p>
                            </div>
                        </div>
                        <div class="song-actions" style="display: flex; gap: 8px;">
                            <button onclick="removeSongFromPlaylist(event, '${playlist.name}', '${song.title}')" class="delete-btn" style="background: transparent;" title="Remove from Playlist">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('') : '<p class="no-songs">No songs in this playlist yet</p>'}
        </div>
    `;
}

// Navigation event listeners
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
    item.addEventListener('click', () => {
        const navItems = document.querySelectorAll('.sidebar nav ul li');
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        const text = item.textContent.trim();
        switch (text) {
            case 'Home':
                renderHome();
                break;
            case 'Search':
                renderSearch();
                break;
            case 'Your Library':
                renderLibrary();
                break;
            case 'Create Playlist':
                createPlaylist();
                break;
            case 'Liked Songs':
                showLikedSongs();
                break;
        }
    });
});

// Playlist click handlers
document.querySelectorAll('.playlist-list ul li').forEach(item => {
    item.addEventListener('click', () => {
        openPlaylist(item.textContent);
    });
});

// Function to update now playing
function updateNowPlaying(song) {
    const nowPlayingImg = document.querySelector('.now-playing img');
    const trackName = document.querySelector('.track-info h4');
    const artistName = document.querySelector('.track-info p');

    nowPlayingImg.src = song.cover;
    trackName.textContent = song.title;
    artistName.textContent = song.artist;
}

// Search functionality (basic implementation)
function searchMusic(query) {
    // Filter songs based on query
    return musicData.songs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );
}

// Toggle play/pause
playBtn.addEventListener('click', () => {
    togglePlay();
});

// Initialize the application
function init() {
    renderHome();
}

// Call init when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Auth UI Elements
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const switchToSignup = document.querySelector('.switch-to-signup');
const switchToLogin = document.querySelector('.switch-to-login');
const userMenu = document.querySelector('.user-menu');
const authButtons = document.querySelector('.auth-buttons');
const content = document.querySelector('.content');

// Show/Hide Form Functions
function showForm(form) {
    // Hide both forms first
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    content.classList.remove('active');
    
    // Show the requested form
    form.classList.add('active');
}

function hideAuthForms() {
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    content.classList.add('active');
}

// Event Listeners for Auth UI
loginBtn.addEventListener('click', () => showForm(loginForm));
signupBtn.addEventListener('click', () => showForm(signupForm));

switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(signupForm);
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showForm(loginForm);
});

// Handle Form Submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('loginName').value;
    const email = document.getElementById('loginEmail').value;
    
    // Update UI for logged in user
    updateUIForLoggedInUser(name);
    hideAuthForms();
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    
    // Update UI for logged in user
    updateUIForLoggedInUser(name);
    hideAuthForms();
});

// Update UI after login/signup
function updateUIForLoggedInUser(name) {
    authButtons.style.display = 'none';
    userMenu.style.display = 'block';
    const userNameSpan = document.querySelector('.profile-btn span');
    userNameSpan.textContent = name;
}

// Handle logout
const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Update UI for logged out state
    authButtons.style.display = 'flex';
    userMenu.style.display = 'none';
    hideAuthForms();
    
    // Clear form fields
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
});

// Initially hide the user menu and show content
userMenu.style.display = 'none';
content.classList.add('active');

// Function to create playlist with song selection
function createPlaylist() {
    const playlistName = prompt('Enter playlist name:');
    if (!playlistName) return;

    // Create playlist selection UI
    mainContent.innerHTML = `
        <div class="create-playlist-view">
            <h1>Create Playlist: ${playlistName}</h1>
            <div class="song-selection">
                <h2>Select Songs</h2>
                <div class="song-list">
                    ${musicData.songs.map((song, index) => `
                        <div class="song-item">
                            <label class="song-select">
                                <input type="checkbox" value="${song.title}" class="song-checkbox">
                                <div class="song-info">
                                    <span>${index + 1}</span>
                                    <img src="${song.cover}" alt="${song.title}">
                                    <div>
                                        <h4>${song.title}</h4>
                                        <p>${song.artist}</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    `).join('')}
                </div>
                <div class="playlist-actions">
                    <button onclick="savePlaylist('${playlistName}')" class="save-playlist-btn">
                        Create Playlist
                    </button>
                    <button onclick="renderLibrary()" class="cancel-btn">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to save the created playlist
function savePlaylist(playlistName) {
    const selectedSongs = Array.from(document.querySelectorAll('.song-checkbox:checked'))
        .map(checkbox => checkbox.value);
    
    if (selectedSongs.length === 0) {
        showNotification('Please select at least one song');
        return;
    }

    const newPlaylist = {
        name: playlistName,
        description: `Created on ${new Date().toLocaleDateString()}`,
        cover: 'images/default-playlist.jpeg',
        songs: selectedSongs
    };

    musicData.playlists.push(newPlaylist);
    showNotification(`Created playlist "${playlistName}" with ${selectedSongs.length} songs`);
    renderLibrary();
}

// Function to show liked songs
function showLikedSongs() {
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
    
    mainContent.innerHTML = `
        <div class="liked-songs-view">
            <div class="section-header">
                <h1>Liked Songs</h1>
                <p>${likedSongs.length} songs</p>
            </div>
            <div class="song-list">
                ${likedSongs.length ? likedSongs.map((songTitle, index) => {
                    const song = musicData.songs.find(s => s.title === songTitle);
                    if (!song) return '';
                    return `
                        <div class="song-item" style="display: flex; align-items: center; padding: 12px 20px; margin-bottom: 8px; border-radius: 8px; background: var(--background-dark); transition: all 0.2s;">
                            <div onclick="playSong('${song.title}')" style="display: flex; align-items: center; gap: 20px; flex-grow: 1; cursor: pointer;">
                                <span style="color: var(--text-secondary); width: 24px;">${index + 1}</span>
                                <img src="${song.cover}" alt="${song.title}" style="width: 56px; height: 56px; border-radius: 4px; object-fit: cover;">
                                <div>
                                    <h4 style="margin: 0; font-size: 1rem;">${song.title}</h4>
                                    <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 0.9rem;">${song.artist}</p>
                                </div>
                            </div>
                            <div class="song-actions" style="display: flex; gap: 8px;">
                                <button onclick="toggleLike(event, '${song.title}')" class="like-btn active" style="background: transparent;">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }).join('') : '<p class="no-songs">No liked songs yet</p>'}
            </div>
        </div>
    `;
}
