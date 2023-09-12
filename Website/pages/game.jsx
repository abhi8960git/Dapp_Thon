import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/output-onlinegiftools.gif";
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
import PokeSlider from "../components/PokeSlider";

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
        <ModalContent className=" w-[700px] rounded-md ">
          {(onClose) => (
            <>
                 <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
              <PokeSlider></PokeSlider>
                
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
