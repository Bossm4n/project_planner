import React, { ReactNode } from "react";
import Navbar from "../common_components/navbar";
import Link from "next/link";
import { readFile } from "fs/promises";
import { User } from "../common_components/interfaces";

const Profile = async ({ params }: { params: { user: string } }) => {
  const allUsersFile = "/src/app/data/users/all_users.json";

  let realUser: boolean = false;

  let currentUser: User | null = null;

  await readFile(process.cwd() + allUsersFile, "utf-8")
    .then((json) => JSON.parse(json))
    .then((activeSessionJSON: { users: User[] }) => {
      activeSessionJSON.users.every((user) => {
        if (user.username == params.user) {
          realUser = true;
          currentUser = user;
          return false;
        }
        return true;
      });
    })
    .catch((error) => console.error("Error: " + error));

  console.log(realUser);

  if (!realUser || currentUser == null) {
    return (
      <div>
        <Navbar />
        Error 404
      </div>
    );
  }
  currentUser = currentUser as User;

  console.log(currentUser);

  const previousProjectsHTML = () => {
    if (
      currentUser?.previousProjects == undefined ||
      currentUser?.previousProjects.length == 0
    ) {
      return <></>;
    } else {
      const previousProjectsHTMLArray: ReactNode[] = [];
      currentUser?.previousProjects.forEach((project) => {
        previousProjectsHTMLArray.push(
          <div>
            <Link href={"projects" + "/" + project.title}>{project.title}</Link>
            <div>{project.shortDescription}</div>
          </div>
        );
      });

      return (
        <div className="flex flex-col basis-1/3 mt-9">
          {previousProjectsHTMLArray}
        </div>
      );
    }
  };

  const experienceHTML = () => {
    if (
      currentUser?.experience == undefined ||
      currentUser?.experience.length == 0
    ) {
      return <></>;
    } else {
      const experienceHTMLArray: ReactNode[] = [];
      currentUser?.experience.forEach((experience) => {
        experienceHTMLArray.push(
          <li>
            <div>{experience.experienceName}:</div>
            <div>{experience.experienceDescription}</div>
          </li>
        );
      });

      return (
        <>
          <div className="text-3xl mt-2">Experience</div>
          <ul className="flex flex-col space-y-3 mt-1">
            {experienceHTMLArray}
          </ul>
        </>
      );
    }
  };

  return (
    <div>
      <Navbar />

      {/* Banner */}
      <div className="h-36 border border-black mt-3">
        <div>Banner</div>
      </div>

      {/* Profile Image */}
      <div className="right-16 size-24 -mt-12 border border-black rounded-full text-center absolute">
        Img
      </div>

      {/* Main text content and Projects */}
      <div className="mt-3">
        <div className="flex flex-row mt-2">
          <div className="border basis-2/3 mr-2">
            <div>
              {/* Introduction */}
              <div className="text-3xl">Intro</div>
              <div className="mt-1">{currentUser.intro}</div>
            </div>

            {/* Experience */}
            {experienceHTML()}
          </div>
          {/* Projects */}
          {previousProjectsHTML()}
        </div>
      </div>

      <div className="mt-2">
        <div className="text-3xl">Links</div>
        <ul className="flex flex-row space-x-3 mt-1">
          <li>LinkedIn</li>
          <li>Github</li>
          <li>Twitter</li>
          <li>Facebook</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
