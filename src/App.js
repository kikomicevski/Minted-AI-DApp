import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import axios from 'axios';
import './App.css';
import mainImage from '../src/images/img-header.png';

// Components
import Spinner from 'react-bootstrap/Spinner';
import Navbar from './components/Navbar';

// ABIs
import MintedABI from './abis/MintedABI.json';

const mintedAddress = "0x568c24B0BFd386079c7c6a5b90880153405a605e";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);
  const [message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        const abi = Array.isArray(MintedABI) ? MintedABI : []; // Ensure abi is an array
        const address = mintedAddress;

        const contract = new ethers.Contract(address, abi, signer);
        setContract(contract);
      } else {
        window.alert('Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.error(error);
      window.alert('Failed to load blockchain data. Please check the console for errors.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name === "" || description === "") {
      window.alert("Please provide a name and description");
      return;
    }

    setIsWaiting(true);

    // Call AI API to generate an image based on the description
    const imageData = await createImage();

    // Upload the image to IPFS (NFT.Storage)
    const url = await uploadImage(imageData);

    // Update the image readiness state
    setIsImageReady(true);

    // Set the URL
    setURL(url);

    setIsWaiting(false);
    setMessage("");
  };

  const createImage = async () => {
    setMessage("Generating Image...");

    // You can replace this with different model API's
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1`;

    // Send the request
    try {
      const response = await axios({
        url: URL,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          inputs: description,
          options: { wait_for_model: true },
        }),
        responseType: 'arraybuffer',
      });

      const type = response.headers['content-type'];
      const data = Buffer.from(response.data).toString('base64');
      const img = `data:${type};base64,${data}`; // <-- This is so we can render it on the page
      setImage(img);

      return response.data;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image');
    }
  };

  const uploadImage = async (imageData) => {
    setMessage("Uploading Image...");

    // Create instance of NFT.Storage
    const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY });

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
    });

    // Save the URL
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;

    return url;
  };
  

  const handleMint = async () => {
    try {
      if (contract) {
        const tokenId = await contract.mintNFT(url.toString()); // Convert URL to string
        console.log('Token ID:', tokenId);

        // Rest of the code...
      } else {
        window.alert('Contract instance not available.');
      }
    } catch (error) {
      console.error(error);
      window.alert('Failed to mint the token. Please check the console for errors.');
    }
  };

  return (
    <div className="main text-center mt-4">
      <Navbar account={account} setAccount={setAccount} />

      <img src={mainImage} className="main-image" alt="mainImage" />
      <p>
        Create and Trade AI-Driven NFTs <br />
        Unleash your creativity with AI-powered image generation and mint your creations into NFTs for the blockchain art market.
      </p>
      <div className="main-inputs">
        <input
          type="text"
          placeholder="Enter Name e.g. My First NFT"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Prompt e.g. Cat swimming in the ocean"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="buttons-container">
          <button type="button" className="btn generate-btn" onClick={submitHandler}>
            Generate
          </button>
        </div>
      </div>

      <div className="image-container">
        <div className="image">
          {!isWaiting && image ? (
              <img src={image} alt="AI generated image" />
          ) : (
            isWaiting && (
              <div className="image__placeholder">
                <Spinner animation="border" />
                <p>{message}</p>
              </div>
            )
          )}
        </div>
        {isImageReady && (
          <button className="mint-btn" onClick={handleMint}>
            Mint
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
