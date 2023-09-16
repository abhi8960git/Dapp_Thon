import { useDropzone } from "react-dropzone";
import React, { Dispatch, FunctionComponent, useCallback, useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import spheron from '../public/icon-spheron-network.png'

const Dropzonee: FunctionComponent<{ setFile: Dispatch<any> }> = ({ setFile }) => {
  const [responseText, setResponseText] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    // console.log('in dropzone', acceptedFiles);

    
    

    // Add animation for successful drop (green border)
    const dropzoneElement = document.getElementById("dropzone");
    if (dropzoneElement) {
      dropzoneElement.style.border = "4px dashed green";
      setTimeout(() => {
        dropzoneElement.style.border = "4px dashed yellow"; // Reset border
      }, 1000); // Reset the border color after 1 second
    }


    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    const apiEndpoint = 'http://localhost:5000/upload/file';
    const respond = await axios.post(apiEndpoint, formData);

    if(respond.status === 200){
      alert("all good")
    }else{
      alert("not good")
    };

    // Show a success message
    // setResponseText("File successfully dropped!");

    // Simulate an alert after 2 seconds (customize as needed)

    setTimeout(() => {
      // setResponseText(null); // Clear the success message
      alert("File successfully dropped!");
    }, 2000);


    const getFileUrl = "";

    const apiUrl = 'http://localhost:5000/api/upload';
    const response = await axios.get(apiUrl);
    setFile(response.data.url);
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  })
  

  return (
    <div className="h-[200px] w-full glassmorphism flex justify-center items-center">
      <div
        id="dropzone"
        {...getRootProps()}
        className={` w-[90%] md:w-[70%] h-[100px] border-4 transition glasmorphism border-dashed flex justify-center items-center ${isDragReject ? "border-green-500" : "border-red-500"}`}
      >
        <div className="flex flex-col justify-center items-center">
          {isDragReject ? (
            <p className="text-[1.2em] font-[600]">Only JPG and PNG files allowed.</p>
          ) : (
           <div className="flex gap-3"> <p className="text-[1em] md:text-[1.6em] font-[600] text-white">Drag and drop to upload </p>
           <Image width={30} src={spheron} alt="logo"></Image> </div>
          )}
        </div>
      </div>
      <div id="response">{responseText}</div>
    </div>
  );
};

export default Dropzonee;
