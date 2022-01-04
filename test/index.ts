import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { assert } from 'chai';
import hre from "hardhat";
import { MaxouCoin, MaxouCoin__factory } from '../typechain';

describe("MaxouCoin", function () {

  let maxouCoinFactory: MaxouCoin__factory;
  let maxouCoinContract: MaxouCoin;
  let ownerAddress: SignerWithAddress;
  let address1: SignerWithAddress;
  let address2: SignerWithAddress;

  beforeEach(async function () {

    // Deployment
    maxouCoinFactory = await hre.ethers.getContractFactory("MaxouCoin");
    maxouCoinContract = await maxouCoinFactory.deploy(1000000);

    await maxouCoinContract.deployed();
    // Get testing user
    [ownerAddress, address1, address2] = await hre.ethers.getSigners();
  });


  it("Should mint 1 000 000 token on the owner address on deploy", async function () {
    const ownerBalance = (await maxouCoinContract.balanceOf(ownerAddress.address)).toNumber();
    assert(ownerBalance === 1000000, `Owner of the contract should have 1000000 token, it has ${ownerBalance} instead`);
  });

  it("Should give 1 000 tokens to the address1", async function () {
    await maxouCoinContract.transfer(address1.address, 1000);
    const ownerBalance = (await maxouCoinContract.balanceOf(ownerAddress.address)).toNumber();
    const address1Balance = (await maxouCoinContract.balanceOf(address1.address)).toNumber();
    assert(ownerBalance === 999000, `Owner of the contract should have 999000 token, it has ${ownerBalance} instead`);
    assert(address1Balance === 1000, `Address1 should have 1000 tokens, it has ${address1Balance} instead`);
  });

  it("Should transfer to an address1 then address1 should send to address2", async function () {

    await maxouCoinContract.transfer(address1.address, 1000);
    await maxouCoinContract.connect(address1).transfer(address2.address, 500);

    const ownerBalance = (await maxouCoinContract.balanceOf(ownerAddress.address)).toNumber();
    const address1Balance = (await maxouCoinContract.balanceOf(address1.address)).toNumber();
    const address2Balance = (await maxouCoinContract.balanceOf(address2.address)).toNumber();

    assert(ownerBalance === 999000, `Owner of the contract should have 999000 token, it has ${ownerBalance} instead`);
    assert(address1Balance === 500, `Address1 should have 500 tokens, it has ${address1Balance} instead`);
    assert(address2Balance === 500, `Address2 should have 500 tokens, it has ${address2Balance} instead`);

  });
  
  it("Should user transerFrom", async function () {

    await maxouCoinContract.transfer(address1.address, 1000);
    await maxouCoinContract.connect(address1).transfer(address2.address, 500);

    const ownerBalance = (await maxouCoinContract.balanceOf(ownerAddress.address)).toNumber();
    const address1Balance = (await maxouCoinContract.balanceOf(address1.address)).toNumber();
    const address2Balance = (await maxouCoinContract.balanceOf(address2.address)).toNumber();

    assert(ownerBalance === 999000, `Owner of the contract should have 999000 token, it has ${ownerBalance} instead`);
    assert(address1Balance === 500, `Address1 should have 500 tokens, it has ${address1Balance} instead`);
    assert(address2Balance === 500, `Address2 should have 500 tokens, it has ${address2Balance} instead`);

  });


});
