import Navbar from "@/app/common_components/navbar";
import React, { ReactHTML, ReactHTMLElement } from "react";
import { readFile } from "fs/promises";
import { CheckActiveSession } from "@/app/common_components/server_functions";
import { ProjectListing, User } from "@/app/common_components/interfaces";
import Link from "next/link";

const ListedProjectsComponent = async () => {
  // Check if a user is logged in
  const checkActiveSessionResult = await CheckActiveSession();
  if (typeof checkActiveSessionResult !== "number")
    return checkActiveSessionResult;
  const currUserID: number = checkActiveSessionResult;
  console.log("Current User ID: " + currUserID);

  // Read the projects file
  const listedProjectsFile = "/src/app/data/project_data/listed_projects.json";
  let currUserListedProjects: ProjectListing[] | undefined = undefined;

  await readFile(process.cwd() + listedProjectsFile, "utf-8")
    .then((listedProjectsJSON) => {
      const allListedProjectsParsed: ProjectListing[] =
        JSON.parse(listedProjectsJSON);
      return allListedProjectsParsed;
    })
    .then((allListedProjects: ProjectListing[]) => {
      const usersListedProjects: ProjectListing[] = allListedProjects.filter(
        (project) => project.projectCreatorID === currUserID
      );
      currUserListedProjects = usersListedProjects;
    })
    .catch((err) => console.log("Error: " + err));

  console.log("Current User Listed Projects: ", currUserListedProjects);
  const listedProjectsHTML = async () => {
    if (currUserListedProjects?.length == 0) {
      return <div>No Listed projects</div>;
    }

    const finalHTML: React.JSX.Element[] = [];

    // If using a database makes more sense to pull the ids below in the foreach and then pull data but using json it is quicker to pull it before

    const allUsersFile = "/src/app/data/users/all_users.json";
    let allUsers: User[] | undefined = undefined;

    await readFile(process.cwd() + allUsersFile, "utf-8")
      .then((allUsersJSON) => {
        const allUsersParsed = JSON.parse(allUsersJSON);
        allUsers = allUsersParsed.users;
      })
      .catch((err) => console.error("Error Line 43: " + err));

    console.log(allUsers);

    const getUsersHTML = async (currListedProject: ProjectListing) => {
      const usersHTMLArray: React.JSX.Element[] = [];
      currListedProject.usersApplied.forEach((userApplicantID, currIndex) => {
        const currUser = allUsers?.find((user) => user.id == userApplicantID);
        usersHTMLArray.push(
          <li>
            <Link href={"/" + currUser?.username}>
              Applicant {currIndex + 1}: {currUser?.username}
            </Link>
            <div>Email: {currUser?.email}</div>
          </li>
        );
      });
      return usersHTMLArray;
    };

    currUserListedProjects?.forEach((listedProject) => {
      const currProjectHTML = (
        <div>
          <div>{listedProject.projectTitle}</div>
          <div>{listedProject.projectDescription}</div>
          <ul>{getUsersHTML(listedProject)}</ul>
          <br />
        </div>
      );
      finalHTML.push(currProjectHTML);
    });

    return finalHTML;
  };

  return (
    <div>
      <Navbar />
      <div>All Listed Projects</div>
      {listedProjectsHTML()}
    </div>
  );
};

export default ListedProjectsComponent;
