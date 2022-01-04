// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./mocks/ERC20Mocks.sol";

contract MaxouCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("MaxouCoin", "MXC") {
        _mint(msg.sender, initialSupply);
    }
}
