import Button from "@/components/Button";
import Card from "@/components/Card";
import { Inter } from "next/font/google";
import { useState, useEffect, use } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


 

  return (
    <main
      className={` flex min-h-screen flex-col lg:flex-row gap-8 items-center justify-evenly p-24 ${inter.className} `}
    >
      <div className=" w-[80%]  lg:w-[500px] h-[700px] glassmorphism border-2 border-red-500 p-7 relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[700px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <p className="font text-5xl tracking-[7px] text-[#ffde00]">
          Poke Verse
        </p>
        <p className="font text-xl tracking-[7px] text-white mt-3 mb-0">
          Customize NFT with AR{" "}
        </p>
        <Card text={"Enter in AR"} />
      </div>

      <div className=" w-[80%] lg:w-[900px] h-[700px]  glassmorphism border-2 border-red-500 p-7 relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[700px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <p className="font text-5xl tracking-[7px] text-[#ffde00]">
          Poke Verse
        </p>
        <p className="font text-xl tracking-[7px] text-white mt-3 mb-0">
          Enter in Pokemon Game{" "}
        </p>
        <Card text={"Enter in Game"}/>
      </div>
    </main>
  );
}
