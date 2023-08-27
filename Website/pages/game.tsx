import React from 'react'
import { useRouter } from 'next/router'
const game = () => {

    const router = useRouter();
    var address:string='';

    const queryString = router.query.state;
    if (typeof queryString === "string") {
        address = queryString.split("=")[1];
      }

    console.log(address);


    const nftCount = async()=>{
        try {
            const account = address;
            const res = await fetch('http://localhost:5000/api/members',{
                method:"POST",
                headers:{
                    "content-type":"applications/json"
                },
                body:JSON.stringify({from:'0x2223899D483506A6d4CcCa6142B2D666656d52c7'})
            })
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        game: 
       <button onClick={nftCount}>reveal msg</button>
    </div>
    
  )
}

export default game