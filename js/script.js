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
const volBtnContainer = document.querySelector('.music__volume');
const volumeContainer = document.querySelector('.music__volume--container');
const volumeBar = document.querySelector('.music__volume--bar');
const volumeMute = document.querySelector('.vol-btn--mute');
const volumeHighest = document.querySelector('.vol-btn--highest');
const indicator = document.querySelector('.music__volume--indicator');

// initially load a song
let songIndex = 0;

loadSong();

// initially set a volume
audio.volume = 0.5

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

function updateVolume(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.volume = clickX / width;

  const volumeProgress = (clickX / width) * 100;
  volumeBar.style.width = `${volumeProgress}%`;

  const indicatorProgress = volumeProgress - 3; // scss line 136
  indicator.style.left = `${indicatorProgress}%`;
}

function toggleMute(){
  volumeMute.classList.toggle('muted');
  volumeHighest.classList.remove('highest'); // *

  if(volumeMute.classList.contains('muted')){
    audio.volume = 0;
    volumeBar.style.width = `0%`;
    indicator.style.left = `0%`;
    // volumeMute.querySelector('i').classList.replace('fa-volume-low', 'fa-volume-xmark');
    // volumeMute.style.marginRight = `-0.2rem`;
  } else{
    audio.volume = 0.5
    volumeBar.style.width = `48%`;
    indicator.style.left = `48%`;
    // volumeMute.querySelector('i').classList.replace('fa-volume-xmark', 'fa-volume-low');
  }
}

function toggleHighest(){
  volumeHighest.classList.toggle('highest');
  volumeMute.classList.remove('muted'); // *

  if(volumeHighest.classList.contains('highest')){
    audio.volume = 1;
    volumeBar.style.width = `100%`;
    indicator.style.left = `98%`;
  } else{
    audio.volume = 0.5
    volumeBar.style.width = `48%`;
    indicator.style.left = `48%`;
  }
}

// event listeners
playBtn.addEventListener('click', toggle);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgress); // * timeupdate
progressContainer.addEventListener('click', setProgress);
volumeContainer.addEventListener('click', updateVolume);
volumeMute.addEventListener('click', toggleMute);
volumeHighest.addEventListener('click', toggleHighest);