"use server";
import { readFile, writeFile } from "fs/promises";

interface User {
  id?: number;
  username?: string;
  password: string;
  email?: string;
}

function loginFunc(newData: User, fromSignUp: boolean) {
  // Read the JSON file

  const filePath =
    "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/users.json";

  readFile(filePath, "utf-8")
    .then((allUsersData) => {
      const jsonData: {
        users: User[];
      } = JSON.parse(allUsersData);

      let finalData: any = newData;

      if (fromSignUp) {
        newData["id"] =
          (jsonData.users?.[jsonData.users.length - 1]?.id ?? 0) + 1;

        const newDataWithId: User = {
          ...newData,
          id: jsonData.users.length + 1,
        };
        jsonData.users.push(newDataWithId);

        finalData = newDataWithId;

        writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
      }

      writeFile(
        "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/current_session.json",
        JSON.stringify({ session: true, ...finalData }, null, 2),
        "utf-8"
      );
    })
    .catch((error) => {
      console.error("Error reading file:", error);
    });
}

export default loginFunc;

// Read the JSON file
// const filePath = "path/to/your/file.json";
// const jsonData = JSON.parse(readFileSync(filePath, "utf-8"));

// // Modify the JSON data
// jsonData.key = "new value";

// // Write the updated JSON data back to the file
// writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
