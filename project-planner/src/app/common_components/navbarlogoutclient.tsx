"use client";
import React from "react";
import Link from "next/link";

interface LogoutProps {
  writeFileFucntion: any;
}

const Logout: React.FC<LogoutProps> = ({ writeFileFucntion }) => {
  return (
    <div className="basis-1/12 hover:text-zinc-700" key="Logout">
      <Link
        className="whitespace-nowrap"
        href="../home"
        onClick={async () => writeFileFucntion()}
      >
        Logout
      </Link>
    </div>
  );
};

export default Logout;
