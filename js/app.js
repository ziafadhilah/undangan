// nama link

function getQueryParam(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let name = getQueryParam("name");

if (name) {
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("recipient-name").textContent = name;
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
  // Fungsi untuk mengambil parameter query dari URL
  function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Mengambil nama dari parameter query
  let name = getQueryParam("name");

  if (name) {
    document.getElementById("recipient-name").textContent = name;
  }

  // Fungsi untuk menambahkan ucapan ke daftar
  function addUcapan(name, text) {
    const ucapanList = document.getElementById("ucapan-list");

    const ucapanItem = document.createElement("div");
    ucapanItem.className = "list-group-item";
    ucapanItem.textContent = `${name}: ${text}`;

    ucapanList.appendChild(ucapanItem);
  }

  // Fungsi untuk menyimpan ucapan di localStorage
  function saveUcapan(name, text) {
    let ucapanArray = JSON.parse(localStorage.getItem("ucapan")) || [];
    ucapanArray.push({ name: name, text: text });
    localStorage.setItem("ucapan", JSON.stringify(ucapanArray));
  }

  // Fungsi untuk memuat ucapan dari localStorage
  function loadUcapan() {
    let ucapanArray = JSON.parse(localStorage.getItem("ucapan")) || [];
    ucapanArray.forEach((ucapan) => {
      addUcapan(ucapan.name, ucapan.text);
    });
  }

  // Fungsi untuk menghapus semua ucapan
  function resetUcapan() {
    localStorage.removeItem("ucapan"); // Hapus ucapan dari localStorage
    document.getElementById("ucapan-list").innerHTML = ""; // Kosongkan tampilan ucapan
  }

  // Event listener untuk tombol kirim ucapan
  document
    .getElementById("submit-ucapan")
    .addEventListener("click", function () {
      const ucapanInput = document.getElementById("ucapan-input");
      const ucapanText = ucapanInput.value.trim();

      if (ucapanText) {
        addUcapan(name, ucapanText);
        saveUcapan(name, ucapanText);
        ucapanInput.value = ""; // Kosongkan input setelah menambah ucapan
      }
    });

  // Event listener untuk tombol reset ucapan
  document
    .getElementById("reset-ucapan")
    .addEventListener("click", resetUcapan);

  // Muat ucapan dari localStorage saat halaman dimuat
  loadUcapan();
});
