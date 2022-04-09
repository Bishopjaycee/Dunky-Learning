import { auth, db, phoneProvider, getServerTimestamp, relDB } from "./firebase";
import { useState, useEffect, useDebugValue, useCallback } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import regNoGenerator from "./regNoGenerator";
import * as _ from "lodash";

const {
  setItem: setToken,
  getItem: getToken,
  removeItem: removeToken,
} = useAsyncStorage("@token");

const {
  setItem: setDocumentData,
  getItem: getDocumentData,
  removeItem: removeDocumentData,
  mergeItem: mergeDocumentData,
} = useAsyncStorage("@userDetails");

const {
  setItem: setUserData,
  getItem: getUserData,
  removeItem: removeUserData,
  mergeItem: mergeUserData,
} = useAsyncStorage("@user");

export function useUser() {
  const [userState, setUserState] = useState({
    user: auth.currentUser,
    isLoading: auth.currentUser == null ? true : false,
    error: "",
  });

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

  const { user, isLoading, error } = userState;
  const signedIn = user != null;
  const userId = signedIn ? user?.uid : undefined;
  const userName = signedIn ? user?.displayName : undefined;
  const userPhone = signedIn ? user?.phoneNumber : undefined;
  const [userImg, setUserImg] = useState(user?.photoURL);
  const [userRole, setLocalUserRole] = useState("");
  const [userReg, setReg] = useState("");
  const [dunkPoint, setDunkPoint] = useState(0);

  // const [isOnline, setIsOnline] = useState(false);

  // // setup for user presence

  // useEffect(() => {
  //   getUserRole();
  //   // Assuming user is logged in
  //   // const userId = auth.currentUser?.uid;

  //   if (!userRole) {
  //     return;
  //   }

  //   const reference = relDB.ref(`/online/${userId}`);
  //   const fireStoreRef = db.collection(`${userRole}s`).doc(userId);

  //   // Set the /users/:userId value to true
  //   reference.set(true).then(() => {
  //     // console.log("Online presence set");
  //   });

  //   reference.on("child_changed", function (doc) {
  //     if (doc.val() == true) {
  //       setIsOnline(true);
  //       fireStoreRef.set(
  //         {
  //           online: true,
  //           last_seen: getServerTimestamp(),
  //         },
  //         { merge: true }
  //       );
  //       console.log(doc.val());
  //     }
  //     fireStoreRef.set(
  //       {
  //         online: false,
  //         last_seen: getServerTimestamp(),
  //       },
  //       { merge: true }
  //     );
  //   });
  //   // Remove the node whenever the client disconnects
  //   reference
  //     .onDisconnect()
  //     .remove()
  //     .then(() => {
  //       setIsOnline(false);
  //       fireStoreRef.set(
  //         {
  //           online: false,
  //           last_seen: getServerTimestamp(),
  //         },
  //         { merge: true }
  //       );
  //       // console.log("On disconnect function configured.");
  //     });
  // }, []);

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
      setDocumentData(JSON.stringify(doc.data())).then(() => {
        console.log("document persisted");
      });
    } catch (error) {
      console.error(error);
    }
  };

  //Fetches cached user doc from firebase
  if (user == null) {
    getUserData().then((user) => {
      setUserState({
        user: JSON.parse(user as string),
        isLoading: false,
        error: "",
      });
    });
  }

  useEffect(() => {
    getUserRole();
  }, [userRole]);

  useEffect(() => {
    getDocumentData()
      .then((user) => {
        let obj = JSON.parse(user as any);
        setReg(obj?.regNo);
        setUserImg(obj?.photoUrl);
        setDunkPoint(obj?.dunkPoint);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userReg, userImg]);

  //Checks for changes in user doc
  const [docChanged, setDocChanged] = useState(false);

  const userDocChangeListener = useCallback(
    async function () {
      let doc = await db.collection(`${userRole}s`).doc(userId).get();
      if (doc.exists) {
        let cachedDoc = await getDocumentData();
        if (JSON.parse(cachedDoc as string) != null) {
          let isDataEqual = _.isEqual(
            doc.data(),
            JSON.parse(cachedDoc as string)
          );
          if (!isDataEqual) {
            mergeDocumentData(JSON.stringify(doc.data()));
            console.log("local document updated!");
            setDocChanged(true);
          }
          console.log(isDataEqual, "local document unchanged!");
          setDocChanged(!isDataEqual);
          return;
        }
      }
      return;
    },
    [docChanged]
  );

  useEffect(() => {
    userDocChangeListener();
  }, [docChanged]);

  //Request for user's role using their ID
  const getUserRole = async function () {
    setUserState({ user, isLoading: true, error: "" });
    try {
      const cachedUser = await getUserData();
      const cachedId = JSON.parse(cachedUser as string)?.uid;
      const role = await getDocumentData().then((data) => {
        let ObjRole = JSON.parse(data as string);
        return ObjRole?.role;
      });

      if (role != null) {
        setLocalUserRole(role as unknown as string);
        setUserState({ user, isLoading: false, error: "" });
        return;
      }

      const stRef = await db
        .collection("students")
        .doc(user?.uid || cachedId)
        .get();
      const tRef = await db
        .collection("teachers")
        .doc(user?.uid || cachedId)
        .get();
      const ptRef = await db
        .collection("parents")
        .doc(user?.uid || cachedId)
        .get();

      if (stRef.exists) {
        setLocalUserRole(stRef.data()?.role);
        setReg(stRef.data()?.regNo);
      } else if (tRef.exists) {
        setLocalUserRole(tRef.data()?.role);
      } else if (ptRef.exists) {
        setLocalUserRole(ptRef.data()?.role);
      } else {
        console.error("unable to fetch user role with this id: " + userId);
      }
      setUserState({ user, isLoading: false, error: "" });
    } catch (error: any) {
      setUserState({ user, isLoading: false, error: error?.message });
      console.error(error);
    }
  };

  const userToken = async () => await getToken();
  const setUserToken = async () => {
    const token = (await user?.getIdTokenResult())?.token;
    await setToken(token as unknown as string);
  };

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

      setUserState({ user: credential.user, isLoading: false, error: "" });
    } catch (err: any) {
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
      user?.linkWithCredential(credential).then(({ user: usr }: any) => {
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
      setUserData(JSON.stringify(user));
      await persistUser(role, user?.uid as string);
    } catch (err: any) {
      setUserState({ user, isLoading: false, error: err?.message });
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
      setUserData(JSON.stringify(credential.user));
      persistUser(userRole, credential.user?.uid as string);
    } catch (error: any) {
      setUserState({ user: null, isLoading: false, error: error?.message });
      console.error(error?.message);
    }
  };

  const signOut = async function () {
    try {
      setUserState({ user: null, isLoading: true, error: "" });
      await removeToken();
      await removeDocumentData();
      await removeUserData();
      auth.signOut();
      setUserState({ user: null, isLoading: false, error: "" });
    } catch (error) {
      console.error(error);
    }
  };
  useDebugValue({
    user,
    userId,
    dunkPoint,
    userImg,
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
    // isOnline,
  });

  return {
    user,
    userId,
    userImg,
    userName,
    dunkPoint,
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
    // isOnline,
  };
}
