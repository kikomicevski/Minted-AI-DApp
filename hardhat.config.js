require("@nomicfoundation/hardhat-toolbox");


require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY


module.exports = {
    solidity: "0.8.4",
    networks: {
        hyperspace: {
        // url: "https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
        url: "https://rpc.ankr.com/filecoin_testnet",
        accounts: [PRIVATE_KEY],
      },
    },
  };

// module.exports = {
//     solidity: "0.8.17",
//     defaultNetwork: "hyperspace",
//     networks: {
//         hyperspace: {
//             chainId: 3141,
//             // url: "https://api.hyperspace.node.glif.io/rpc/v1",
//             url:"https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
//             accounts: [PRIVATE_KEY],
//          },
//         // wallaby: {
//         //     chainId: 31415,
//         //      url: "https://wallaby.node.glif.io/rpc/v1",
//         //     //url:"https://filecoin-hyperspace.chainstacklabs.com/rpc/v1",
//         //     accounts: [PRIVATE_KEY],
//         // },
//     },

//   // mocha: {
//   //   timeout: 40000
//   // },
//   //   settings: {
//   //       optimizer: {
//   //         enabled: true,
//   //         runs: 5000,
//   //         details: {
//   //            yul: false
//   //            },
//   //       },
//   //       viaIR : true,
//   //     },
      
//     paths: {
//         sources: "./contracts",
//         tests: "./test",
//         cache: "./cache",
//         artifacts: "./artifacts",
//     },
// }
