/**
 * This is the implementation of the multiplayer game logic
 *
 */
import { useState } from "react";
import { db, auth, bucket, getServerTimestamp } from "./firebase";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { InferType } from "prop-types";

type userProfile = {
  subjects: string[];
  gameName: string;
};

// const { userRole, userId } = useUser();
const userId = auth.currentUser?.uid;
const { setItem, getItem, mergeItem } = useAsyncStorage("@subjects");

export default function useGame() {
  //Methods to return

  //Add selected subject and update game name
  async function addGameDetails({ subjects, gameName }: userProfile) {
    await db.collection("students").doc(userId).update({
      gameName: gameName,
    });
    setItem(JSON.stringify(subjects)).catch(() => {
      mergeItem(JSON.stringify(subjects));
      return;
    });
    // console.log({ subjects, gameName });
  }

  //Create team
  //A named and avatar is needed to create a team and the creator is added automatically
  async function createTeam(data: any) {
    const stRef = await db.collection("students").doc(userId).get();
    let subjects = await getItem();
    const teamModel = {
      name: data.name,
      teamPhotoUrl: data.photoURL,
      subjects: JSON.parse(subjects as string),
      dunkPoints: stRef.data()?.dunkPoint,
      createdAt: getServerTimestamp(),
      createdBy: {
        playerName: stRef.data()?.gameName,
        playerId: stRef.id,
        playerPoints: stRef.data()?.dunkPoint,
      },
      players: [
        {
          playerName: stRef.data()?.gameName,
          playerId: stRef.id,
          playerPoints: stRef.data()?.dunkPoint,
          playerPhoto: stRef.data()?.photoUrl,
        },
      ],
      limit: 1,
    };
    await db.collection("teams").doc().set(teamModel);
  }

  //fetch teams
  async function fetchTeams() {
    let subjects = await getItem();
    let teamRef = await db.collection("teams").get();

    //When no team exists
    if (teamRef.empty) return [];

    let teams = teamRef.docs.map((doc) => doc.data());
    // console.log(teams);
    return teams;
  }

  //Join team
  //User joins with game name, avatar and dunk points
  async function joinTeam() {
    const teamRef = await db
      .collection("teams")
      .where("name", "==", "name")
      .where("limit", "<", 4)
      .get();

    if (!teamRef.empty) {
      const selectTeam =
        teamRef.docs[Math.floor(Math.random() * teamRef.docs.length)];
    }
  }

  return {
    addGameDetails,
    fetchTeams,
    createTeam,
  };
}
