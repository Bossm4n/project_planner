import React from "react";
import projectListingCategories from "../data/project_listing_categories.json";

const PopUpBackend = () => {
  const categories: { listing_categories: string[] } = projectListingCategories;

  return categories["listing_categories"].map((curr_category, i) => {
    return (
      <form className="flex flex-row justify-between">
        <label htmlFor={curr_category} className="text-sm">
          {curr_category}
        </label>
        <input type="checkbox" name={curr_category} />
      </form>
    );
  });
};

export default PopUpBackend;
