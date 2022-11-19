const prevBtn = document.querySelector('.prev');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const container = document.querySelector('.music__container');
const info = document.querySelector('.music__info');
const musicName = document.querySelector('.music__name');
const audio = document.querySelector('.music__audio');
const cover = document.querySelector('.music__cover');

// load song
let songIndex = 1;

const songs = [
  'Arctic Monkeys - I Wanna Be Yours',
  'Daft Punk - Get Lucky',
  'Eurythmics - Sweet Dreams'
];

function loadSong(){
  musicName.innerText = `${songs[songIndex]}`;
  cover.src = `./images/${songs[songIndex]}.jpg`;
  audio.src = `./music/${songs[songIndex]}.mp3`;
}

loadSong();

// event listeners
playBtn.addEventListener('click', () => {
  if(container.classList.contains('play')){
    container.classList.remove('play');
    pauseSong();
  } else{
    container.classList.add('play');
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

// functions
function pauseSong(){
  playBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
  audio.pause();
}

function playSong(){
  playBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
  audio.play();
}

function prevSong(){
  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length - 1;
  }

  loadSong();
  playSong();
}

function nextSong(){
  songIndex++;

  if(songIndex > songs.length - 1){
    songIndex = 0;
  }

  loadSong();
  playSong();
}