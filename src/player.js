let audioFile, $pause, $play;
let subtextArr = ['Where do you want to be teleported?',
                  'Make your pick',
                  'Pick your mood',
                  'Go for it',
                  'Listen awesome. Do awesome',
                  'Pick, before you start making things'];

let randomSubtext = subtextArr[Math.floor(Math.random() * subtextArr.length)];

let triggerPage2 = (id) => {
  if (audioFile != undefined) {
    audioFile.pause();
  }
  audioFile = new Audio('../assets/' + id + '.mp3');
  audioFile.play();
  audioFile.loop = true;
  $pause.style.visibility = 'visible';
  $play.style.visibility = 'hidden';
  let elem = document.querySelector('#' + id);
  let fetchedTitle = elem.querySelector('.musicOptBox__title').innerText;
  document.querySelector('.musicOptBox.p2')
    .querySelector('.musicOptBox__title')
    .innerText = fetchedTitle;

  let fetchedDesc = elem.querySelector('.musicOptBox__desc').innerText;
  document.querySelector('.musicOptBox.p2')
    .querySelector('.musicOptBox__desc')
    .innerText = fetchedDesc;


  document.querySelector('.p1').style.display = 'none';
  document.querySelector('.p2').style.display = 'block';
  document.querySelector('.musicOptBox.p2').style.display = 'block';
}

let triggerPage1 = () => {
  document.querySelector('.p2').style.display = 'none';
  document.querySelector('.p1').style.display = 'block';
}
document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector('.mainTitle__subtext').innerText = randomSubtext;
  $pause = document.querySelector('.pausePlayBtn.icon-pause');
  $play = document.querySelector('.pausePlayBtn.icon-play');
  document.querySelector('.pausePlayContainer').addEventListener("click", () => {
    if ($pause.style.visibility == 'visible') {
      audioFile.pause();
      $pause.style.visibility = 'hidden';
      $play.style.visibility = 'visible';
    } else {
      audioFile.play();
      $pause.style.visibility = 'visible';
      $play.style.visibility = 'hidden';
    }
  });
});

// document.querySelector('.pausePlayBtn').onclick = () => {

// };
