import React from "react";
import { readFile, writeFile } from "fs/promises";

interface JoinProjectOnClickProps {
  id: number;
}

const Join: React.FC<JoinProjectOnClickProps> = ({ id }) => {
  const joinProjectOnClick = async (formData: FormData) => {
    "use server";

    const current_session = "/src/app/data/users/current_session.json";
    let loggedIn = false;
    let userID: number;

    interface CurrentSession {
      session: boolean;
      id: number;
    }

    // Checks if there is a logged in user because if there is not should not go through with application process 
    await readFile(process.cwd() + current_session, "utf-8")
      .then((currentSessionJSON) => {
        const currentSessionParsed: CurrentSession =
          JSON.parse(currentSessionJSON);
        return currentSessionParsed;
      })
      .then((currentSession) => {
        if (currentSession.session) {
          userID = currentSession.id;
          loggedIn = true;
        }
      });

    if (!loggedIn) return;

    const formID: number = Number(formData.get("projectID"));
    const listed_projects = "/src/app/data/project_data/listed_projects.json";

    interface ListedProject {
      projectTitle: string;
      projectDescription: string;
      projectCategories: string[];
      id: number;
      usersApplied: string[];
      projectCreatorID: number;
    }

    await readFile(process.cwd() + listed_projects, "utf-8")
      .then((listedProjectsJSON) => {
        const listedProjects: ListedProject[] = JSON.parse(listedProjectsJSON);
        return listedProjects;
      })
      .then((listedProjectsArr) => {
        listedProjectsArr.every((listedProject, projectIndex) => {
          if (listedProject.id == formID) {
            // Check if the applicant has already applied for the project
            let duplicateApplicant: boolean = false;
            listedProject.usersApplied.every((userApplicant) => {
              if (userApplicant == userID.toString()) {
                duplicateApplicant = true;
                return false;
              }
              return true;
            });
            if (duplicateApplicant) return;

            // Add the new id to the project then add it to the original array
            listedProject.usersApplied.push(userID.toString());
            listedProjectsArr[projectIndex] = listedProject;

            console.log(listedProjectsArr);

            // Write the new file
            writeFile(
              process.cwd() + listed_projects,
              JSON.stringify(listedProjectsArr, null, 2),
              "utf-8"
            );
          }
          return true;
        });
      });
  };

  return (
    <form
      className="self-end mr-2 bg-blue-600 p-1 rounded-md text-cyan-500 hover:text-cyan-400 hover:bg-blue-700 hover:cursor-pointer"
      action={joinProjectOnClick}
    >
      <input type="hidden" name="projectID" value={id} />
      <button type="submit">Join</button>
    </form>
  );
};

export default Join;
