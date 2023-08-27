import React from "react";
import Image from "next/image";
import pokemon from "../public/22-PM-unscreen(1).gif";
import Button from "./Button";
import { useRouter } from "next/router";





const Card = () => {
  const router = useRouter();
  const handleClick = ()=>{
    router.push('/vrnft')
  }
  return (
    <>
      <div className="border-2 border-white mt-[90px]  w-[350px] h-[350px] rounded-full flex items-center justify-center shadow  ">
        <Image width={900} src={pokemon} alt="pikachu" className=" p-2" />
      </div>
      <Button text={"Enter in VR"} onClick ={handleClick}/>
        </>
  );
};

export default Card;
