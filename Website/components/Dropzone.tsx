import { useDropzone } from "react-dropzone";
import Image from "next/image";
// import img from '../../public/folder.gif'
import React, { Dispatch, FunctionComponent, useCallback } from 'react'
import { access } from "fs";

const Dropzonee:FunctionComponent<{setFile:Dispatch<any>}> = ({setFile}) => {
  const onDrop = useCallback((acceptedFiles:any) => {
    console.log('in dopzone',acceptedFiles)
    setFile(acceptedFiles[0]);
  }, [])

  
  const { getInputProps, getRootProps, isDragReject, isDragActive, isDragAccept } = useDropzone({
    onDrop,
    multiple: false,
  
  });

  return (
    <div className="h-[200px] w-full glassmorphism  flex justify-center items-center">
      <div {...getRootProps()} className={`w-[70%] h-[100px] border-4 transition glasmorphism border-dashed flex justify-center items-center ${isDragReject ?"border-red-500": "border-green-500" }`}  >
        <input {...getInputProps()} ></input>
        <div className="flex flex-col justify-center items-center">
          {
            isDragReject ? (
              <p className="text-[1.2em] font-[600]">only jpg ,png </p>

            ) :
              (
                <p className="text-[1.2em] font-[600] text-white">drag and drop</p>

              )
          }
          {/* <Image src={img} alt="gif" width={200} height={200}></Image> */}
        </div>
      </div>
    </div>
  )
}

export default Dropzonee