import React from 'react'
import nft from '../public/png-image.png'
import Image from 'next/image'

const PokeCard = () => {
  return (
   
    <div className="glassmorphism mx-[14px] my-[14px] ">
    <div className="flex flex-col items-center m-6 text-white font tracking-[3px]">
      <p>Abhishek Kumar</p>
      <div className="h-[2px] w-full bg-white my-3"></div>
     <Image src={nft} alt="nft_card_Image"></Image>
      <div className="h-[2px] w-full bg-white my-3 font tracking-[3px] "></div>
   <p className='text-sm'>Ox98347937859347594375984</p>

   <div className='glassmorphism p-3 px-6 mt-3 text-md  shadow-lg hover:animate-pulse'>
    <button className='tracking-[3px]'>Get NFT</button>

   </div>
     </div>
   </div>
  )
}

export default PokeCard