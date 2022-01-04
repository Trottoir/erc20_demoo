// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./mocks/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    constructor(address feed) {
        priceFeed = AggregatorV3Interface(feed);
    }

    function getLatestPrice()
        public
        view
        returns (
            int256,
            string memory,
            uint8
        )
    {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return (price, priceFeed.description(), priceFeed.decimals());
    }
}
