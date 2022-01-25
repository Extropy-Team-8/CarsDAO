const { ethers } = require("hardhat");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

SHOW_BALANCE = true;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  if (SHOW_BALANCE) {
    const b = await deployer.getBalance();
    const c = await ethers.utils.formatUnits(b, 18);
    console.log("Deployer balance before is: ", c);
  }

  let traitsContract;
  let carContract;

  const Traits = await ethers.getContractFactory("CarsTraits");
  traitsContract = await Traits.deploy();
  await traitsContract.deployed();
  console.log("traitsContract deployed to ", await traitsContract.address);

  const Car = await ethers.getContractFactory("CarsToken");
  carContract = await Car.deploy(traitsContract.address, 1000);
  await carContract.deployed();
  console.log("carContract deployed to ", await carContract.address);

  await traitsContract.setCarContract(carContract.address);

  // console.log(traitsContract);
  // console.log(carContract);

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
