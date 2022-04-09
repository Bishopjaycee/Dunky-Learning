interface MedalsModel {
  gold: number;
  bronze: number;
  silver: number;
}

export interface StudentModel {
  regNo: string;
  role: string;
  username: string;
  dunks: number;
  medals: MedalsModel;
  subject: SubjectModel[];
  subjectArea: string;
  school: string;
  class: string;
}

export interface SubjectModel {
  photoUrl: string;
  title: string;
  subjectArea: "Sciences" | "Arts" | "General";
}

export interface TeacherModel {
  role: string;
  school: string;
  subjectArea: string;
  classes: string[];
  assignments: AssignmentModel[];
  announcements: AnnouncementModel[];
}

export interface AssignmentModel {
  title: string;
  files: any[];
}

export interface AnnouncementModel {
  createdBy: string; //teacher
  for: string; //classes
  message: string;
  read: false | true;
  timestamp: Date;
  title: string;
}

export interface ParentModel {
  role: string;
  school: string;
  subjectArea: string;
  kids: StudentModel[];
  remarks: RemarkModel[];
}

export interface RemarkModel {
  by: string;
  for: string;
  text: string;
  timestamp: Date;
}

export interface SchoolModel {
  name: string;
  address: {
    LGA: string;
    state: string;
    street: string;
  };
}

export interface RoomModel {
  full: false | true;
  players: StudentModel[];
  size: number;
}

export interface QuestionModel {
  correctOption: string;
  options: string[];
  point: number;
  question: string;
  uid: string;
}
