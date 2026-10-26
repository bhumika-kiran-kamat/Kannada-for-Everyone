document.addEventListener("DOMContentLoaded", () => {
  const preBtn = document.getElementById("preBtn");
  const nextBtn = document.getElementById("nextBtn");
  const kannada = document.getElementById("kannada");
  const english = document.getElementById("english");
  const pronounciation = document.getElementById("pronounciation");
  const num = document.getElementById("num");
  const heading = document.getElementById("heading");

  let number = 1;
  let words = [];
  let currentIndex = 0;

  let topic = localStorage.getItem("topic");
  fetch(`data/${topic}.csv`)
    .then((response) => response.text())
    .then((data) => {
      let row = data.split("\n");

      words = row.map((row) => {
        let cols = row.split(",");
        return {
          kannada: cols[0],
          english: cols[1],
          pronounciation: cols[2],
        };
      });
      num.textContent = number;
      card();
      nextBtn.addEventListener("click", () => {
        currentIndex++;

        if (currentIndex < words.length) {
          number++;
          num.textContent = number;

          next();
        } else {
          window.location.href = "completed.html";
        }
      });
    });
  function card() {
    if (topic === "greeting&intro") {
      heading.textContent = `👋🤝 Greeting & Introduction`;
    }
    if (topic === "shopping&food") {
      heading.textContent = `🛍️🍽️ Shopping & Food`;
    }
    if (topic === "travel&direction") {
      heading.textContent = `🗺️🧭 Travel & Directions`;
    }
    if (topic === "workplace&college") {
      heading.textContent = `💼🎓 Workplace & College`;
    }
    kannada.textContent = words[currentIndex].kannada;
    english.textContent = words[currentIndex].english;
    pronounciation.textContent = words[currentIndex].pronounciation;
  }

  preBtn.addEventListener("click", () => {
    pre();
  });
  function next() {
    card();
  }
  function pre() {
    currentIndex--;
    card();
  }
});
