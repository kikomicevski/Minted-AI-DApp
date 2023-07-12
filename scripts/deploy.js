const { ethers } = require("hardhat");
const fs = require("fs");


async function deployContract() {
  const Minted = await ethers.getContractFactory("Minted");
  const minted = await Minted.deploy();

  await minted.deployed();

  console.log("Contract deployed:", minted.address);

  // Save the contract address to a file
  fs.writeFileSync("contract-address.txt", minted.address);
}


deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
