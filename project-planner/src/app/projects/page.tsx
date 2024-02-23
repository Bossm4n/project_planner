"use server";
import React from "react";
import Navbar from "../common_components/navbar";
import Link from "next/link";
import { readFile } from "fs/promises";
import {
  LiveProject,
  User,
  ActiveSession,
} from "../common_components/interfaces";

const Projects = async () => {
  const activeSessionFile = "/src/app/data/users/current_session.json";

  let activeSession: boolean = true;
  let currUserID: number;

  await readFile(process.cwd() + activeSessionFile, "utf-8")
    .then((json) => JSON.parse(json))
    .then((activeSessionJSON: ActiveSession) => {
      if (activeSessionJSON.session == false) activeSession = false;
      else currUserID = activeSessionJSON.id;
      console.log("active session: " + activeSession);
    })
    .catch((error) => console.error("Error: " + error));

  if (!activeSession) {
    return (
      <div>
        <Navbar />
        Error 404
      </div>
    );
  }

  const allUsersFile = "/src/app/data/users/all_users.json";

  let previousProjectsIDs: number[] | undefined = [];

  await readFile(process.cwd() + allUsersFile, "utf-8")
    .then((allUsersJSON) => {
      const allUsers: User[] = JSON.parse(allUsersJSON).users;
      // console.log(allUsers);
      const currUser: User = allUsers.find(
        (user) => user.id == currUserID
      ) as User;
      return currUser;
    })
    .then((currentUser: User) => {
      // console.log(currentUser.previousProjects);
      previousProjectsIDs = currentUser.previousProjects;
    })
    .catch((error) => console.error("Error: " + error));

  const activeProjectsFile = "/src/app/data/project_data/active_projects.json";

  let usersProjectsArr: LiveProject[] = [];

  const previousProjects = false
    ? previousProjectsIDs == undefined ||
      (previousProjectsIDs as number[]).length == 0
    : true;

  console.log("\npreviousProjects", previousProjects);

  if (previousProjects) {
    await readFile(process.cwd() + activeProjectsFile, "utf-8")
      .then((json) => {
        const activeProjects: LiveProject[] = JSON.parse(json);
        // console.log(previousProjectsIDs);
        const tempUsersProjectsArr: LiveProject[] = activeProjects.filter(
          (project) => {
            if (
              (previousProjectsIDs as number[]).includes(project.liveProjectID)
            )
              return true;
            else return false;
          }
        );
        // console.log(tempUsersProjectsArr);
        usersProjectsArr = tempUsersProjectsArr;
      })
      .catch((error) => console.error("Error: " + error));
  }

  const yo = () => {
    console.log("\npreviousProjects2", previousProjects);
    if (!previousProjects) {
      return <></>;
    } else {
      const projectsHTML = usersProjectsArr.map((project) => {
        const currProjectName = project.projectName
          .replace(/\s+/g, "_")
          .toLowerCase();

        return (
          <div className="flex flex-col items-center w-11/12">
            <Link
              href={{
                pathname: `projects/${currProjectName}`,
                query: { projectID: project.liveProjectID },
              }}
              // as={`/projects/${currProjectName}`}
            >
              {project.projectName}
            </Link>
            <div className="size-28 flex justify-center items-center border rounded-full mt-1 hover:transform hover:scale-105 hover:mt-1 transition-all text-xl">
              {project.projectPercent}%
            </div>

            <div className="text-left w-11/12 border mt-2">
              <div className="text-lg">
                <b>Most recent task:</b>
              </div>
              <div>
                {project.projectTasks.incompleteTasks[0].taskDescription}
              </div>
              <div>Collaborators</div>
              <div>Date started: {project.startDate}</div>
            </div>
          </div>
        );
      });

      return projectsHTML;
    }
  };

  return (
    <div>
      <Navbar />

      {/* My Projects Banner */}
      <div className="h-24 w-screen flex items-center justify-center border border-black mt-2">
        <div className="text-center text-3xl">My Projects</div>
      </div>

      {/* Current Projects */}
      <div className="flex flex-row mt-3 justify-around">{yo()}</div>
    </div>
  );
};

export default Projects;
