// SPDX-License-Identifier: GPL-3.0

/// @title The Nouns DAO auction house proxy admin

/*
       -           __
     --          ~( @\   \
    ---   _________]_[__/_>________
         /  ____ \ <>     |  ____  \
        =\_/ __ \_\_______|_/ __ \__D
    ________(__)_____________(__)____
 */

pragma solidity ^0.8.6;

import { ProxyAdmin } from '@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol';

// prettier-ignore
contract NounsAuctionHouseProxyAdmin is ProxyAdmin {}
