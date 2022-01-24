// SPDX-License-Identifier: GPL-3.0

/// @title Interface for CarsToken

/*
       -           __
     --          ~( @\   \
    ---   _________]_[__/_>________
         /  ____ \ <>     |  ____  \
        =\_/ __ \_\_______|_/ __ \__D
    ________(__)_____________(__)____
 */

pragma solidity ^0.8.0;

interface ICarsToken {

  // struct to store each token's traits
  struct Car {
    uint8 background;
    uint8 floor;
    uint8 body;
    uint8 bottom;
    uint8 wheel;
    uint8 headlight;
    uint8 window;
    uint8 weather;
    uint8 misc;
  }

  function getTokenTraits(uint256 tokenId) external view returns (Car memory);
}