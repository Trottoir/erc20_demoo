// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { BigNumber } from 'ethers';
import hre from "hardhat";
import { price_feed } from "../contracts-config";
import web3 from 'web3';
async function main() {
  // Get testing user
  const [ownerAddress, address1, address2] = await hre.ethers.getSigners();


  const maxouCoinFactory = await hre.ethers.getContractFactory("MaxouCoin");
  const maxouCoin = await maxouCoinFactory.deploy(1000000);
  await maxouCoin.deployed();

  const Dai = await hre.ethers.getContractFactory("Dai");
  const dai = Dai.attach(
    "0x6B175474E89094C44Da98b954EedeAC495271d0F" // The deployed contract address
  );

  const daiBalance = await dai.balanceOf(ownerAddress.address);
  const daiBalanceConverted = web3.utils.fromWei(daiBalance.toString(), "ether");
  console.log(`My DAI Balance is ${daiBalanceConverted}`);

  const WETH9 = await hre.ethers.getContractFactory("WETH9");
  const weth = WETH9.attach(
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" // The deployed contract address
  );

  const wethBalance = await weth.balanceOf(ownerAddress.address);

  const wethBalanceConverted = web3.utils.fromWei(wethBalance.toString(), "ether");
  console.log(`My wEth Balance is ${wethBalanceConverted.toString()}`);

  const SwapExamplesFactory = await hre.ethers.getContractFactory("SwapExamples");
  const swapExamplesContract = await SwapExamplesFactory.deploy("0xE592427A0AEce92De3Edee1F18E0157C05861564", 1000000);
  await swapExamplesContract.deployed();

  await dai.approve(swapExamplesContract.address, web3.utils.toWei("1000000000000", "Gwei"));
  await weth.approve(swapExamplesContract.address, web3.utils.toWei("1000000000000", "Gwei"));


  const ethOwned = await hre.ethers.provider.getBalance(ownerAddress.address);
  console.log(`My ETH Balance is ${ethOwned}`);


  await swapExamplesContract.swapExactInputSingle(web3.utils.toWei("10000000000", "Gwei"));

  const wethBalanceAfter = await weth.balanceOf(ownerAddress.address);
  const wethBalanceConvertedAfteerSwap = web3.utils.fromWei(wethBalanceAfter.toString(), "ether");
  console.log(`My wETH Balance after swap is ${wethBalanceConvertedAfteerSwap}`);

  const daiBalanceAfter = await dai.balanceOf(ownerAddress.address);
  const daiBalanceAfterSwap = web3.utils.fromWei(daiBalanceAfter.toString(), "ether");

  console.log(`My DAI Balance after swap is ${daiBalanceAfterSwap}`);


}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
