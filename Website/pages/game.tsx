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
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({from:account})
            })
            const data = await res.json();
            if(data.nfts > 0){
                router.push('/pokemon')
            }else{
                window.alert("You don't have NFT's");
            }
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