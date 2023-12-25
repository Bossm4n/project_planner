import React, { ReactNode } from "react";
import Navbar from "../common_components/navbar";
import Link from "next/link";

const Profile = () => {
  const getPreviousProjects: Record<string, string>[] = [
    {
      title: "Project1",
      url: "projects/project1",
      shortDescription:
        "Labore est Lorem voluptate anim velit esse aute culpa cillum occaecat. Magna labore ad quis sint Lorem anim est id culpa dolor.",
    },
    {
      title: "Project2",
      url: "projects/project2",
      shortDescription:
        "Labore nulla do ad excepteur culpa incididunt. Pariatur minim in dolore ea. Aliqua aliqua duis nulla sit adipisicing aliqua dolore enim tempor.",
    },
  ];

  const getExperience: Record<string, string>[] = [
    {
      experience: "Experience 1",
      experienceDescription:
        "Tempor elit exercitation consectetur aute ea officia veniam id deserunt pariatur incididunt aute dolore. Deserunt veniam consectetur fugiat dolor sunt enim consequat qui mollit aliqua Lorem minim pariatur.",
    },
    {
      experience: "Experience 2",
      experienceDescription:
        "Est non officia do in ut aliquip deserunt aliquip mollit duis tempor do nulla. Nostrud enim consequat anim reprehenderit eiusmod dolore excepteur mollit magna.",
    },
  ];

  const previousProjectsHTML = () => {
    if (getPreviousProjects.length == 0) {
      return <></>;
    } else {
      const experienceHTMLArray: ReactNode[] = [];
      getPreviousProjects.forEach((project) => {
        experienceHTMLArray.push(
          <div>
            <Link href={project["url"]} className="hover:cursor-text">
              {project["title"]}
            </Link>
            <div>{project["shortDescription"]}</div>
          </div>
        );
      });

      return (
        <div className="flex flex-col basis-1/3 mt-9">
          {experienceHTMLArray}
        </div>
      );
    }
  };

  const experienceHTML = () => {
    if (getExperience.length == 0) {
      return <></>;
    } else {
      const experienceHTMLArray: ReactNode[] = [];
      getExperience.forEach((experience) => {
        experienceHTMLArray.push(
          <li>
            <div>{experience["experience"]}:</div>
            <div>{experience["experienceDescription"]}</div>
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
              <div className="mt-1">
                Est occaecat laborum velit ea tempor occaecat officia et.
                Excepteur commodo ut do commodo adipisicing sunt do voluptate do
                mollit. Ad proident velit reprehenderit anim velit sint esse
                magna officia deserunt ullamco. Ullamco adipisicing ea duis ea
                tempor ea labore in proident ad reprehenderit sint commodo
                aliquip.
              </div>
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

export default Profile;
