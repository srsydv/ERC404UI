const Web3 = require("web3");


const ERC404Factory = "0x4CC89339991B65bf998B33371cc87C14a7C5Fc11";
// 

// const ERC404Factory = "0xE8791CA675C9543eFa6315B889F88F607974B348";

// 0x9E699a2e7f6745f95229d74CE03a3b9ddfDf353b

// 0xd979712531Ac7eDcd588b44d8e51097108aD432B
// 0x299D0e57e3116C6c437C5041e485C7f79E88D168

const ERC404ABI = require('./ABIs/ERC404.json');
const PandoraABI = require('./ABIs/Pandora.json');
const ERC404FactoryABI = require('./ABIs/ERC404Factory.json');


init = async() => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("Connected");
      } else {
        alert("Metamask not found");
      }

      ERC404FactoryMethods = new web3.eth.Contract(
        ERC404FactoryABI.abi,
        ERC404Factory
      )

    //   gameRegistryMethods = new web3.eth.Contract(
    //     gameRegistryABI.abi,
    //     gameRegistry
    //   )

    //   BidGameMethods = new web3.eth.Contract(
    //     BidGameABI.abi,
    //     BidGame
    //   )
      // console.log("dreamBidFeeMethods", dreamBidFeeMethods.methods)
      accounts = await web3.eth.getAccounts();
      console.log("Account", accounts[0]);
}



// getTotleCompetitors = async () => {
//     const receipt = await gameRegistryMethods.methods.getCompetitorsLimit()
//     .call();
//     document.getElementById('span3').innerHTML = receipt;
//     console.log(receipt);
//   }
//   const getCompetitors = document.getElementById("getCompetitors");
//   getCompetitors.onclick = getTotleCompetitors;
  
  deployERC404 = async () => {
    document.getElementById('span2').innerHTML = 'Processing🔜';
    let x = await ERC404FactoryMethods.methods.deployERC404(
      setCompetitor.value
    ).send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
      let data = JSON.stringify(reciept.events.deployedAddress.returnValues.ERC404Address);
      console.log("reciept",data);
      document.getElementById('span2').innerHTML = data;
    });
  }
  const setCompetitor = document.getElementById("setCompetitor");
  const setCompetitors = document.getElementById("setCompetitors");
  setCompetitors.onclick = deployERC404;



  Whitelist = async () => {
    document.getElementById('span4').innerHTML = 'Processing🔜';

    ERC404Methods = new web3.eth.Contract(
        ERC404ABI.abi,
        TokenAddress1.value
      )

    await ERC404Methods.methods.setWhitelist(gameId1.value,true)
    .send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
      document.getElementById('span4').innerHTML = 'Added✅';
    });
  console.log("Added!");
  }
  const gameId1 = document.getElementById("gameId1");
  // let bidderAddress1 = document.getElementById("bidderAddress1");
  const TokenAddress1 = document.getElementById("bidStartTime");
  const addBidder = document.getElementById("addBidder");
  addBidder.onclick = Whitelist



transferToken = async () => {
    document.getElementById('span1').innerHTML = 'GameId Processing🔜';
    ERC404Methods = new web3.eth.Contract(
        ERC404ABI.abi,
        TokenAddress.value
      )

      console.log("methods",ERC404Methods);
    await ERC404Methods.methods.transfer(
      currency.value,
      minPrice.value,
    ).send({ from: accounts[0] })
    .once("receipt", (reciept) => {
      console.log(reciept);
        // let data = JSON.stringify(reciept.events.gameListedForFixPrice.returnValues.gameId);
      document.getElementById('span1').innerHTML = "✅";
    });
  console.log("Regesterd!");
  }
  
  const currency = document.getElementById("currency");
  const minPrice = document.getElementById("minPrice");
  const TokenAddress = document.getElementById("bidStartTime");
//   const bidEndTime = document.getElementById("bidEndTime");
//   const addBidders = document.getElementById("addBidders");
//   const TotleCompetitors = document.getElementById("TotleCompetitors");
//   const competitor1 = document.getElementById("competitor1");
//   const competitor2 = document.getElementById("competitor2");
//   const competitor3 = document.getElementById("competitor3");
  const Register = document.getElementById("Register");
  Register.onclick = transferToken;



TransferAgain = async () => {
  document.getElementById('span5').innerHTML = 'Processing🔜';

  ERC404Methods = new web3.eth.Contract(
    ERC404ABI.abi,
    competitor2.value
  )

  await ERC404Methods.methods.safeTransferFrom(gameId2.value,bidderAddress2.value, bidderAddress1.value)
  .send({ from: accounts[0] })
  .once("receipt", (reciept) => {
    console.log(reciept);
    document.getElementById('span5').innerHTML = 'Removed✅';
  });
console.log("Removed!");
}
const gameId2 = document.getElementById("gameId2");
const bidderAddress2 = document.getElementById("bidderAddress2");
const bidderAddress1 = document.getElementById("bidderAddress1");
const competitor2 = document.getElementById("competitor2");
const removeBidder = document.getElementById("removeBidder");
removeBidder.onclick = TransferAgain

init();