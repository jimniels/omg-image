/**
 * @param {string} questionId
 * @param {number} totalNumberOfQuestions
 * @returns {string}
 */
export default function getPrevQuestionId(questionId, totalNumberOfQuestions) {
  if (questionId == 1) {
    return totalNumberOfQuestions.toString();
  }
  return (Number(questionId) - 1).toString();
}
