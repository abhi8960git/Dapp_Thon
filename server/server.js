const express = require("express");
const bodyParser = require("body-parser");
const { SpheronClient, ProtocolEnum} = require("@spheron/storage");
const dotenv = require("dotenv");
dotenv.config();
const client = new SpheronClient({ token: process.env.TOKEN });

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

app.post("/api/upload", async (req, res) => {
  const name = "my-bucket";

  const { filePath } = req.body;
  let currentlyUploaded = 0;

  try {
    const { uploadId, bucketId, protocolLink, dynamicLinks, cid } =
      await client.upload(filePath, {
        protocol: ProtocolEnum.IPFS,
        name,
        onUploadInitiated: (uploadId) => {
          console.log(`Upload with id ${uploadId} started...`);
        },
        onChunkUploaded: (uploadedSize, totalSize) => {
          currentlyUploaded += uploadedSize;
          console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
        },
      });

    // You can send a response to the frontend indicating success
    res
      .status(200)
      .json({
        message: "Upload completed",
        uploadId,
        bucketId,
        protocolLink,
        dynamicLinks,
        cid,
      });
  } catch (error) {
    console.error("Error uploading file:", error);
    // Send an error response to the frontend
    res.sendStatus(500).json({ error: "Error uploading file" });
  }
});


app.get('/good',(req,res)=>{

 console.log("ehloo");
    
})

app.listen(PORT, ()=>{
    console.log(`Server listining to ${PORT}`);
})
