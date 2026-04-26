function go(page) {
  const sound = document.getElementById("sound");

  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }

  setTimeout(() => {
    window.location.href = page;
  }, 500);
}