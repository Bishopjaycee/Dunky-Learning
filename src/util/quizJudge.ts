interface QuizJudgeProps {
  answers: boolean[];
}

interface QuizJudge {
  correct: number;
  wrong: number;
  dunkEarned: number;
}
export default function quizJudge({ answers }: QuizJudgeProps): QuizJudge {
  const filteredAnswer = [];
  for (let i = 0; i < answers.length; i++) {
    if (i % 2 == 1) {
      filteredAnswer.push(answers[i]);
    }
  }
  const correct = filteredAnswer.filter((item) => item == true).length;
  const wrong = filteredAnswer.filter((item) => item == false).length;
  const points = 33.33 * correct;

  console.log({ wrong, correct, dunkEarned: points }, "quiz judge");
  return { wrong, correct, dunkEarned: points };
}
