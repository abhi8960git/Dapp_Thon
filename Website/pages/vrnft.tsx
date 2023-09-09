import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/output-onlinegiftools.gif";
import metamask from "../public/metamask-seeklogo.com.svg";
import spheron from "../public/icon-spheron-network.png";
import link from "../public/output-onlinegiftools(1).gif";
import nft from "../public/png-image.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import Web3 from "web3";
import Dropzonee from "@/components/Dropzone";
import axios from "axios";



export default function App() {
  const [accounts, setAccounts] = useState([]);
  const [file, setFile] = useState(null);
  console.log('in_file_vrnft',file);
  const [ipfsLink, setIpfsLink] = useState(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");


  // wallet function 

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        console.log(accounts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isWalletConnected = () => {
    return accounts.length > 0;
  };

  function trimString(str: any) {
    if (str.length > 9) {
      const center = Math.floor(str.length / 2);
      str = str.substring(0, center - 1) + "." + str.substring(center + 2);
    }
    return str;
  }

  // dropzone handle submit function

  const handleSubmit = async () => {
    if (uploadState === "Uploading") return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", file);
    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/upload",
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      });
      setIpfsLink(data.ipfsLink);
      //  setId(data.id);
    } catch (error: any) {
      console.log(error.response.data);
      setUploadState("Upload Failed");
    }
  };


  // Mint NFT Function 

  const MintNFT = async()=>{


    try {

      
    } catch (error) {
      
    }

  }





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
              <ModalHeader className="">Mint Your NFT Here</ModalHeader>
              <ModalBody>
                {true ? (
                  <div>
                    <div className="flex items-center mx-7 glassmorphism ">
                      {/* <Image src={logo} width={45} alt="logo"></Image>
                      <p className="text-white">
                        Screenshot from 2023-08-30 16-42-32.png
                      </p> */}
                      {!ipfsLink && (
                        <Dropzonee setFile={setFile}></Dropzonee>
                      )}

                      {/* <p className='text-blue-500 p-6'>{file?.name}</p> */}

                     
                      {/* {file && !ipfsLink && (
                        <button className="button mt-4" onClick={handleSubmit}>
                          <span>Upload</span>
                        </button>
                      )} */}

                    </div>
                    <div className=" mx-8 text-xl uppercase flex  justify-evenly mt-7 ">
                      <button
                        className="flex items-center text-white gap-2 glassmorphism p-3   "
                        onClick={connectWallet}
                      >
                        {isWalletConnected() ? (
                          <p>CONNECTED</p>
                        ) : (
                          <p> CONNECT WALLET </p>
                        )}
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

                {
                  <div className="glassmorphism mx-[140px] my-[80px] ">
                    <div className="flex flex-col items-center m-6 text-white font tracking-[3px]">
                      <p>Abhishek Kumar</p>
                      <div className="h-[2px] w-full bg-white my-3"></div>
                      <Image src={nft} alt="nft_card_Image"></Image>
                      <div className="h-[2px] w-full bg-white my-3 font tracking-[3px] "></div>
                      <p>Ox98347937859347594375984</p>
                    </div>
                  </div>
                }
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
