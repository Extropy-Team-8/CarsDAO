// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { ICarsSeeder } from './interfaces/ICarsSeeder.sol';
import { ICarsDescriptor } from './interfaces/ICarsDescriptor.sol';

contract CarsSeeder is ICarsSeeder {

  function generateSeed(uint256 _carId, ICarsDescriptor _descriptor) external view override returns (Seed memory) {
    uint256 pseudorandomness = uint256(
      keccak256(abi.encodePacked(blockhash(block.number - 1), _carId))
    );

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

    uint256 backgroundCount = descriptor.backgroundCount();
    uint256 floorCount = descriptor.floorCount();
    uint256 bodyCount = descriptor.bodyCount();
    uint256 bottomCount = descriptor.bottomCount();
    uint256 wheelCount = descriptor.wheelsCount();
    uint256 headlightCount = descriptor.headlightCount();
    uint256 windowCount = descriptor.windowCount();
    uint256 weatherCount = descriptor.weatherCount();
    uint256 miscCount = descriptor.miscCount();

    return Seed({
      background: uint48(
        uint48(pseudorandomness >> 48) % backgroundCount
      ),
      floor: uint48(
        uint48(pseudorandomness >> 48 * 2) % floorCount 
      ),
      body: uint48(
        uint48(pseudorandomness >> 48 * 3) % bodyCount
      ),
      bottom: uint48(
        uint48(pseudorandomness >> 48 * 4) % bottomCount
      ),
      wheel: uint48(
        uint48(pseudorandomness >> 48 * 5) % wheelCount
      ),
      headlight: uint48(
        uint48(pseudorandomness >> 48 * 6) % headlightCount
      ),
      window: uint48(
        uint48(pseudorandomness >> 48 * 7) % windowCount
      ),
      weather: uint48(
        uint48(pseudorandomness >> 48 * 8) % weatherCount
      ),
      misc: uint48(
        uint48(pseudorandomness >> 48 * 9) % miscCount
      )
    });
  }
}