import Button from "@/components/Button";
import Card from "@/components/Card";
import { Inter } from "next/font/google";
import { useState, useEffect, use } from "react";
import pokemon from '../public/20048-2-pikachu-hd.png';
import dragon from '../public/png-image.png';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [account, setAccount] = useState(null);

  // connect wallet function 


  // is wallet connect function 

  

  return (
    <div
      className={`flex flex-col justify-center items-center gap-10`}
    >
      <div className="glassmorphism p-3 flex items-center justify-between w-[80%] px-10  mt-10 ">
        <p className="font text-white text-4xl text-yellow-300">PokeVerse</p>
        <button className="button">Connect wallet</button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-evenly lg:gap-[138px] gap-[30px] ">
        <div className=" mt-[-36px] w-[150%]   lg:w-[500px] h-[700px] glassmorphism border-2 border-red-500 p-6 relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[700px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <p className="font text-xl tracking-[7px] text-white mt-3 mb-0">
            Customize NFT with AR{" "}
          </p>
          <Card text={"Enter in AR"} image={pokemon} />
        </div>

        <div className=" mb-9 w-[150%] lg:w-[900px] h-[700px]   glassmorphism border-2 border-red-500 p-7  relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[700px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <p className="font text-xl tracking-[7px] text-white mt-3 mb-0">
            Enter in Pokemon Game{" "}
          </p>
          <Card text={"Enter in Game"} image={dragon} />
        </div>
      </div>
    </div>
  );
}
