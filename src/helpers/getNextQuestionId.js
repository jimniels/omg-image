/**
 * @param {string} questionId
 * @param {number} totalNumberOfQuestions
 */
export default function getNextQuestionId(questionId, totalNumberOfQuestions) {
  if (questionId == totalNumberOfQuestions) {
    return "1";
  }
  return (Number(questionId) + 1).toString();
}
