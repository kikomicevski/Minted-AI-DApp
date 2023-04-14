var ethers = require('ethers');  
var url = 'https://filecoin-hyperspace.chainstacklabs.com/rpc/v1';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
});