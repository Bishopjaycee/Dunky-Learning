import { db, bucket } from "./firebase";

async function getImages(name: string) {
  const storage = bucket;
  const storageRef = storage.ref().child(`subjects/${name}.png`);
  return await storageRef.getDownloadURL();
}

async function addSubjects() {
  const subject = db.collection("subjects");

  subject.doc("mathematics").set({
    title: "Mathematic",
    subjectArea: "General",
    photoUrl: await getImages("math"),
  });
  subject.doc("english").set({
    title: "English",
    subjectArea: "General",
    photoUrl: await getImages("english"),
  });
  subject.doc("biology").set({
    title: "Biology",
    subjectArea: "Sciences",
    photoUrl: await getImages("biology"),
  });
  subject.doc("geography").set({
    title: "Geograph",
    subjectArea: "Sciences",
    photoUrl: await getImages("geography"),
  });
  subject.doc("physics").set({
    title: "Physics",
    subjectArea: "Sciences",
    photoUrl: await getImages("physics"),
  });
  subject.doc("chemistry").set({
    title: "Chemistry",
    subjectArea: "Sciences",
    photoUrl: await getImages("chemistry"),
  });
  subject.doc("civicStudies").set({
    title: "Civic Studies",
    subjectArea: "General",
    photoUrl: await getImages("civilStudies"),
  });
  subject.doc("technicalDrawing").set({
    title: "Technical Drawing",
    subjectArea: "Sciences",
    photoUrl: await getImages("technicalDrawing"),
  });
  subject.doc("furtherMath").set({
    title: "Further Mathematics",
    subjectArea: "Sciences",
    photoUrl: await getImages("furtherMath"),
  });
  subject.doc("government").set({
    title: "Government",
    subjectArea: "Arts",
    photoUrl: await getImages("government"),
  });
  subject.doc("literature").set({
    title: "Literature",
    subjectArea: "Arts",
    photoUrl: await getImages("literature"),
  });
  subject.doc("crk").set({
    title: "C. R. K.",
    subjectArea: "Arts",
    photoUrl: await getImages("crk"),
  });
  subject.doc("economics").set({
    title: "Economics",
    subjectArea: "Arts",
    photoUrl: await getImages("economics"),
  });
  subject.doc("homeManagement").set({
    title: "Home Management",
    subjectArea: "Arts",
    photoUrl: await getImages("homeManagement"),
  });
  subject.doc("foodAndNut").set({
    title: "Food & Nut.",
    subjectArea: "Arts",
    photoUrl: await getImages("foodAndNut"),
  });
  subject.doc("agriculture").set({
    title: "Agriculture",
    subjectArea: "General",
    photoUrl: await getImages("agriculture"),
  });
  subject.doc("accounting").set({
    title: "Accounting",
    subjectArea: "Arts",
    photoUrl: await getImages("accounting"),
  });
}
