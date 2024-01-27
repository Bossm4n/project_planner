"use server";
import { writeFile } from "fs/promises";

const currentSessionPath: string =
  "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/current_session.json";

const HandleLogout = async () => {
  "use server";
  await writeFile(currentSessionPath, JSON.stringify({ session: false }));

  return true;
};

export default HandleLogout;
