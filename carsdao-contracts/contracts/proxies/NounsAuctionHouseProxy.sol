// SPDX-License-Identifier: GPL-3.0

/// @title The Nouns DAO auction house proxy

/*
       -           __
     --          ~( @\   \
    ---   _________]_[__/_>________
         /  ____ \ <>     |  ____  \
        =\_/ __ \_\_______|_/ __ \__D
    ________(__)_____________(__)____
 */

pragma solidity ^0.8.6;

import { TransparentUpgradeableProxy } from '@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol';

contract NounsAuctionHouseProxy is TransparentUpgradeableProxy {
    constructor(
        address logic,
        address admin,
        bytes memory data
    ) TransparentUpgradeableProxy(logic, admin, data) {}
}
