"use server";
import Navbar from "@/app/common_components/navbar";
import React from "react";
import { LiveProject } from "@/app/common_components/interfaces";
import { readFile } from "fs/promises";

const Project = async ({
  searchParams,
}: {
  searchParams: { projectID: string | number };
}) => {
  const activeProjectsFile = "/src/app/data/project_data/active_projects.json";

  let currProject: LiveProject | undefined = undefined;

  await readFile(process.cwd() + activeProjectsFile, "utf-8")
    .then((json) => {
      const activeProjects: LiveProject[] = JSON.parse(json);
      return activeProjects;
    })
    .then((activeProjectsJSON) => {
      const selectedProject = activeProjectsJSON.find(
        (project) =>
          project.liveProjectID.toString() == searchParams.projectID.toString()
      );
      currProject = selectedProject;
    })
    .catch((error) => console.error("Error: " + error));

  if (currProject == undefined) {
    return (
      <div>
        <Navbar />
        <div>404 Error 3</div>
      </div>
    );
  }

  currProject = currProject as LiveProject;

  console.log(currProject);

  return (
    <div>
      <Navbar />
      <div className="mt-3 text-2xl">{currProject.projectName}</div>
      <div className="mt-1">{currProject.projectDescription}</div>
      <ul className="mt-2">
        <div className="text-lg">Tasks Remaing:</div>
        {currProject.projectTasks.incompleteTasks.map((task) => {
          return <li>{task.taskDescription}</li>;
        })}
      </ul>
      <ul className="mt-2">
        <div className="text-lg">Finished Tasks:</div>
        {currProject.projectTasks.completedTasks.map((task) => {
          return <li>{task.taskDescription}</li>;
        })}
      </ul>
    </div>
  );
};

export default Project;
