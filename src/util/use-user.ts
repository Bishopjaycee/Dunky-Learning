import { auth, db, phoneProvider, getServerTimestamp } from "./firebase";
import { useState, useEffect } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import regNoGenerator from "./regNoGenerator";

const {
  setItem: setToken,
  getItem: getToken,
  removeItem: removeToken,
} = useAsyncStorage("@token");

const {
  setItem: setUserData,
  getItem: getUserData,
  removeItem: removeUserData,
  mergeItem: mergerUserData,
} = useAsyncStorage("@userDetail");

export function useUser() {
  const [userState, setUserState] = useState({
    user: auth.currentUser,
    isLoading: auth.currentUser == null ? true : false,
    error: "",
  });

  const { user, isLoading, error } = userState;
  const signedIn = user != null;
  const userId = signedIn ? user?.uid : undefined;
  const userName = signedIn ? user?.displayName : undefined;
  const userPhone = signedIn ? user?.phoneNumber : undefined;
  const [userRole, setLocalUserRole] = useState("");
  const [userReg, setReg] = useState("");

  /**
   * Stores user's data from firebase to the local storage
   * Ensure user gets data in the UI faster when using a slow
   * network
   *
   * @param role
   * @param userId
   */
  const persistUser = async (role: string, userId: string) => {
    try {
      let doc = await db.collection(`${role}s`).doc(userId).get();
      setUserData(JSON.stringify(doc.data()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData()
      .then((user) => {
        let obj = JSON.parse(user as any);
        setReg(obj?.regNo);
        setLocalUserRole(obj?.role);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userRole, userReg]);

  const getUserRole = async function () {
    try {
      const role = await getUserData().then(
        (data) => data != null && JSON.parse(data)?.role
      );
      if (role != null && role != "") {
        setLocalUserRole(role as unknown as string);
        return;
      }

      const stRef = await db.collection("students").doc(userId).get();
      const tRef = await db.collection("teachers").doc(userId).get();
      const ptRef = await db.collection("parents").doc(userId).get();

      if (stRef.exists) {
        setLocalUserRole(stRef.data()?.role);
      } else if (tRef.exists) {
        setLocalUserRole(tRef.data()?.role);
      } else if (ptRef.exists) {
        setLocalUserRole(ptRef.data()?.role);
      } else {
        console.error("Invalid user id entered");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userToken = async () => await getToken();
  const setUserToken = async () => {
    const token = (await user?.getIdTokenResult())?.token;
    await setToken(token as unknown as string);
  };

  useEffect(() => {
    // onChange is called when firebase loads up the user from persistent storage or
    // when the auth changes.
    const onChange = (currentUser: any) => {
      setUserState({ user: currentUser, isLoading: false, error: "" });
    };
    // onError is called ONLY when onAuthStateChanged encounters an error - not when
    // signIn or signOut error.
    const onError = (error: any) => {
      console.error(error);
      setUserState({ user: null, isLoading: false, error: error?.message });
    };
    const unsubscribe = auth.onAuthStateChanged(onChange, onError);
    // Return a function from your effect to register some function to run
    // when the effect is cleaned up.
    return unsubscribe;
  }, []);

  /**
   * user signup method
   * @param payload
   * @returns
   */
  const signUp = async function (payload: any) {
    setUserState({ user: null, isLoading: true, error: "" });
    if (payload?.role == "student") {
      payload.studyLevels = payload.subjectArea.match(/sciences/i)
        ? {
            biology: 0,
            chemisty: 0,
            physics: 0,
            mathematics: 0,
            futherMath: 0,
            agriculture: 0,
            civicStudies: 0,
            english: 0,
            technicalDrawing: 0,
            geography: 0,
          }
        : {
            mathematics: 0,
            agriculture: 0,
            civicStudies: 0,
            english: 0,
            economics: 0,
            foodAndNut: 0,
            government: 0,
            homeManagement: 0,
            literature: 0,
            crk: 0,
            accounting: 0,
          };
      payload.gameLevel = 0;
      payload.dunkPoint = 1000;
      payload.gameName = "";
      payload.medals = {
        gold: 0,
        bronze: 0,
        silver: 0,
      };
    }
    payload.createdAt = getServerTimestamp();
    payload.modifiedAt = getServerTimestamp();

    const { email, password, ...rest } = payload;
    try {
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      db.collection(`${payload.role}s`).doc(credential.user?.uid).set(rest);
      const { name } = payload;
      credential.user?.updateProfile({
        displayName: name,
      });
      await persistUser(payload?.role, credential.user?.uid as string);
      setUserState({ user: credential.user, isLoading: false, error: "" });
    } catch (err) {
      setUserState({ user: null, isLoading: false, error: err?.message });
      console.error(err);
    }
  };

  /**
   * Phone otp handler
   * @param phone @param verificationId @param otp
   */
  const addPhoneCredentials = async function ({
    phone,
    verificationId,
    otp,
  }: {
    phone: string;
    verificationId: any;
    otp: string;
  }) {
    setUserState({ user: auth.currentUser, isLoading: true, error: "" });
    getUserRole();

    try {
      const collection = await db.collection("students").get();
      let docLen = collection.size - 1;
      const studentRef = db.collection("students").doc(user?.uid);

      let role = (await studentRef.get()).data()?.role;
      const studentData = (await studentRef.get()).data();

      let reg = regNoGenerator({
        school: studentData?.school,
        serialNumber: docLen,
        name: userName as string,
        phoneNumber: phone,
      });
      console.group("linking phone number...");

      const credential = phoneProvider.credential(verificationId, otp);
      user?.linkWithCredential(credential).then(({ user: usr }) => {
        const [fname, lname] = userName?.split(" ") as any;
        if (role == "student") {
          console.log("reg number created...");
          studentRef.set(
            {
              regNo: reg,
              photoUrl: `https://ui-avatars.com/api/?name=${fname}+${lname}`,
            },
            { merge: true }
          );
          console.log("reg number persisted...");
        }
        // console.log(studentData, "Phone verifier calle");
        usr?.updateProfile({
          photoURL: `https://ui-avatars.com/api/?name=${fname}+${lname}`,
        });
        usr?.updatePhoneNumber(credential);
      });
      console.log("adding reg number completed...");
      console.groupEnd();
      setUserState({ user: user, isLoading: false, error: "" });
      setUserToken();
    } catch (err) {
      setUserState({ user, isLoading: false, error: err });
      console.error(err);
    }
  };

  /**
   * Sign in method
   * @param email @param password
   */
  const signIn = async function ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setUserState({ user: null, isLoading: true, error: "" });
    try {
      const credential = await auth.signInWithEmailAndPassword(email, password);
      setUserState({
        user: credential.user,
        isLoading: false,
        error: "",
      });

      getUserRole();
      setUserToken();
      await persistUser(userRole, credential.user?.uid as string); //TODO FUNCTION
    } catch (error) {
      setUserState({ user: null, isLoading: false, error: error?.message });
      console.error(error?.message);
    }
  };

  const signOut = async function () {
    try {
      setUserState({ user: null, isLoading: true, error: "" });
      await removeToken();
      await removeUserData();
      auth.signOut();
      setUserState({ user: null, isLoading: false, error: "" });
    } catch (error) {
      console.error(error);
    }
  };
  return {
    user,
    userId,
    userName,
    userRole,
    userPhone,
    userReg,
    userToken,
    signIn,
    signOut,
    signUp,
    addPhoneCredentials,
    isLoading,
    getUserRole,
    error,
  };
}
