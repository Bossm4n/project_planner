import React from "react";
import Link from "next/link";
import { readFile, writeFile } from "fs/promises";
import Logout from "./logout";

const Navbar = async () => {
  const currentSessionPath =
    "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/current_session.json";

  let activeSession: boolean = false;

  await readFile(currentSessionPath, "utf-8").then(
    (currentSessionJSON: any) => {
      const currentSessionData: { session: boolean; id?: number } =
        JSON.parse(currentSessionJSON);

      if (currentSessionData.session == true) activeSession = true;
    }
  );

  const HandleLogout2 = async () => {
    "use server";
    await writeFile(currentSessionPath, JSON.stringify({ session: false }));
  };

  const navbarArray = activeSession
    ? ["Home", "Search", "Profile", "Projects", "Logout"]
    : ["Home", "Search", "Login"];

  return (
    <div className="flex flex-row space-x-10 mt-2">
      <div className="basis-3/4">Logo</div>
      {navbarArray.map((link: string) => {
        let hreflink: string = `../${link.toLowerCase()}`;

        if (link == "Logout")
          return (
            <Logout
              currentSessionPath={currentSessionPath}
              writeFileFucntion={HandleLogout2}
            />
          );
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
