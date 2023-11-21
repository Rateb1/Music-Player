const image = document.querySelector("img");
const title = document.getElementById("title");
const music = document.querySelector("audio");
const artist = document.getElementById("artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const progressContainer = document.getElementById("progress-container");

// List
const song = [
  {
    name: "Rateb-1",
    Displayname: "Baby Calm Down",
    artist: "Selena Gomez",
  },
  {
    name: "Rateb-2",
    Displayname: "Friday Night",
    artist: "Rena Toni",
  },
  {
    name: "Rateb-3",
    Displayname: "Baby My Valentine",
    artist: "Tom Jackson",
  },
  {
    name: "Rateb-4",
    Displayname: "Treat you better",
    artist: "Shawn Mendes",
  },
];

// If
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//   Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//   Play or Pause Event
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update
function loadSong(song) {
  title.textContent = song.Displayname;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.m4a`;
  image.src = `img/${song.name}.jpg`;
}

// current
let currentIndex = 0;

// Prev Song
function prevSong() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = song.length - 1;
  }
  loadSong(song[currentIndex]);
  playSong();
}

// next Song
function nextSong() {
  currentIndex++;
  if (currentIndex > song.length - 1) {
    currentIndex = 0;
  }
  loadSong(song[currentIndex]);
  playSong();
}

// Save
loadSong(song[currentIndex]);

// Progress
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }
    if (durationSec) {
      durationEl.textContent = `${durationMin}:${durationSec}`;
    }
    const currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    currentTimeEl.textContent = `${currentMin}:${currentSec}`;
  }
}

// Set Progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
}

// Event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgress);
