let song_title = document.getElementById("song-title");

let playpause = document.getElementById("playpause");
let stop = document.getElementById("stop");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let music_player = document.getElementById("music-player");
let list = document.getElementById("list");

let volume = document.getElementById("volume");
let volume_slider = document.querySelector(".volume-slider");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let isMuted = false;
let lastVol = .5;
let listOpen = false;
let tableElem;

// Create the audio element for the player
let curr_track = document.createElement('audio');

let track_list = [
  {
      name:"drops. - 中山真斗(Elements Garden)",
      path:"https://files.catbox.moe/ac3zld.mp3"
  },
  {
    name:"Yuuguredoki no Gekou - Masaru Yokoyama",
    path:"https://files.catbox.moe/nzp0bl.mp3"
  },
  {
      name:"Minatomachi - Toshihiko Sahashi",
      path:"https://files.catbox.moe/y5xkty.mp3"
  },
  {
      name: "Osanpo desu - Masaki Kurihara",
      path: "https://files.catbox.moe/v4t1tq.mp3",
  },
];

function loadTrack() {
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  setVolume();
  
  // Update details of the track
  song_title.textContent = track_list[track_index].name;
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}
 
function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
  
  // Replace icon with the pause icon
  playpause.innerHTML = '<img src="https://files.catbox.moe/nd63cb.png">';
}
    
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
  
  // Replace icon with the play icon
  playpause.innerHTML = '<img src="https://files.catbox.moe/l4vvwd.png">';
}

function stopTrack() {
  track_index = 0;
  pauseTrack();
  loadTrack();
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}
  
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
  
  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function setVolume() {
  curr_track.volume = volume_slider.value;
  if (curr_track.volume == 0) {
    lastVol = 0.5;
    mute();
  } else if (isMuted == true) {
    unmute();
  }
}

function mute() {
  volume.innerHTML = '<img src="https://files.catbox.moe/3fe3rz.png">';
  curr_track.volume = 0;
  volume_slider.value = 0;
  isMuted = true;
}

function unmute() {
  volume.innerHTML = '<img src="https://files.catbox.moe/tb934i.png">';
  isMuted = false;
}

function muteToggle() {
  if (isMuted) {
    curr_track.volume = lastVol;
    volume_slider.value = lastVol;
    unmute();
  } else {
    lastVol = curr_track.volume;
    mute();
  }
}

function listToggle() {

  if (listOpen) {
    tableElem.remove();
    listOpen = false;
  } else {
    if (!tableElem) {
      tableElem = document.createElement('table');
      caption = document.createElement('caption');
      caption.textContent = "tracklist";
      tableElem.appendChild(caption);
      track_list.forEach((track, index) => {
        row = tableElem.insertRow();
        count = row.insertCell();
        count.textContent = index+1 + ". ";
        trackElem = row.insertCell();
        trackElem.textContent = track.name;
      })
    }
    music_player.append(tableElem);
    listOpen = true;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);