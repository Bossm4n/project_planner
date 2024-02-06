"use client";
import React from "react";
import PopUpBackend from "./popupbackend";

const PopUpClient = () => {
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

    categoriesDropDown.dataset["selectedCategories"] =
      checkedCategories.join(",");

    categoriesDropDown.classList.toggle("hidden");
  };

  return (
    <div>
      <div className="flex flex-row justify-between text-sm">
        <div>Select</div>
        <div onClick={onClickPopUp}>x</div>
      </div>
      <div
        className="overflow-hidden h-40 overflow-y-scroll"
        id="popupCategories"
        data-selectedCategories=""
      >
        <PopUpBackend />
      </div>
    </div>
  );
};

export default PopUpClient;
