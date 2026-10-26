document.addEventListener("DOMContentLoaded", () => {
  const nextQtnBtn = document.getElementById("nextQtnBtn");
  const qtnText = document.getElementById("qtnText");
  const A = document.getElementById("A");
  const B = document.getElementById("B");
  const C = document.getElementById("C");
  const D = document.getElementById("D");
  const num = document.getElementById("num");
  const option = document.querySelectorAll(".option");


  let currentIndex = 1;
  let correctAns = 0;
  let wrongAns = 0;
  let score = 0;
  let questions = [];
  let number = 1;

  fetch("data/quiz.csv")
    .then((response) => response.text())
    .then((data) => {
      let rows = data.split("\n");

      questions = rows.map((row) => {
        let cols = row.split(",");
        return {
          question: cols[0],
          options: [cols[1], cols[2], cols[3], cols[4]],
          answer: cols[5],
        };
      });
      num.textContent = number;
      showQtn();
      nextQtnBtn.addEventListener("click", () => {
        option.forEach((button) => {
          button.checked = false;
        });

        currentIndex++;
        if (currentIndex < questions.length) {
          number++;
          num.textContent = number;

          showQtn();
        } else {
          localStorage.setItem("score", score);
          localStorage.setItem("correctAns", correctAns);
          localStorage.setItem("wrongAns", wrongAns);
          window.location.href = "quizComplete.html";
        }
      });
    });

  function showQtn() {
    nextQtnBtn.classList.add("hidden");
    qtnText.textContent = questions[currentIndex].question;
    A.textContent = questions[currentIndex].options[0];
    B.textContent = questions[currentIndex].options[1];
    C.textContent = questions[currentIndex].options[2];
    D.textContent = questions[currentIndex].options[3];
  }
  option.forEach((button, i) => {
    button.addEventListener("click", () => {
      button.checked = true;
      let selectAns = questions[currentIndex].options[i];
      selectChoice(selectAns);
    });
  });

  function selectChoice(selectAns) {
    let correctAnswer = questions[currentIndex].answer;

    if (selectAns.trim() === correctAnswer.trim()) {
      score++;
      correctAns++;
      console.log(score);
      console.log(correctAns);
    }
    if (selectAns.trim() !== correctAnswer.trim()) {
      wrongAns++;
      console.log(wrongAns);
    }
    nextQtnBtn.classList.remove("hidden");
  }
});
