import React from "react";
import Navbar from "../common_components/navbar";
import Link from "next/link";
import exampleProjects from "./projects";

const Projects = () => {
  return (
    <div>
      <Navbar />

      {/* My Projects Banner */}
      <div className="h-24 w-screen flex items-center justify-center border border-black mt-2">
        <div className="text-center text-3xl">My Projects</div>
      </div>

      {/* Current Projects */}
      <div className="flex flex-row mt-3 justify-around">
        {["Project_1", "Project_2", "Project_3", "Project_4"].map(
          (project, index) => {
            const currProjectName = project.replace(/_/g, "").toLowerCase();

            return (
              <div className="flex flex-col items-center w-11/12">
                {/* Project title and progress pie chart */}
                <Link href={`projects/${currProjectName}`}>{project}</Link>
                <div className="size-28 flex justify-center items-center border rounded-full mt-1 hover:transform hover:scale-105 hover:mt-1 transition-all text-xl">
                  {exampleProjects[currProjectName].percent}
                </div>

                {/* Recent task */}
                <div className="text-left w-11/12 border mt-2">
                  <div className="text-lg">
                    <b>Most recent task:</b>
                  </div>
                  <div>
                    {exampleProjects[currProjectName].tasks_remaining[0]}
                  </div>
                  <div>Collaborators</div>
                  <div>
                    Date started:{" "}
                    {exampleProjects[currProjectName].date_started}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Projects;
