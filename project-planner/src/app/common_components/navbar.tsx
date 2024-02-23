import React from "react";
import Link from "next/link";
import { readFile, writeFile } from "fs/promises";
import Logout from "./navbarlogoutclient";
import { User } from "./interfaces";

const Navbar = async () => {
  const currentSessionPath = "/src/app/data/users/current_session.json";

  let activeSession: boolean = false;

  let currID: number;

  await readFile(process.cwd() + currentSessionPath, "utf-8")
    .then((currentSessionJSON: any) => {
      // console.log(currentSessionJSON);
      const currentSessionData: { session: boolean; id?: number } =
        JSON.parse(currentSessionJSON);
      return currentSessionData;
    })
    .then((currentSession) => {
      if (currentSession.session == true) {
        activeSession = true;
        currID = currentSession.id as number;
      }
    });

  const HandleLogout2 = async () => {
    "use server";
    await writeFile(
      process.cwd() + currentSessionPath,
      JSON.stringify({ session: false, id: 0 })
    );
  };

  const activeSessionFile = "/src/app/data/users/all_users.json";

  let currentUser: User | null = null;

  await readFile(process.cwd() + activeSessionFile, "utf-8")
    .then((json) => JSON.parse(json))
    .then((activeSessionJSON: { users: User[] }) => {
      activeSessionJSON.users.every((user) => {
        if (user.id == currID) {
          currentUser = user;
          return false;
        }
        return true;
      });
    })
    .catch((error) => console.error("Error: " + error));

  // console.log(currentUser);

  if (currentUser == null) {
    activeSession = false;
  }
  currentUser = currentUser as unknown as User;

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
