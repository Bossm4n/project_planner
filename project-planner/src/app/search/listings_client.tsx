"use client";
import React from "react";

const ListingsClient = () => {
  function haveCommonElements(array1: string[], array2: string[]) {
    return array1.every((item: string) => array2.includes(item));
  }

  return (
    <button
      className="bg-blue-500 rounded-md hover:bg-blue-700 ml-auto h-4 w-4 my-auto "
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const categoryClassList: DOMTokenList = e.currentTarget.classList;
        categoryClassList.toggle("bg-red-400");
        categoryClassList.toggle("hover:bg-red-500");

        const allListings = document.querySelector("#listings");
        const categoriesID = document.querySelector(
          "#categories"
        ) as HTMLElement;

        const categoryNameHTML: HTMLElement = e.currentTarget
          .previousElementSibling as HTMLElement;
        const categoryName: string = categoryNameHTML.innerText;
        const formattedCategoryName = categoryName
          .split(" ")
          .join("_")
          .toLowerCase();

        const categoriesActive: string = categoriesID.dataset
          .categoriesActive as string;

        // If the catgories active already include the clicked catgeory it removes it from the categories active
        if (categoriesActive.includes(formattedCategoryName)) {
          let categoriesSplit: string[] = categoriesActive.split(",");
          categoriesSplit = categoriesSplit.filter(
            (category) => category != formattedCategoryName
          );
          categoriesID.dataset.categoriesActive = categoriesSplit.join(",");
        }
        // Else it appends it to the end of the data categories
        else {
          categoriesID.dataset.categoriesActive +=
            categoriesID.dataset.categoriesActive != ""
              ? "," + formattedCategoryName
              : formattedCategoryName;
        }

        // For each listing checks if it has the attribute of the current catgeory and if it doesn't it hides the string
        allListings?.childNodes.forEach((listing, index) => {
          if (index == 0) return;

          const listingElement: HTMLElement = listing as HTMLElement;

          // If the categories active are empty it removes the hidden attribute
          if (categoriesID.dataset.categoriesActive == "") {
            listingElement.classList.remove("hidden");
            return;
          }

          const allCategories: string = listingElement.dataset
            .categories as string;

          const allCategoriesArray: string[] = allCategories.split(",");
          const finalCategoriesSplit: string[] = (
            categoriesID.dataset.categoriesActive ?? ""
          ).split(",");

          if (!haveCommonElements(finalCategoriesSplit, allCategoriesArray))
            listingElement.classList.add("hidden");
          else listingElement.classList.remove("hidden");
        });
      }}
    ></button>
  );
};

export default ListingsClient;
