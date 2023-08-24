const express = require("express");
const bodyParser = require("body-parser");
// const { signAuthMessage } = require("./utils");
const LitJsSdk = require("@lit-protocol/lit-node-client");
const {  ProtocolEnum } = require("@spheron/storage");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = 3000;

const chain = "ethereum";

app.post("/api/upload", async (req, res) => {
  const { filePath, bucketName, walletPrivateKey } = req.body;

  try {
    const authSig = await signAuthMessage(walletPrivateKey);
    const bucketName = "poki_bucket_";

    const client = new LitJsSdk.LitNodeClient({});

    await client.connect();

    const spheron = new SpheronClient({
      token: process.env.TOKEN,
    });

    const uploadResponse = await spheron.encryptUpload({
      authSig,
      accessControlConditions: [],
      chain,
      filePath,
      litNodeClient: client,
      configuration: {
        name: bucketName,
        onUploadInitiated: (uploadId) => {
          console.log(`Upload with id ${uploadId} started....`);
        },
        onChunkUploaded: (uploadSize, totalSize) => {
          console.log(`Upload ${uploadSize}  of ${totalSize} Bytes`);
        },
      },
    });

    res.json(uploadResponse);
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ error: "An error occured while uploading the file" });
  }
});


app.listen(port, () => {
  console.log(`Connected to the Port ${port}`);
  console.log(process.env.TOKEN);
});
