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

async function submitBooking(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const name = form.querySelector("#name").value.trim() || "friend";
  const email = form.querySelector("#email").value.trim();
  const phone = form.querySelector("#phone").value.trim();
  const eventDate = form.querySelector("#eventDate").value;
  const eventType = form.querySelector("#eventType").value.trim();
  const details = form.querySelector("#details").value.trim();
  const formspreeEndpoint = "https://formspree.io/f/mrerwlkv";
  const success = document.querySelector(".success");
  const error = document.querySelector("#bookingError");
  const formWrap = document.querySelector(".booking-form");
  const submitButton = document.querySelector("#bookingSubmit");

  if (formspreeEndpoint.includes("REPLACE_WITH_FORMSPREE_ENDPOINT")) {
    alert("Formspree is not connected yet. Add the Formspree endpoint in script.js.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  const formData = new FormData(form);
  formData.append("_subject", `Booking Request from ${name}`);
  formData.append("message", details);

  try {
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Formspree request failed");
    }

    document.querySelector("#successName").textContent = name;
    document.querySelector("#successEmail").textContent = email;
    formWrap.style.display = "none";
    error.classList.remove("show");
    success.classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    formWrap.style.display = "none";
    success.classList.remove("show");
    error.classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Booking Request";
  }
}

function resetBooking() {
  const form = document.querySelector(".booking-form");
  const success = document.querySelector(".success");

  form.reset();
  form.style.display = "block";
  success?.classList.remove("show");
  document.querySelector("#bookingError")?.classList.remove("show");
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
