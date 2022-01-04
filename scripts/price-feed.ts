import hre from "hardhat";
import { price_feed } from "../contracts-config";

async function main() {
    const priceFeedConsumerFactory = await hre.ethers.getContractFactory("PriceConsumerV3");
    const priceFeedConsumer = await priceFeedConsumerFactory.deploy(price_feed.DAI_ETH);
    await priceFeedConsumer.deployed();

    const [lastestPrice, description, decimals] = await priceFeedConsumer.getLatestPrice();

    console.log(description + " is : " + (lastestPrice.toNumber() / 10 ** decimals).toString());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
