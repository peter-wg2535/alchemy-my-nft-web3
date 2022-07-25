const {ethers}=require("hardhat")

//https://docs.alchemy.com/alchemy/tutorials/how-to-create-an-nft/how-to-mint-an-nft-with-ethers

const nftJOHNNFT2525_JSON= require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const nftJOHNNFT2525_ABI=nftJOHNNFT2525_JSON.abi

const nft_contract_address=process.env.CONTRACT_ADDRESS
const acc_pk=process.env.PRIVATE_KEY

const provider=new ethers.providers.AlchemyProvider('rinkeby', process.env.API_KEY)
const acc=new ethers.Wallet(acc_pk,provider)

const nft_contract=new ethers.Contract(nft_contract_address, nftJOHNNFT2525_ABI,provider)

const tokenMetaUri = "https://gateway.pinata.cloud/ipfs/Qmcqc9AvB8EZoavQNVbCQFmYPFwM29xAvbPimXbNvubgee"


const mintNFT=async()=>{

    console.log(nft_contract_address)
    console.log(acc.address)
    //console.log(nftJOHNNFT2525_ABI)
    //https://docs.openzeppelin.com/contracts/3.x/api/token/erc721

    let nftTx=await nft_contract.connect(acc).mintNFT(acc.address,tokenMetaUri)
    await nftTx.wait()
    console.log(nftTx)

    const number_of_my_nft=await nft_contract.balanceOf(acc.address)
    console.log(number_of_my_nft)
}

//https://rinkeby.etherscan.io/tx/0x84cefb96b9bda54336635ea460f1a5e3c2060ce630ae910197c06c26afa6cbfd
//https://testnets.opensea.io/assets/rinkeby/0x249e3e48a83d3adbb3f6f477ecf378802637a3e9/3

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });