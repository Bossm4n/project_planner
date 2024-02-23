import React from "react";
import DropdownClient from "./dropdownclient";
import { readFile, writeFile } from "fs/promises";
import { ProjectListing } from "@/app/common_components/interfaces";

const ListingPopUp = async () => {
  async function formAction(popupFormData: FormData) {
    "use server";

    // For efficiency in the long run load in all the data categories here, instead of loading it before the adding it to the hidden input then loading it again though getting the form data

    const newProjectData: ProjectListing = {
      projectTitle: popupFormData.get("title")?.toString() as string,
      projectDescription: popupFormData
        .get("description")
        ?.toString() as string,
      projectCategories: popupFormData
        .get("dropdownData")
        ?.toString()
        .split(",") as string[],
    };

    const projectListingsFile =
      "/src/app/data/projects_data/listed_projects.json";

    readFile(process.cwd() + projectListingsFile, "utf-8")
      .then((allProjectListingsData) => {
        const allProjectListings: ProjectListing[] = JSON.parse(
          allProjectListingsData
        );

        let [invalidTitle, invalidDescription, invalidCategories] = [
          false,
          false,
          false,
        ];

        const newProjectTitle: string = newProjectData.projectTitle as string;

        allProjectListings.every((projectListing) => {
          if (
            (!invalidTitle && projectListing.projectTitle == newProjectTitle) ||
            newProjectTitle.length >= 50 ||
            newProjectTitle.length <= 12
          ) {
            invalidTitle = true;
            return false;
          }

          return true;
        });

        if (
          !invalidDescription &&
          newProjectData.projectDescription?.length != undefined &&
          (newProjectData.projectDescription.length >= 200 ||
            newProjectData.projectDescription.length <= 30)
        ) {
          console.log("Invalid Project description");
          invalidDescription = true;
        }

        if (
          !invalidCategories &&
          newProjectData.projectCategories?.length != undefined &&
          newProjectData.projectCategories?.length == 0
        ) {
          console.log("No categories selected");
          invalidCategories = true;
        }

        if (invalidTitle || invalidDescription || invalidCategories) {
          return;
        }

        const newID: number =
          (allProjectListings[allProjectListings.length - 1]?.id as number) + 1;

        newProjectData.id = newID;

        allProjectListings.push(newProjectData);

        console.log(allProjectListings);

        writeFile(
          process.cwd() + projectListingsFile,
          JSON.stringify(allProjectListings, null, 2),
          "utf-8"
        );
      })
      .catch((error) => console.error(error));

    // if(organisedData.title)
  }

  return (
    <form action={formAction}>
      <label htmlFor="title">Project Title</label>
      <br />
      <input type="text" name="title" id="title" />
      <br />
      <label htmlFor="description">Project Description</label>
      <br />
      <input type="text" name="description" id="description" />
      <div>
        <div>Choose Categories:</div>
        <DropdownClient />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ListingPopUp;
