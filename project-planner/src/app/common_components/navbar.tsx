import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row space-x-10 mt-2">
      <div className="basis-3/4">Logo</div>
      {["Home", "Search", "Profile", "Projects", "Login"].map(
        (link: string) => {
          return (
            <div className="basis-1/12">
              <Link
                className="whitespace-nowrap"
                href={`../${link.toLowerCase()}`}
              >
                {link}
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Navbar;
