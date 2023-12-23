import React from "react";
import Navbar from "../common_components/navbar";

const Search = () => {
  // Categories defined as string elements in an array
  const categories: string[] = [
    "Software Engineering",
    "Electrical Engineering",
    "Architecure",
    "Mechanical Engineering",
    "Civil Engineering",
    "Data Analysis",
    "Data Science",
    "Machine Learing",
  ];

  const listings: Record<string, string> = {
    "Sustainable Water Solutions for Arid Environments":
      "Design and develop a compact and energy-efficient solar-powered water desalination system for remote and arid regions.",
    "Smart Home Energy Management System":
      "Explore cutting-edge electrical engineering in our 6-month project: 'Smart Home Energy Management System,' integrating IoT, machine learning, and renewable for efficient consumption and sustainability.",
    "Coding Education through Online Collaboration":
      " Create a web-based learning platform called 'CodePilot' for collaborative coding exercises, offering real-time feedback, shared challenges, and personalized analytics for students and educators.",
  };

  return (
    <div>
      <Navbar />
      <div className="mt-3">
        <div>Search ...</div>
        <div className="flex flex-row">
          {/* Categories section */}
          <div className="basis-1/3 flex-grow bg-red-50 p-1">
            <div>Categories</div>
            <div className="bg-red-200">
              {
                // Maps each category to a div element in the flexbox
                categories.map((category) => (
                  <div className="flex justify-between">
                    <div>{category}</div>
                    <button className="bg-blue-500 rounded-md hover:bg-blue-700 ml-auto h-4 w-4 my-auto "></button>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Listings Section */}
          <div className="basis-2/3 space-y-2">
            <div>Listings</div>

            {Object.entries(listings).map(([title, description], index) => {
              return (
                <div className="border border-black p-2 flex flex-col">
                  <div>
                    Project Title: <b>{title}</b>
                  </div>
                  <div className="flex flex-col">
                    <div>{description}</div>
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
