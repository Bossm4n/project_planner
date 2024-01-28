"use client";
import React from "react";

const ListingsClient = () => {
  return (
    <button
      className="bg-blue-500 rounded-md hover:bg-blue-700 ml-auto h-4 w-4 my-auto "
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        const categoryClassList: DOMTokenList = e.currentTarget.classList;

        categoryClassList.toggle("active");

        const allListings = document.querySelector("#listings");
        allListings?.childNodes.forEach((listing) => {
          const listingElement: HTMLElement = listing as HTMLElement;

          if (!categoryClassList.contains("active")) {
            listingElement.classList.remove("hidden");
            return;
          }

          const categoryNameHTML: HTMLElement = e.currentTarget
            .previousElementSibling as HTMLElement;
          const categoryName: string = categoryNameHTML.innerText;
          const formattedCategoryName = categoryName
            .split(" ")
            .join("_")
            .toLowerCase();

          if (listingElement.dataset.categories == undefined) return;
          const allCategories: string = listingElement.dataset.categories;

          if (!allCategories.includes(formattedCategoryName))
            listingElement.classList.add("hidden");
          else listingElement.classList.remove("hidden");

          // console.log(allCategories);
          // console.log(formattedCategoryName);
          // console.log(listingElement.classList);
        });
      }}
    ></button>
  );
};

export default ListingsClient;
