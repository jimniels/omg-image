const raw = window.sessionStorage.getItem("answers") || "{}";
let qaMap = JSON.parse(raw);

// ['questions', '1']
const [q, qId] = window.location.pathname.split("/").filter(Boolean);

// Mark the nav items that have been answered
Object.entries(qaMap).forEach(([q, a]) => {
  const selector = `.nav__number[href^="/questions/${q}"]`;
  console.log(selector);
  const el = document.querySelector(selector);

  if (el) {
    el.classList.add("nav__number--correct");
  }
});

// this question has been answered
if (Object.keys(qaMap).includes(qId)) {
  const selector = `[data-question-id="${qId}"][data-answer-id="${qaMap[qId]}"]`;
  const element = document.querySelector(selector);
  if (element) {
    element.dataset.isSelected = "true";
  }
}

// document.querySelectorAll(".nav__number").forEach(($el) => {
//   Object.keys(qaMap).forEach((qKey) => {
//     console.log($el.getAttribute("href"), `/questions/${qKey}`);
//     if ($el.getAttribute("href").includes(`/questions/${qKey}`)) {
//       $el.dataset.isSelected = "true";
//       // $el.style.backgroundColor = "red";
//     }
//   });
// });

document.documentElement.addEventListener("click", (e) => {
  const $el = e.target;

  if ($el.classList.contains("js-answer")) {
    e.preventDefault();

    // Set the answer as selected
    $el.dataset.isSelected = "true";

    // store the question/answer
    qaMap[$el.dataset.questionId] = $el.dataset.answerId;
    window.sessionStorage.setItem("answers", JSON.stringify(qaMap));
  }
});
