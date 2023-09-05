import React from "react";
import Image from "next/image";
import pokemon from "../public/20048-2-pikachu-hd.png";
import Button from "./Button";
import { useRouter } from "next/router";


interface Text{
  text:string
}


const Card = (props:any) => {
  const {text} = props;
  const router = useRouter();
  const handleClick = ()=>{
    router.push('/vrnft')
  }
  return (
    <>
      <div className="border-2 border-white mt-[90px]  w-[350px] h-[350px] rounded-full flex items-center justify-center shadow image-animation  ">
        <Image width={900} src={pokemon} alt="pikachu" className="p-2 " />
      </div>
      <Button text={text} onClick ={handleClick}/>
        </>
  );
};

export default Card;
