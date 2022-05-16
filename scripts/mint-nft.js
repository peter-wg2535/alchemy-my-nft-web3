require('dotenv').config();

//https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-a-nft

const API_URL=process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const {createAlchemyWeb3} =require("@alch/alchemy-web3");
const web3=createAlchemyWeb3(API_URL);

const contract_json=require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
//console.log(JSON.stringify(contract_json.abi));
const contractAddress="0x5E5A24a2EC1Ac435CEB8aa04fC937B48bc04A4E0";
const nftContract=new web3.eth.Contract(contract_json.abi,contractAddress);

async function mintNFT(tokenURI){


const nonce=await web3.eth.getTransactionCount(PUBLIC_KEY,'latest');

//get latest nonce

 //the transaction
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

mintNFT("https://gateway.pinata.cloud/ipfs/QmNPu9h7bxWXiHzFiZ9ZCLm1NUkAGw23udRTruKnJ9eHAb")