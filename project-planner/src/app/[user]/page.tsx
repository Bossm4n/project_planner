import React, { ReactNode } from "react";
import Navbar from "../common_components/navbar";
import Link from "next/link";
import { readFile } from "fs/promises";
import { GetServerSideProps } from "next";

const Profile = async ({ params }: { params: { user: string } }) => {
  const activeSessionFile =
    "/Users/bazos/Documents/github/project_planner/project-planner/src/app/data/users.json";

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
  let currentUser: User | null = null;

  await readFile(activeSessionFile, "utf-8")
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
    if (currentUser?.previousProjects.length == 0) {
      return <></>;
    } else {
      const previousProjectsHTMLArray: ReactNode[] = [];
      currentUser?.previousProjects.forEach((project) => {
        previousProjectsHTMLArray.push(
          <div>
            <Link href={project.title}>{project.title}</Link>
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
    if (currentUser?.experience.length == 0) {
      return <></>;
    } else {
      const experienceHTMLArray: ReactNode[] = [];
      currentUser?.experience.forEach((experience) => {
        experienceHTMLArray.push(
          <li>
            <div>{experience.experience}:</div>
            <div>{experience.experienceDescription}</div>
          </li>
        );
      });

      return <>{experienceHTMLArray}</>;
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
            <div className="text-3xl mt-2">Experience</div>
            <ul className="flex flex-col space-y-3 mt-1">{experienceHTML()}</ul>
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

export const getServerSideProps2: GetServerSideProps = async (context) => {
  // Get the URL route from the request object
  const route = context.req.url;

  // Pass route as props to the component
  return {
    props: {
      route,
    },
  };
};

export default Profile;
