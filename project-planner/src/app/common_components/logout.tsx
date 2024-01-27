"use client";
import React from "react";
import Link from "next/link";
import HandleLogout from "./navbarserver";

interface LogoutProps {
  currentSessionPath: string;
  writeFileFucntion: any;
}

const Logout: React.FC<LogoutProps> = ({
  currentSessionPath,
  writeFileFucntion,
}) => {
  return (
    <div className="basis-1/12 hover:text-zinc-700" key="Logout">
      <Link
        className="whitespace-nowrap"
        href="../home"
        onClick={async () => writeFileFucntion(currentSessionPath)}
      >
        Logout
      </Link>
    </div>
  );
};

export default Logout;
