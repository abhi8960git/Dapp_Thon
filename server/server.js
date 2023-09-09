const express = require("express");
const bodyParser = require("body-parser");
const { Web3 } = require("web3");
const ABI = require("./ABI.json");
const { SpheronClient, ProtocolEnum } = require("@spheron/storage");
const dotenv = require("dotenv");
const multer = require("multer")
const cors = require("cors");







// Define the storage for uploaded files using multer.diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('in_here_01',file)
    // Specify the directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    console.log('in_here_02',file)
    // Specify how files should be named
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });









// keep the key secret as it can be paid
const web3 = new Web3(
  "https://lingering-tiniest-meadow.ethereum-sepolia.discover.quiknode.pro/612b4f1fdecd98605e21eb212c3a1a2f9c4c7496/"
);
const contractAddress = "0x95190C52624363beD26DFcAA40f2Ae7893d3AE68";

dotenv.config();
const client = new SpheronClient({ token: process.env.TOKEN });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// contract address

const contract = new web3.eth.Contract(ABI, contractAddress);
// console.log(contract.methods);
/**
 *
 */

const FetchNFT = async (account) => {
  try {
    const nftBalance = await contract.methods.balanceOf(account).call();
    return nftBalance;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/mint", async (req, res) => {
  const tokenURI = req.body.tokenURI;
  const account = req.body.account;

  try {
    const tokenId = await contract.methods
      .MintItem(tokenURI)
      .send({ from: account });
    res.send({ tokenId });
  } catch (error) {
    res.send(error);
  }
});

// This api end point will upload out file imag path to ipfs (Spheron Storage ) and return the ipfs uploaded url

app.post("/api/upload", async (req, res) => {
  const name = "my-bucket";

  const { filePath } = req.body;

  const lastIndex = filePath.lastIndexOf("/");
  const fileName = filePath.substring(lastIndex + 1);

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
    if (cid) {
      res.redirect(200).json({
        message: "Upload completed",
        // uploadId,
        // bucketId,
        // protocolLink,
        // dynamicLinks,
        // cid,
        link: `https://${cid}.ipfs.sphn.link/${fileName}`,
      });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    // Send an error response to the frontend
    res.sendStatus(500).json({ error: "Error uploading file" });
  }
});

// this api end point is to get the NFT count of a user having public address

app.post("/api/members", async (req, res) => {
  try {
    const account = req.body.from;
    console.log("this is account", account);

    const numNFTs = await FetchNFT(account);
    const nfts = Number(numNFTs);
    console.log(nfts);

    if (nfts > 0) {
      res.status(200).json({ status: 200, nfts });
    } else {
      res.status(400).json({ status: 400, nfts });
    }
    // console.log( typeof numNFTs)
    // res.status(200).send(numNFTs.toString())
  } catch (error) {
    // res.sendStatus(500);
    // res.json({"error": error});
    res.status(500).json({ error: error });
    console.error(error);
  }
});

// multer use case



app.post('/upload/multer', upload.single('file'), (req, res) => {
  // Handle the uploaded file here
  const uploadedFile = req.file;
  console.log(uploadedFile)
  if (!uploadedFile) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // You can access file information via uploadedFile object
  res.json({ message: 'File uploaded successfully', file: uploadedFile });
});



app.get("/good", (req, res) => {
  console.log("ehloo");
});

app.listen(PORT, () => {
  console.log(`Server listining to ${PORT}`);
});
