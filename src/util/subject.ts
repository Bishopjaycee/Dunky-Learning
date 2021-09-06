import { auth, db } from "./firebase";

export async function useGetSubjects() {
  try {
    const user = auth.currentUser;
    const subjectArea = (
      await db.collection("students").doc(user?.uid).get()
    ).data()?.subjectArea;

    let regex = new RegExp(`(${subjectArea}|general)`, "i");
    const snapShots = await db.collection("subjects").get();
    const subjects = snapShots.docs.map((doc) => doc.data());
    return subjects.filter((obj) => regex.test(obj?.subjectArea)) ?? [];
  } catch (error) {
    console.error(error);
  }
}
