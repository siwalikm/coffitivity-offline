let audioFile, $pause, $play, _cachedSelectedMusicId ;
let subtextArr = ['Where do you want to be teleported?',
                  'Make your pick and start making things',
                  'Pick your mood before you make things',
                  'Listen awesome. Do awesome.',
                  'Be productive today, pick your mood!',
                  'Pick, before you start making things'];

let randomSubtext = subtextArr[Math.floor(Math.random() * subtextArr.length)];

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelector('.mainTitle__subtext').innerText = randomSubtext;
  $pause = document.querySelector('.pausePlayBtn.icon-pause');
  $play = document.querySelector('.pausePlayBtn.icon-play');

  document.querySelector('.pausePlayContainer').addEventListener("click", () => {
    if ($pause.style.visibility === 'visible') {
      audioFile.pause();
      $pause.style.visibility = 'hidden';
      $play.style.visibility = 'visible';
    } else {
      audioFile.play();
      $pause.style.visibility = 'visible';
      $play.style.visibility = 'hidden';
    }
  });

  document.querySelector('.icon-cancel').addEventListener("click", () => {
      document.querySelector('.page3').style.display = 'none';
  });
});

let playerPageFn = (id) => {
  let selectedMusicId = document.querySelector('#' + id);
  let selectedMusicTitle = selectedMusicId.querySelector('.musicOptBox__title').innerText;
  let selectedMusicDesc = selectedMusicId.querySelector('.musicOptBox__desc').innerText;

  if (_cachedSelectedMusicId === undefined) {
    audioFile = new Audio('../assets/' + id + '.mp3');
  } else if (_cachedSelectedMusicId !== selectedMusicId) {
    audioFile.src = '../assets/' + id + '.mp3';
  }
  audioFile.play();
  // The loop property is not always supported so add an event listener instead
  audioFile.addEventListener('ended', function() {
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
}

let landingPageFn = () => {
  document.querySelector('.page2').style.display = 'none';
  document.querySelector('.page1').style.display = 'block';
}

let aboutPageFn = () => {
  document.querySelector('.page3').style.display = 'block';
}
