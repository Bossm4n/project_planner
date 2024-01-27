import { NextApiRequest, NextApiResponse } from "next";
import { writeFile } from "fs/promises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentSessionPath: string =
    "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/current_session.json";

  try {
    await writeFile(currentSessionPath, JSON.stringify({ session: false }));
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error writing session data:", error });
  }
}
