import PokeSlider from '@/components/PokeSlider'
import React from 'react'
import Image from 'next/image'
import img from '../public/charizard/4hsh(1).gif';
import attack from '../public/charizard/3nRA.gif';
import attack1 from '../public/charizard/Ybic.gif';
const game = () => {
  return (
    <div className="flex justify-center flex-col items-center h-full mt-[50px] py-7">
    <div className="glassmorphism w-[90%] md:w-[70%] flex justify-center items-center py-4 my-7 tracking-[3px] text-[15px] md:text-[40px] text-yellow-200 font "> Attacks Gallery</div>
  <div className="glassmorphism  w-[90%] md:w-[70%] flex justify-center items-center py-[90px]">
    <div className="w-[600px] flex ">

        {/* <div>
            <Image src={img}  alt='charizard'></Image>
            
        </div>
        <div className='w-[2px] h-[250px] bg-white'> </div> */}
        {/* <div className='glassmorphism ml-2 '>
        <Image src={attack}  alt='charizard'></Image>
            

        </div> */}

       <div className='flex flex-col glassmorphism justify-center items-center p-10'>
       <div className=' border border-yellow-200  '>
        <Image src={attack1}  alt='charizard'></Image>
            
        </div>
      <div className=' text-yellow-200 my-4 w-full flex justify-between gap-[50px] border  border-yellow-200 py-2 px-1 border-l-0 border-r-0 '>
      <p>Attack<br/>FIRE </p>
        <p>Damage <br/> 20HP</p>
      </div>
        <div className='  flex justify-center items-center' >
            <button className='button-minti '>Mint</button>
        </div>
       </div>
   
    </div>
  </div>
</div>


  )
}

export default game