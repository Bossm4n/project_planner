"use server";
import { readFile, writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import { User } from "../common_components/interfaces";

async function loginFunc(newData: User, fromSignUp: boolean) {
  // Read the JSON file

  const filePath = "/src/app/data/users/all_users.json";

  readFile(process.cwd() + filePath, "utf-8")
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
        process.cwd() + "/src/app/data/users/current_session.json",
        JSON.stringify({ session: true, id: finalData["id"] }, null, 2),
        "utf-8"
      );
    })
    .catch((error) => {
      console.error("Error reading file:", error);
    });

  redirect("/home");
}

export default loginFunc;
