main();

function main() {
  const results = window.sessionStorage.getItem("results") ?? [];
  const currentPath = window.location.pathname;

  // Initialize the results if we're on the first answer page
  if (results.length === 0 && currentPath.includes("/questions/1/answers/")) {
    saveResult(results);
  }

  // Don't go any further if we don't hae results yet
  if (results.length === 0) return;

  // If we're on an answers page, inject the results and update state
  if (currentPath.includes("/answers/")) {
    saveResult(results);
  }

  // Inject the current results
  injectResults();
}

function injectResults() {
  const el = document.querySelector(".h__title span");
  const span = document.createElement("span");
  span.classList.add("h__title__status__accuracy");
  span.innerHTML = `${results.filter(Boolean).length} correct`;
  el.appendChild(span);
}

/**
 * @param {Array<boolean>} results
 */
function saveResult(results) {
  const isCorrect = document.documentElement.dataset.isCorrect !== undefined;
  const newResults =
    results.length === 0 ? [isCorrect] : results.concat(isCorrect);
  window.sessionStorage.setItem("results", JSON.stringify(newResults));
}
