function setupPlaylist(playlistElement) {
  const videoElement = playlistElement.querySelector('video');
  const videoSourceElement = videoElement.getElementsByTagName('source')[0];
  const buttonElements = playlistElement.querySelectorAll('button');

  function updateButtons() {
    buttonElements.forEach((buttonElement) => {
      if (videoSourceElement.src.includes(buttonElement.dataset.playlistTarget)) {
        buttonElement.classList.add('--playing');
      } else {
        buttonElement.classList.remove('--playing');
      }
    });
  }

  buttonElements.forEach((buttonElement) => {
    buttonElement.addEventListener('click', function() {
      videoSourceElement.src = buttonElement.dataset.playlistTarget;
      videoElement.load();
      videoElement.play();
      updateButtons();
    });
  });

  updateButtons();
}

(function() {
  const elements = document.querySelectorAll('[data-playlist]');

  elements.forEach((element) => setupPlaylist(element));
})();
