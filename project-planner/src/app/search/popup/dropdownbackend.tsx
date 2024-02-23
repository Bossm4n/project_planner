import React from "react";
import projectListingCategories from "../../data/project_data/project_listing_categories.json";

function convertToTitleCase(str: string) {
  // Split the string by underscores and capitalize each word
  let words = str.split("_").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  // Join the words back together with a space between them
  return words.join(" ");
}

const DropdownBackend = () => {
  const categories: { listing_categories: string[] } = projectListingCategories;

  return categories["listing_categories"].map((curr_category, i) => {
    return (
      <div
        className="flex flex-row justify-between"
        key={"listingCategories" + i}
      >
        <label htmlFor={curr_category} className="text-sm">
          {convertToTitleCase(curr_category)}
        </label>
        <input type="checkbox" name={curr_category} />
      </div>
    );
  });
};

export default DropdownBackend;
