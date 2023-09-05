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
            < >
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
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
