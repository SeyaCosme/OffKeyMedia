function go(page) {
  const sound = document.getElementById("keySound");

  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }

  setTimeout(() => {
    window.location.href = page;
  }, 300);
}

// 🎬 SCROLL REVEAL (FOR EVERYTHING)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade-up, .why-image-side img").forEach(el => {
  observer.observe(el);
});