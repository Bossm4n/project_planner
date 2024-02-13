"use client";
import React, { useState } from "react";
import DropdownBackend from "./dropdownbackend";

const DropdownClient = () => {
  const [selectedCategories, setSelectedCategories] = useState("");

  // Drops down the categories menu and allows for the catgories to be selected
  const onClickPopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    const checkedCategories: string[] = [];

    const categoriesDropDown: HTMLElement = e.currentTarget.parentElement
      ?.nextElementSibling as HTMLElement;

    categoriesDropDown.childNodes.forEach((categoryElement) => {
      const checkbox: HTMLInputElement =
        categoryElement?.lastChild as HTMLInputElement;
      if (checkbox.checked) {
        checkedCategories.push(checkbox.name);
      }
    });

    setSelectedCategories(checkedCategories.join(","));

    categoriesDropDown.classList.toggle("hidden");
  };

  return (
    <div>
      <input type="hidden" name="dropdownData" value={selectedCategories} />
      <div className="flex flex-row justify-between text-sm">
        <div>Select</div>
        <div onClick={onClickPopUp}>x</div>
      </div>
      <div
        className="overflow-hidden h-40 overflow-y-scroll"
        id="popupCategories"
      >
        <DropdownBackend />
      </div>
    </div>
  );
};

export default DropdownClient;
