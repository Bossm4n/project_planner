import { readFile } from "fs/promises";
import { ActiveSession } from "./interfaces";
import Navbar from "./navbar";
import React from "react";

export async function CheckActiveSession() {
  //   "use server";
  //   console.log("CheckActiveSession");
  const activeSessionFile = "/src/app/data/users/current_session.json";

  let activeSession: boolean = true;
  let currUserID: number | undefined = undefined;

  await readFile(process.cwd() + activeSessionFile, "utf-8")
    .then((json) => JSON.parse(json))
    .then((activeSessionJSON: ActiveSession) => {
      if (activeSessionJSON.session == false) activeSession = false;
      else currUserID = activeSessionJSON.id;
      console.log("active session: " + activeSession);
    })
    .catch((error) => console.error("Error: " + error));

  console.log("active session: " + activeSession);

  if (!activeSession) {
    return (
      <div>
        <Navbar />
        Error 404
      </div>
    );
  } else {
    return currUserID;
  }
}
