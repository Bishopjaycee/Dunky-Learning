import { db, auth } from "./firebase";
import { QuestionModel } from "../models/firebase.model";
// import { uid } from 'uid/secure';

interface Props {
  subject: string;
  level: number;
  questions: QuestionModel[];
}

async function getQuestions({ subject, level }: Partial<Props>) {
  try {
    const studentLevel = await db
      .collection("question_bank")
      .doc(subject)
      .get();
    if (!studentLevel.exists) {
      return [];
    }
    const levels = studentLevel.data() as any;
    const papersList = levels["level_" + level];
    let num = Object.entries(papersList).length;
    let paperNumber = Math.floor(Math.random() * num);
    const paper: QuestionModel[] = papersList["paper_" + paperNumber];

    return paper;
  } catch (error) {
    console.error(error);
  }
}

async function setQuestions({ subject, level, questions }: Props) {
  // questions.map((question) => (question.uid = uid(32)));
  try {
    const schema: any = {};
    const subjectDB = db.collection("question_bank").doc(subject);
    const subjectExists = (await subjectDB.get()).exists;
    schema[`level_${level}`] = {};

    if (!subjectExists) {
      schema[`level_${level}`]["paper_0"] = questions;
      await subjectDB.set(schema);
      return;
    }

    let dirtyS = await subjectDB.get();
    const levels = dirtyS.data() as any;
    const paperList = levels["level_" + level];

    const paperNumber = Object.entries(paperList).length - 1;
    const questionLength = paperList["paper_" + paperNumber]?.length;
    schema[`level_${level}`][
      `paper_${questionLength >= 30 ? paperNumber + 1 : paperNumber}`
    ] = questions;
    await subjectDB.set(schema, { merge: true });
  } catch (error) {
    console.error(error);
  }
}

export { getQuestions, setQuestions };
