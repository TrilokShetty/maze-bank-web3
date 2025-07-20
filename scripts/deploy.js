const hre = require("hardhat");

async function main() {
  const DBank = await hre.ethers.getContractFactory("DBank");
  const dbank = await DBank.deploy();

  await dbank.waitForDeployment(); 

  const address = await dbank.getAddress();
  console.log("DBank deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
