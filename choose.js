document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startQuizBtn");

  const topics = document.getElementById("topics");

  startBtn.addEventListener("click", () => {
    window.location.href = "quiz.html";
  });

  topics.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    let selectedTopic = button.value;

    localStorage.setItem("topic", selectedTopic);
    window.location.href = "flashcard.html";
  });
});