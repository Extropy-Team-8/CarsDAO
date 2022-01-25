const { ethers } = require("hardhat");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

SHOW_BALANCE = true;
DEPLOYED = true;

const TRAIT_CONTRACT_ADDRESS = "0x18294E1d3B66dF7BED08229E3FEcC69A03b38561";
const CAR_CONTRACT_ADDRESS = "0x6f0465B5d942cF5C326936E5E7a2FA9c8019cbeC";

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Uploading assets with the account:", deployer.address);

  if (SHOW_BALANCE) {
    const b = await deployer.getBalance();
    const c = await ethers.utils.formatUnits(b, 18);
    console.log("Deployer balance before is: ", c);
  }

  let traitsContract;
  let carContract;

  traitsContract = await ethers.getContractAt(
    "CarsTraits",
    TRAIT_CONTRACT_ADDRESS
  );

  const traitTypes = [
    "background",
    "ground",
    "body",
    "bottom",
    "wheel",
    "headlight",
    "window",
    "weather",
    "misc",
  ];

  for (let index in traitTypes) {
    const fileNames = glob.sync(`../carsdao-assets/${traitTypes[index]}/*.png`);

    let traitIds = [];
    let traits = [];

    for (let fileName of fileNames) {
      const svg = fs.readFileSync(fileName, { encoding: "base64" });
      const tr = {
        name: traitTypes[index],
        png: svg,
      };
      const baseName = path.basename(fileName);
      const baseNameIndex = baseName.split("_")[1].slice(-1);

      traitIds.push(baseNameIndex);
      traits.push(tr);
    }

    await traitsContract.uploadTraits(index, traitIds, traits);
    console.log("Uploaded asset => ", index, " ", traitTypes[index]);

    await delay(15000);
  }

  if (SHOW_BALANCE) {
    const b = await deployer.getBalance();
    const c = await ethers.utils.formatUnits(b, 18);
    console.log("Deployer balance after is: ", c);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
