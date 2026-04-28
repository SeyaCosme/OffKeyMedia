function go(page, event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  const sound = document.getElementById("keySound");
  const key = event && event.currentTarget ? event.currentTarget : null;

  if (key && key.classList) {
    key.classList.add("is-pressed");
  }

  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  setTimeout(() => {
    window.location.href = page;
  }, 200);
}

function submitBooking(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = form.querySelector("#name").value.trim() || "friend";
  const email = form.querySelector("#email").value.trim();
  const success = document.querySelector(".success");
  const formWrap = document.querySelector(".booking-form");

  document.querySelector("#successName").textContent = name;
  document.querySelector("#successEmail").textContent = email;
  formWrap.style.display = "none";
  success.classList.add("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetBooking() {
  const form = document.querySelector(".booking-form");
  const success = document.querySelector(".success");

  form.reset();
  form.style.display = "block";
  success.classList.remove("show");
}
