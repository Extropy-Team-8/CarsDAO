// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { ICarsDescriptor } from "./ICarsDescriptor.sol";

interface ICarsSeeder {
  /**
    IMAGE LAYERING
    1. SKY / BG
    2. FLOOR
    3. BODY
    4. BOTTOM
    5. WHEELS
    6. HEADLIGHT
    7. WINDOWS
    8. WEATHER
    9. TOP / MISC
  */

  struct Seed {
    uint48 background;
    uint48 floor;
    uint48 body;
    uint48 bottom;
    uint48 wheel;
    uint48 headlight;
    uint48 window;
    uint48 weather;
    uint48 misc;
  }

  function generateSeed(uint256 _carId, ICarsDescriptor _descriptor) external view returns (Seed memory);
}