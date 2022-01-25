// const { ethers } = require("hardhat");
// const fs = require("fs");
// const glob = require("glob");
// const path = require("path");

// SHOW_BALANCE = true;
// DEPLOYED = false;

// const TRAIT_CONTRACT_ADDRESS = "0x18294E1d3B66dF7BED08229E3FEcC69A03b38561";
// const CAR_CONTRACT_ADDRESS = "0x6f0465B5d942cF5C326936E5E7a2FA9c8019cbeC";

// const delay = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve(), ms);
//   });

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);

//   if (SHOW_BALANCE) {
//     const b = await deployer.getBalance();
//     const c = await ethers.utils.formatUnits(b, 18);
//     console.log("Deployer balance before is: ", c);
//   }

//   let traitsContract;
//   let carContract;

//   if (DEPLOYED) {
//     traitsContract = await ethers.getContractAt(
//       "CarsTraits",
//       TRAIT_CONTRACT_ADDRESS
//     );
//     console.log("traitsContract deployed at: ", traitsContract.address);
//   } else {
//     const Traits = await ethers.getContractFactory("CarsTraits");
//     traitsContract = await Traits.deploy();
//     await traitsContract.deployed();
//     console.log("traitsContract deployed to ", await traitsContract.address);

//     const traitTypes = [
//       "background",
//       "ground",
//       "body",
//       "bottom",
//       "wheel",
//       "headlight",
//       "window",
//       "weather",
//       "misc",
//     ];

//     for (let index in traitTypes) {
//       const fileNames = glob.sync(
//         `../carsdao-assets/${traitTypes[index]}/*.png`
//       );

//       let traitIds = [];
//       let traits = [];

//       for (let fileName of fileNames) {
//         const svg = fs.readFileSync(fileName, { encoding: "base64" });
//         const tr = {
//           name: traitTypes[index],
//           png: svg,
//         };
//         const baseName = path.basename(fileName);
//         const baseNameIndex = baseName.split("_")[1].slice(-1);

//         traitIds.push(baseNameIndex);
//         traits.push(tr);
//       }

//       await traitsContract.uploadTraits(index, traitIds, traits);
//       console.log("Uploaded asset => ", index, " ", traitTypes[index]);

//       await delay(15000);
//     }
//   }

//   if (DEPLOYED) {
//     carContract = await ethers.getContractAt("Car", CAR_CONTRACT_ADDRESS);
//     console.log("carContract deployed at: ", await carContract.address);
//   } else {
//     const Car = await ethers.getContractFactory("Car");
//     carContract = await Car.deploy(traitsContract.address, 1000);
//     await carContract.deployed();
//     console.log("carContract deployed to ", await carContract.address);
//   }

//   await traitsContract.setCarContract(carContract.address);

//   // console.log(traitsContract);
//   // console.log(carContract);

//   let tx_mint = await carContract.mint(1);
//   console.log("Minting...");
//   console.log("Mint tx: ", tx_mint["hash"]);
//   await tx_mint.wait(5);

//   // console.log("Traits contract => \n", traitsContract);
//   // console.log("Car contract => \n", carContract.address);

//   console.log("Minted so far => ", await carContract.minted());
//   // console.log(await carContract.getTokenTraits(1));
//   console.log(await carContract.tokenURI(5));

//   // console.log(await traitsContract.drawSVG(1));

//   if (SHOW_BALANCE) {
//     const b = await deployer.getBalance();
//     const c = await ethers.utils.formatUnits(b, 18);
//     console.log("Deployer balance after is: ", c);
//   }
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
