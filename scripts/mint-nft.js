require('dotenv').config();

//follow the below tutorial
//https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-a-nft

const API_URL=process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress=process.env.CONTRACT_ADDRESS;

const {createAlchemyWeb3} =require("@alch/alchemy-web3");
const web3=createAlchemyWeb3(API_URL);

const contract_json=require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
//console.log(JSON.stringify(contract_json.abi));

const nftContract=new web3.eth.Contract(contract_json.abi,contractAddress);

async function mintNFT(tokenURI){


const nonce=await web3.eth.getTransactionCount(PUBLIC_KEY,'latest');

// Mint nftContract.methods.mintNFT
 const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 2999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signedTX=await web3.eth.accounts.signTransaction(tx,PRIVATE_KEY);
  const transactionReceipt=await web3.eth.sendSignedTransaction(signedTX.rawTransaction);

  console.log("Transaction reciept :"+JSON.stringify(transactionReceipt));

}

// Call MintNFT  grab metadata url
https://testnets.opensea.io/assets/rinkeby/0x249e3e48a83d3adbb3f6f477ecf378802637a3e9/1
//https://rinkeby.etherscan.io/tx/0x94366356cb32d915811307cfdb5cd1c057cf486394bd3fdb9c49a79bab362ba5
//mintNFT("https://gateway.pinata.cloud/ipfs/QmNPu9h7bxWXiHzFiZ9ZCLm1NUkAGw23udRTruKnJ9eHAb") // voice

//https://testnets.opensea.io/assets/rinkeby/0x249e3e48a83d3adbb3f6f477ecf378802637a3e9/2
mintNFT("https://gateway.pinata.cloud/ipfs/Qmb1vnhwfVzXMDBaE7UfqemUPcjVRdP7LFVHsVSuRkYpfh")  // NFT Pot