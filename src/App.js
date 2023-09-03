import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import axios from 'axios';
import './index.css'
import './App.css';
import mainImage from '../src/images/img-header.png';

// Components
import Spinner from 'react-bootstrap/Spinner';
import PhoneCard from './components/PhoneCard';

// ABIs
import MintedABI from './abis/MintedABI.json';

const mintedAddress = "0x184CE4383e9554356c4b66Ed7FB7d441DbD7e12E";

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // State for the generated image
  const [uploadedImage, setUploadedImage] = useState(null); // State for the uploaded image file
  const [isUploaded, setIsUploaded] = useState(false); // State to track if an image is uploaded
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
    const url = await aiImage(imageData);

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
    const URL = `https://api-inference.huggingface.co/models/stablediffusionapi/dreamshaper-v7`;

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

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  
    if (file) {
      setIsUploaded(true);
      setIsImageReady(false); // Reset image readiness
  
      // Upload the image to NFT.Storage
      const imageUrl = await uploadImage(file);

      // Update the image readiness state
      setIsImageReady(true);
  
      // Update the URL
      setURL(imageUrl);
    }
  };
  
  const handleUpload = async () => {
    // Trigger the hidden file input
    document.getElementById('fileInput').click();
  };
  
  useEffect(() => {
    // Listen for changes in the file input
    document.getElementById('fileInput').addEventListener('change', handleFileInputChange);
  
    // Cleanup the event listener when the component unmounts
    return () => {
      document.getElementById('fileInput').removeEventListener('change', handleFileInputChange);
    };
  }, []);

  const handleRemove = () => {
    setUploadedImage(null);
    setIsUploaded(false);
    setIsImageReady(false);
  };

  const uploadImage = async (imageData) => {
    setMessage("Uploading Image...");

    // Create an instance of NFT.Storage
    const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_API_KEY });


    // Send a request to store the image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
    });

    // Return the URL
    return `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
  };

  const aiImage = async (imageData) => {
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
    <img src={mainImage} className="main-image" alt="mainImage" />
    <h1>
    Create and Trade AI-Driven NFTs
    </h1>
    <p>
      Unleash your creativity with AI-powered image generation and mint your creations into NFTs for the blockchain art market.
    </p>
    <br/>
    <h3>
      How to Use:
    </h3>
    <PhoneCard />
    <div className="main-inputs">
      <p className='inputs'>Enter Name:</p>
      <input
        type="text"
        placeholder="ex. My First NFT"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className='inputs'>Enter Description:</p>
      <input
        type="text"
        placeholder="ex. Cat swimming in the ocean"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="buttons-container">
      {/* Add file input for image upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        id="fileInput" // Add an id to the file input
        style={{ display: 'none' }} // Hide the file input
      />

      {/* Add a button to upload an image */}
      <button
        className="btn upload-btn"
        onClick={handleUpload}
      >
        {isUploaded ? 'Uploaded' : 'Upload Image'}
      </button>

      {/* Add a button to remove the uploaded image */}
      {isUploaded && (
        <button
          className="btn remove-btn"
          onClick={handleRemove}
        >
          Remove
        </button>
      )}
      
        <button className="btn generate-btn" onClick={submitHandler}>
          Generate
        </button>
      </div>
    </div>

    <div className="image-container">
      <div className="image">
        {!isWaiting && (isUploaded ? uploadedImage : image) ? (
          <img src={isUploaded ? URL.createObjectURL(uploadedImage) : image} alt="Generated image" />
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
    <button
      className="btn mint-btn"
      onClick={() => {
        if (name === "" || description === "") {
          window.alert("Please provide a name and description");
          return;
        }
        handleMint();
      }}
    >
      Mint
    </button>
  )}
    </div>
  </div>
  );
}

export default App;
