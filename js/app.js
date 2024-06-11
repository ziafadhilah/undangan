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

// window.addEventListener("click", function () {
//   var audio = document.getElementById("background-music");
//   audio.muted = false;
//   audio.play();
// });

// ucapan

document.addEventListener("DOMContentLoaded", function () {
  function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  let to = getQueryParam("to");

  if (to) {
    document.getElementById("recipient-name").textContent = to;
  } else {
    to = "Anonim";
  }

  function addUcapan(name, text) {
    const ucapanList = document.getElementById("ucapan-list");
    const ucapanItem = document.createElement("div");
    ucapanItem.className = "list-group-item";
    ucapanItem.textContent = `${name}: ${text}`;
    ucapanList.appendChild(ucapanItem);
  }

  function saveUcapan(name, text) {
    let ucapanArray = JSON.parse(localStorage.getItem("ucapan")) || [];
    ucapanArray.push({ name: name, text: text });
    localStorage.setItem("ucapan", JSON.stringify(ucapanArray));
  }

  function loadUcapan() {
    let ucapanArray = JSON.parse(localStorage.getItem("ucapan")) || [];
    ucapanArray.forEach((ucapan) => {
      addUcapan(ucapan.name, ucapan.text);
    });
  }

  async function sendUcapanToGSheets(name, text) {
    try {
      const response = await fetch("YOUR_DEPLOYED_SCRIPT_URL_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, text: text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === "success") {
        console.log("Ucapan berhasil disimpan di Google Sheets");
      } else {
        console.error("Gagal menyimpan ucapan di Google Sheets");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  document
    .getElementById("submit-ucapan")
    .addEventListener("click", function () {
      const ucapanInput = document.getElementById("ucapan-input");
      const ucapanText = ucapanInput.value.trim();

      if (ucapanText) {
        addUcapan(to, ucapanText);
        saveUcapan(to, ucapanText);
        sendUcapanToGSheets(to, ucapanText); // Kirim ucapan ke Google Sheets
        ucapanInput.value = "";
      }
    });

  loadUcapan();
});
