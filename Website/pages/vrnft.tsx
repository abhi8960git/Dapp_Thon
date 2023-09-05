// import React,{ useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// const VrNFT = () => {

//   const router = useRouter();

//   const [isConnected, setIsConnected] = useState(false);

//   const connectWallet = async () => {
//     try {
//       // @ts-ignore
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       setIsConnected(true);

//       const state = { address: accounts[0] };
//       const address = accounts[0];
//       const searchParams = new URLSearchParams(state).toString();

//       router.push({
//         pathname: './game',
//         // search: `?state=${searchParams}`,
//         // query:{address}
//       });

//       console.log(accounts[0]); // Output: 0x1234567890abcdef
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const disconnectWallet = async () => {
//     try {
//       // @ts-ignore
//       await window.ethereum.disconnect();
//       setIsConnected(false);
//     } catch (error) {
//       console.error(error);
//     }

//     window.location.reload();

//   };

//   return (
//     <div className='flex justify-center items-center'>
//     {isConnected ? (
//       <button onClick={disconnectWallet}>Disconnect Wallet</button>
//     ) : (
//       <button onClick={connectWallet}>Connect Wallet</button>
//     )}
//   </div>
//   )
// }

// export default VrNFT

import React from "react";
import Image from "next/image";
import logo from "../public/output-onlinegiftools.gif";
import metamask from "../public/metamask-seeklogo.com.svg";
import spheron from "../public/icon-spheron-network.png";
import link from '../public/output-onlinegiftools(1).gif';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex justify-center items-center">
      <Button onPress={onOpen} color="secondary">
        Open Modal
      </Button>
      <Modal
        backdrop="blur" // Apply blur and opacity to the backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="md" // Adjust the radius for a smoother glass effect
        classNames={{
          body: "py-6 bg-opacity-30 backdrop-blur-md backdrop-filter backdrop-saturate-150", // Apply glassmorphic effect to the body
          backdrop: "backdrop-opacity-40", // Adjust backdrop opacity
          base: "border-[#292f46] bg-black bg-opacity-50 backdrop-blur-lg backdrop-filter backdrop-saturate-150", // Apply glassmorphic effect to the base
          header:
            "border-b-[1px] border-[#292f46] backdrop-blur-lg backdrop-filter backdrop-saturate-150", // Apply glassmorphic effect to the header
          footer:
            "border-t-[1px] border-[#292f46] backdrop-blur-lg backdrop-filter backdrop-saturate-150", // Apply glassmorphic effect to the footer
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent className=" w-[70%] rounded-md ">
          {(onClose) => (
            <>
              <ModalHeader className=" flex">Modal Title</ModalHeader>
              <ModalBody>
                {false ? (
                  <div>
                    <div className="flex items-center mx-7 glassmorphism ">
                      <Image src={logo} width={45} alt="logo"></Image>
                      <p className="text-white">
                        Screenshot from 2023-08-30 16-42-32.png
                      </p>
                    </div>
                    <div className=" mx-8 text-xl uppercase flex  justify-evenly mt-7 ">
                      <button className="flex text-white gap-2 glassmorphism p-3   ">
                        CONNECT WALLET{" "}
                        <Image width={30} src={metamask} alt="logo"></Image>
                      </button>
                      <button className="flex text-white gap-2  glassmorphism  p-3">
                        UPLOAD TO IPFS{" "}
                        <Image width={30} src={spheron} alt="logo"></Image>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div className="flex items-center mx-7 glassmorphism ">
                      <Image src={link} width={45} alt="logo"></Image>
                      <p className="text-white">
                        Screenshot from 2023-08-30 16-42-32.png
                      </p>
                    </div>
                   <div className="mt-5 mx-7 flex justify-center items-center">
                   <button className="flex text-white gap-2  glassmorphism  p-3 font-[700]">
                      MINT YOUR NFT{" "}
                    </button>
                   </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="rounded-b-md">
                <Button color="success" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
