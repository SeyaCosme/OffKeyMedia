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
  const phone = form.querySelector("#phone").value.trim();
  const eventDate = form.querySelector("#eventDate").value;
  const eventType = form.querySelector("#eventType").value.trim();
  const details = form.querySelector("#details").value.trim();
  const bookingRecipient = "offkeymediafilms@gmail.com";
  const success = document.querySelector(".success");
  const formWrap = document.querySelector(".booking-form");
  const subject = encodeURIComponent(`Booking Request from ${name}`);
  const body = encodeURIComponent(
    `New OFF-KEY MEDIA booking request\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || "Not provided"}\n` +
    `Event Date: ${eventDate}\n` +
    `Event / Shoot Type: ${eventType}\n\n` +
    `Project Details:\n${details}`
  );

  document.querySelector("#successName").textContent = name;
  document.querySelector("#successEmail").textContent = email;
  formWrap.style.display = "none";
  success.classList.add("show");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (!bookingRecipient.includes("REPLACE_WITH_HIS_EMAIL")) {
    window.location.href = `mailto:${bookingRecipient}?subject=${subject}&body=${body}`;
  }
}

function resetBooking() {
  const form = document.querySelector(".booking-form");
  const success = document.querySelector(".success");

  form.reset();
  form.style.display = "block";
  success.classList.remove("show");
}

const mediaSlides = {
  film: {
    type: "Films",
    title: 'OFF-<span class="brand-key">KEY</span> MEDIA',
    description: "Narrative pieces, trailers, and cinematic ideas in motion.",
    image: "floandhiscam.jpg",
    className: "is-film",
  },
  events: {
    type: "Events",
    title: "Crowds. Rooms. Moments.",
    description: "Event coverage that feels alive without showing too much too soon.",
    image: "flostanding.jpg",
    className: "is-events",
  },
  photos: {
    type: "Photos",
    title: "Still Frames",
    description: "Portraits, posters, and images that move like memory.",
    image: "floandhiscam.jpg",
    className: "is-photos",
  },
};

function setMediaSlide(name) {
  const slide = mediaSlides[name];
  const screen = document.querySelector("#mediaScreen");
  const photo = document.querySelector("#mediaPhoto");
  const type = document.querySelector("#mediaType");
  const title = document.querySelector("#mediaTitle");
  const description = document.querySelector("#mediaDescription");

  if (!slide || !screen || !photo || !type || !title || !description) return;

  document.querySelectorAll(".media-bubble").forEach((button) => {
    button.classList.toggle("active", button.dataset.media === name);
  });

  screen.className = `media-screen ${slide.className}`;
  photo.src = slide.image;
  type.textContent = slide.type;
  title.innerHTML = slide.title;
  description.textContent = slide.description;
}

document.querySelectorAll(".media-bubble").forEach((button) => {
  button.addEventListener("click", () => setMediaSlide(button.dataset.media));
});

if (document.querySelector("#mediaScreen")) {
  const order = ["film", "events", "photos"];
  let index = 0;

  setInterval(() => {
    const active = document.querySelector(".media-bubble.active");
    index = active ? order.indexOf(active.dataset.media) : index;
    index = (index + 1) % order.length;
    setMediaSlide(order[index]);
  }, 6500);
}

document.querySelectorAll('iframe[src*="youtube.com/embed"]').forEach((iframe) => {
  iframe.addEventListener("load", () => {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "mute", args: [] }),
      "*"
    );
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*"
    );
  });
});

document.querySelectorAll('iframe[src*="drive.google.com"]').forEach((iframe) => {
  iframe.setAttribute("allow", "fullscreen");
});
