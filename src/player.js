let audioFile, $pause, $play, _cachedSelectedMusicId, volume;
let subtextArr = ['Where do you want to be teleported?',
  'Make your pick and start making things',
  'Pick your mood before you make things',
  'Listen awesome. Do awesome.',
  'Be productive today, pick your mood!',
  'Pick, before you start making things'
];

let randomSubtext = subtextArr[Math.floor(Math.random() * subtextArr.length)];


$pause = document.querySelector('.pausePlayBtn.icon-pause');
$play = document.querySelector('.pausePlayBtn.icon-play');

let playAudio = () => {
  if ($pause.style.visibility === 'visible') {
    audioFile.pause();
    $pause.style.visibility = 'hidden';
    $play.style.visibility = 'visible';
  } else {
    audioFile.play();
    $pause.style.visibility = 'visible';
    $play.style.visibility = 'hidden';
  }
};
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.mainTitle__subtext').innerText = randomSubtext;
  $pause = document.querySelector('.pausePlayBtn.icon-pause');
  $play = document.querySelector('.pausePlayBtn.icon-play');

  document.querySelector('.pausePlayContainer').addEventListener('click', () => {
    playAudio();
  });

  document.querySelector('.icon-cancel').addEventListener('click', () => {
    document.querySelector('.page3').style.display = 'none';
  });

  volume = localStorage.getItem('volume') === null ? 1 : localStorage.getItem('volume');
  document.getElementById('volumeControl').value = volume;
});

window.addEventListener('keydown', function (e) {
  if (e.keyCode === 80 || e.keyCode === 32) {
    // keycode for 'p' button or 'spacebar' to pause-play
    e.preventDefault();
    playAudio();
  }

  if (e.keyCode === 37) {
    // keycode for 'left-arrow' button for menu-page
    e.preventDefault();
    landingPageFn();
  }

  if (e.keyCode === 39) { // keycode for 'right-arrow' button player-page
    e.preventDefault();
    playerPageFn(localStorage.getItem('musicId'));
  }
});

let playerPageFn = (id) => {
  localStorage.setItem('musicId', id);
  let selectedMusicId = document.querySelector('#' + id);
  let selectedMusicTitle = selectedMusicId.querySelector('.musicOptBox__title').innerText;
  let selectedMusicDesc = selectedMusicId.querySelector('.musicOptBox__desc').innerText;

  if (_cachedSelectedMusicId === undefined) {
    audioFile = new Audio('../assets/' + id + '.mp3');
  } else if (_cachedSelectedMusicId !== selectedMusicId) {
    audioFile.src = '../assets/' + id + '.mp3';
  }
  audioFile.play();
  audioFile.volume = volume;
  // The loop property is not always supported so add an event listener instead
  audioFile.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
  $pause.style.visibility = 'visible';
  $play.style.visibility = 'hidden';

  document.querySelector('.musicOptBox.page2')
    .querySelector('.musicOptBox__title')
    .innerText = selectedMusicTitle;

  document.querySelector('.musicOptBox.page2')
    .querySelector('.musicOptBox__desc')
    .innerText = selectedMusicDesc;

  document.querySelector('.page1').style.display = 'none';
  document.querySelector('.page2').style.display = 'block';
  document.querySelector('.musicOptBox.page2').style.display = 'block';
  _cachedSelectedMusicId = selectedMusicId;
};

let landingPageFn = () => {
  document.querySelector('.page2').style.display = 'none';
  document.querySelector('.page1').style.display = 'block';
};

let aboutPageFn = () => { //  eslint-disable-line
  document.querySelector('.page3').style.display = 'block';
};

let changeVolumeFn = (event) => {
  volume = event.currentTarget.value;
  // Saving volume
  localStorage.setItem('volume', volume);
  if (audioFile) {
    audioFile.volume = volume;
  }
  let volumeIcon = document.getElementById('volume-icon');
  if (volume === '0') {
    volumeIcon.src = __dirname + '/../assets/mute-volume.png';
  } else {
    volumeIcon.src = __dirname + '/../assets/volume.png';
  }
};
