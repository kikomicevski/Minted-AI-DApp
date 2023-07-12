# Minted AI DApp

Welcome to the Minted AI DApp! This decentralized application allows you to create and trade AI-driven NFTs by leveraging AI-powered image generation.

## How It Works

The Minted AI DApp combines the power of artificial intelligence and blockchain technology to enable users to unleash their creativity and mint their creations as NFTs for the blockchain art market. Here's how the DApp works:

1. Visit the Minted AI DApp: [minted-ai-dapp.netlify.app](https://minted-ai-dapp.netlify.app).

2. On the homepage, you'll find a header section with a brief description of the DApp and input fields.

3. Input Field: Enter a prompt or description for the AI image generation process. This prompt will influence the generated image.

4. Generate Button: Click the "Generate" button to trigger the AI-powered image generation process. The DApp will communicate with the Stable Diffusion to generate the images.

6. Generated Image: Once the image is generated, it will be displayed in the DApp. You can view the generated image in the container under the Generate Button.

7. Minting NFTs: Below the Image container, you'll find  the "Mint" button. This will initiate the minting process and create a unique NFT on the blockchain.

8. Trade and Share NFTs: Once the NFT is minted, you can trade it on compatible marketplaces or share it with others as a unique digital asset.

9. Importing NFT to MetaMask:
   - Open your MetaMask wallet and ensure you are on the correct network (Sepolia Testnet).
   - Click on the "NFTs" tab and select "Import NFTs".
   - In the token import dialog, paste the contract address and the tokenID of your minted NFT in the appropriate fields.
   - MetaMask should automatically detect the NFT and display its details.

## Technologies Used

The Minted AI DApp is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- OpenAI API: Integration with the OpenAI API for AI image generation.
- NFT Storage: Storage service designed for off-chain NFT data (like metadata, images, and other assets).
- Solidity: The programming language for writing smart contracts on the Ethereum blockchain.
- Ethers.js: A JavaScript library for interacting with Ethereum and smart contracts.
- Hardhat: A development framework for Ethereum DApps.

## Development

To set up the development environment and run the Minted AI DApp locally, follow these steps:

1. Clone the GitHub repository:

   ```shell
   git clone https://github.com/kikomicevski/Minted-AI-DApp.git

2. Install the dependencies:

    ```shell
    npm install

3. Set up environment variables:

    Create a .env file in the project root directory.

    Add your own environment variables which should look like this:
    ```
    REACT_APP_HUGGING_FACE_API_KEY = "hf_rkUsIXtIVasd151w5ffklbkreFErmszBF"
    API_URL = "https://eth-sepolia.g.alchemy.com/v2/dcxTgaFqasd1w8dsf56WnfKOMy-hghhgVvo"
    PRIVATE_KEY = "a84ffbb7610822fasd15w51f89sdf3cv2f7d2ecbcf8fd344f0d06c27103346c46"
    REACT_APP_NFT_STORAGE_API_KEY = "eyJhbGciOiJadw54df88e6R5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIzMDQ5Qjc3MjUysdfsef45df456gdrdzEwZDAyQzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4OTAyNTYxNTE3MCwibmFtZSI6ImFwaUtleSJ9.ronk-xPC1Myk-zb2tvaoJkhLSZ3eUZuGtSRuXaHY61Y"

    //Make sure to replace them with the actual values.
4. Deploy the Smart Contract:

    ```shell
    npx hardhat run scripts/deploy.js --network sepolia

5. Start the development server:

    ```shell
    npm run start

The DApp will be accessible at http://localhost:3000.

## Credits

This project was developed by Hristijan Micevski.

LinkedIn:  [Hristijan Micevski](https://www.linkedin.com/in/hristijanmicevski)