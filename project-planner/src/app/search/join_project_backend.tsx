// "use server";
// import { readFile } from "fs/promises";

const joinProjectOnClick: React.MouseEventHandler = (e) => {
  // In full project I should add some type of id attribute to the listing which i can reference to 'listed_projects.json', but to cut corners I have just matched the description
  //   console.log(e.currentTarget.previousElementSibling.innerText);
  const previousElement: HTMLDivElement = e.currentTarget
    .previousElementSibling as HTMLDivElement;
  console.log(previousElement.innerText);
  const listed_projects = "/src/app/data/project_data/listed_projects.json";

  //   interface ListedProject {
  //     projectTitle: string;
  //     projectDescription: string;
  //     projectCategories: string[];
  //     id: number;
  //     usersApplied: string[];
  //     projectCreatorID: number;
  //   }
  //   readFile(process.cwd() + listed_projects, "utf-8")
  //     .then((listedProjectsJSON) => {
  //       const listedProjects: ListedProject[] = JSON.parse(listedProjectsJSON);
  //       return listedProjects;
  //     })
  //     .then((listed_projectsArr) => {
  //       console.log(listed_projectsArr);
  //     });
  return;
};

export default joinProjectOnClick;
