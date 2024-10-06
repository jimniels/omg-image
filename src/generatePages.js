export default function generatePages(data) {
  // console.log(data);
  const questions = data.reduce((acc, question, index) => {
    const questionId = index + 1;
    const answers = [
      { answerId: 1, answer: question.title },
      ...question.altTitles.map((answer, k) => ({
        answerId: k + 2,
        answer,
      })),
    ];

    return {
      ...acc,
      [`questions/${questionId}.html`]: {
        questionId,
        state: "question",
        answers,
      },
      ...answers.reduce((acc, answer) => {
        return {
          ...acc,
          [`questions/${questionId}/answers/${answer.answerId}`]: {
            questionId,
            answerId: answer.answerId,
            state:
              answer.answerId === 1 ? "answer-correct" : "answer-incorrect",
          },
        };
      }, {}),
    };
  }, {});
  return questions;

  // return {
  //   "questions/1.html": { questionId: 1, state: "question" },
  //   "questions/1/answers/1": {
  //     questionId: 1,
  //     answerId: 1,
  //     state: "answer-correct",
  //   },
  //   "questions/1/answers/2": {
  //     questionId: 1,
  //     answerId: 2,
  //     state: "answer-incorrect",
  //   },
  // };
}
