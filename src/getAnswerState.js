/**
 * @param {Object} _
 * @param {string} _.answerId
 * @param {string} _.currentPageAnswerId
 * @param {string} _.correctAnswerId
 * @returns {'correct' | 'incorrect' | 'answered'}
 */
export default function getAnswerState({
  answerId,
  currentPageAnswerId,
  correctAnswerId,
}) {
  if (answerId === correctAnswerId) {
    return "correct";
  }
  if (answerId === currentPageAnswerId) {
    return "incorrect";
  }
  return "answered";
}
