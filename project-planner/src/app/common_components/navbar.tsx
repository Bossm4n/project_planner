import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-rows space-x-10">
      <div className="basis-3/4">Logo</div>
      <div className="basis-1/12">
        <Link href="../home">Home</Link>
      </div>
      <div className="basis-1/12">
        <Link href="../search">Search</Link>
      </div>
      <div className="basis-1/12">
        <Link href="../profile">Profile</Link>
      </div>
      <div className="basis-1/12">
        <Link href="../projects">Projects</Link>
      </div>
    </div>
  );
};

export default Navbar;
