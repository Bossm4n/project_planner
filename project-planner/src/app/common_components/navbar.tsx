import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row space-x-10">
      <div className="basis-3/4">Logo</div>
      <div className="basis-1/12">
        <Link className="whitespace-nowrap" href="../home">
          Home
        </Link>
      </div>
      <div className="basis-1/12">
        <Link className="whitespace-nowrap" href="../search">
          Project Search
        </Link>
      </div>
      <div className="basis-1/12">
        <Link className="whitespace-nowrap" href="../profile">
          Profile
        </Link>
      </div>
      <div className="basis-1/12">
        <Link className="whitespace-nowrap" href="../projects">
          Projects
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
