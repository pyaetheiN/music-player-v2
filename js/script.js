const songs = ['Arctic Monkeys - I Wanna Be Yours','Daft Punk - Get Lucky','Eurythmics - Sweet Dreams'];
const prevBtn = document.querySelector('.prev');
const playBtn = document.querySelector('.play');
const nextBtn = document.querySelector('.next');
const container = document.querySelector('.music__container');
const info = document.querySelector('.music__info');
const musicName = document.querySelector('.music__info--name');
const audio = document.querySelector('.music__audio');
const cover = document.querySelector('.music__cover');
const progressContainer = document.querySelector('.music__progress');
const progressBar = document.querySelector('.music__progress--bar');

// initially load song
let songIndex = 0;

loadSong();

// functions
function loadSong(){
  musicName.innerText = `${songs[songIndex]}`;
  cover.src = `./images/${songs[songIndex]}.jpg`;
  audio.src = `./music/${songs[songIndex]}.mp3`;
}

function toggle(){
  if(container.classList.contains('play')){
    container.classList.remove('play');
    pauseSong();
  } else{
    container.classList.add('play');
    playSong();
  }
}

function pauseSong(){
  playBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
  container.classList.remove('play'); // * play
  audio.pause();
}

function playSong(){
  playBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
  container.classList.add('play'); // * play
  audio.play();
}

function prevSong(){
  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(){
  songIndex++;

  if(songIndex > songs.length - 1){
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e){
  // console.log(e.srcElement.currentTime);
  const {currentTime, duration} = e.srcElement;
  const progressElement = (currentTime / duration) * 100;
  progressBar.style.width = `${progressElement}%`;
}

function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration; // * currentTime
}

// event listeners
playBtn.addEventListener('click', toggle);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress); // * timeupdate
progressContainer.addEventListener('click', setProgress);