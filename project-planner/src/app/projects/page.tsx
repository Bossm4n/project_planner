import React from "react";
import Navbar from "../common_components/navbar";
import Link from "next/link";

const Projects = () => {
  return (
    <div>
      <Navbar />

      {/* My Projects Banner */}
      <div className="h-24 w-screen flex items-center justify-center border border-black ">
        <div className="text-center text-3xl">My Projects</div>
      </div>

      {/* Current Projects */}
      <div className="flex flex-row mt-3 justify-around">
        {["Project_1", "Project_2", "Project_3", "Project_4"].map(
          (project, index) => {
            return (
              <div className="flex flex-col items-center w-11/12">
                {/* Project title and progress pie chart */}
                <Link
                  href={`projects/${project.replace(/_/g, "").toLowerCase()}`}
                >
                  {project}
                </Link>
                <div className="size-28 flex justify-center items-center border rounded-full mt-1 hover:transform hover:scale-105 hover:mt-1 transition-all">
                  percent
                </div>

                {/* Recent task */}
                <div className="text-left w-11/12 border mt-2">
                  <div>Most recent task</div>
                  <div>
                    Magna eu deserunt reprehenderit sunt ullamco ea do esse
                    duis.
                  </div>
                  <div>Collaborators</div>
                  <div>Projevt started: 12/12/12</div>
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
