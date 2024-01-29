"use server";
import React from "react";
import Navbar from "../common_components/navbar";
import projectListings from "../data/project_listings.json";
import projectListingCategories from "../data/project_listing_categories.json";
import ListingsClient from "./listingsclient";

interface Listing {
  title: string;
  description: string;
  categories?: string[];
}

const Search = () => {
  // Categories defined as string elements in an array
  const categories: { listing_categories: string[] } = projectListingCategories;

  const listings: Listing[] = projectListings;

  return (
    <div>
      <Navbar />
      <div className="mt-3">
        <div>Search ...</div>
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
