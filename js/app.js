// nama link

function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let to = getQueryParam("to");

if (to) {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("recipient-name").textContent = to;
  });
}

// countdown
simplyCountdown(".simply-countdown", {
  year: 2024,
  month: 6,
  day: 30,
  hours: 8,
  words: {
    days: { singular: "Hari", plural: " Hari" },
    hours: { singular: "Jam", plural: " Jam" },
    minutes: { singular: "Menit", plural: " Menit" },
    seconds: { singular: "Detik", plural: " Detik" },
  },
});

// audio

window.addEventListener("click", function () {
  var audio = document.getElementById("background-music");
  audio.muted = false;
  audio.play();
});
