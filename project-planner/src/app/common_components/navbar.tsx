"use server";
import React from "react";
import Link from "next/link";
import { readFile } from "fs/promises";

const Navbar = async () => {
  const currentSessionPath =
    "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/current_session.json";

  let activeSession: boolean = false;

  await readFile(currentSessionPath, "utf-8").then(
    (currentSessionJSON: any) => {
      const currentSessionData: { session: boolean; id?: number } =
        JSON.parse(currentSessionJSON);

      console.log(currentSessionData.session);
      if (currentSessionData.session == true) activeSession = true;
    }
  );

  // activeSession = false;

  const navbarArray = activeSession
    ? ["Home", "Search", "Profile", "Projects", "Logout"]
    : ["Home", "Search", "Login"];

  return (
    <div className="flex flex-row space-x-10 mt-2">
      <div className="basis-3/4">Logo</div>
      {navbarArray.map((link: string) => {
        return (
          <div className="basis-1/12 hover:text-zinc-700" key={link}>
            <Link
              className="whitespace-nowrap"
              href={`../${link.toLowerCase()}`}
            >
              {link}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
