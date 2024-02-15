import React from "react";
import Link from "next/link";
import { readFile, writeFile } from "fs/promises";
import Logout from "./navbarlogoutclient";

const Navbar = async () => {
  const currentSessionPath =
    "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/current_session.json";

  let activeSession: boolean = false;

  let currID: number;

  await readFile(currentSessionPath, "utf-8").then(
    (currentSessionJSON: any) => {
      const currentSessionData: { session: boolean; id?: number } =
        JSON.parse(currentSessionJSON);

      if (currentSessionData.session == true) {
        activeSession = true;
        currID = currentSessionData.id as number;
      }
    }
  );

  const HandleLogout2 = async () => {
    "use server";
    await writeFile(
      currentSessionPath,
      JSON.stringify({ session: false, id: 0 })
    );
  };

  let realUser: boolean = false;

  interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    intro: string;
    experience: {
      experience: string;
      experienceDescription: string;
    }[];

    previousProjects: {
      title: string;
      url: string;
      shortDescription: string;
    }[];
  }

  const activeSessionFile =
    "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/users.json";

  let currentUser: User | null = null;

  await readFile(activeSessionFile, "utf-8")
    .then((json) => JSON.parse(json))
    .then((activeSessionJSON: { users: User[] }) => {
      activeSessionJSON.users.every((user) => {
        if (user.id == currID) {
          realUser = true;
          currentUser = user;
          return false;
        }
        return true;
      });
    })
    .catch((error) => console.error("Error: " + error));

  if (currentUser == null) {
    return;
  }
  currentUser = currentUser as User;

  const navbarArray = activeSession
    ? ["Home", "Search", "Profile", "Projects", "Logout"]
    : ["Home", "Search", "Login"];

  return (
    <div className="flex flex-row space-x-10 mt-2 bg-fuchsia-100">
      <div className="basis-3/4">Logo</div>
      {navbarArray.map((link: string) => {
        let hreflink: string =
          link != "Profile"
            ? `../${link.toLowerCase()}`
            : (currentUser?.username as string);

        if (link == "Logout")
          return <Logout writeFileFucntion={HandleLogout2} />;
        else {
          return (
            <div className="basis-1/12 hover:text-zinc-700" key={link}>
              <Link
                className="whitespace-nowrap"
                href={link != "Logout" ? hreflink : "../home"}
              >
                {link}
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Navbar;
