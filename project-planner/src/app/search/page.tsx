"use server";
import React, { useRef } from "react";
import Navbar from "../common_components/navbar";
import projectListings from "../data/project_listings.json";
import projectListingCategories from "../data/project_listing_categories.json";
import ListingsClient from "./listingsclient";
import PopUpClient from "./popupclient";

interface Listing {
  title: string;
  description: string;
  categories?: string[];
}

const Search = () => {
  // Categories defined as string elements in an array
  const categories: { listing_categories: string[] } = projectListingCategories;

  const listings: Listing[] = projectListings;

  const categories2: string[] = [
    "Software Engineering",
    "Data Science",
    "Architecture",
    "Data Analysis",
    "Mechanical Engineering",
  ];

  return (
    <div>
      <Navbar />
      <div className="mt-3">
        {/* Pop up */}
        <div className="bg-gray-200 p-1">
          <div className="flex flex-row justify-between">
            <div>Create a listing</div>
            <div>X</div>
          </div>
          <form action="">
            <label htmlFor="title">Project Title</label>
            <br />
            <input type="text" name="title" />
            <br />
            <label htmlFor="title">Project Description</label>
            <br />
            <input type="text" name="title" />
            <div>
              <div>Choose Categories:</div>
              <PopUpClient />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Create a listing */}
        <div>
          <div>Create a listing</div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            optio ex aspernatur corporis debitis eaque nulla ut veniam iure
            assumenda nobis.
          </div>
          <div className="flex justify-end">
            <button className="mr-3 border p-1 -m-1 rounded-lg">Create</button>
          </div>
        </div>

        <div className="flex flex-row">
          {/* Categories section */}
          <div className="basis-1/3 flex-grow bg-red-50 p-1">
            <div data-categories-active="" id="categories">
              Categories
            </div>
            <div className="bg-red-200">
              {categories.listing_categories.map((category) => {
                const formattedCategory = category
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                return (
                  <div className="flex justify-between">
                    <div>{formattedCategory}</div>
                    <ListingsClient />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Listings Section */}
          <div className="basis-2/3 space-y-2" id="listings">
            <div>Listings</div>

            {/* Maps each listing from the database to its own individual element */}
            {listings.map((listing) => {
              return (
                <div
                  className="border border-black p-2 flex flex-col"
                  data-categories={listing.categories}
                >
                  <div>
                    Project Title: <b>{listing.title}</b>
                  </div>
                  <div className="flex flex-col">
                    <div>{listing.description}</div>
                    <div className="self-end mr-2 bg-blue-600 p-1 rounded-md text-cyan-500 hover:text-cyan-400 hover:bg-blue-700">
                      Join
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
