// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { ICarsSeeder } from "./ICarsSeeder.sol";

interface ICarsDescriptor {
  // admin command events
  event PartsLocked();
  event DataURIToggled(bool enabled);
  event BaseURIUpdated(string baseURI);

  // project variable checks
  function arePartsLocked() external returns (bool);
  function isDataURIEnabled() external returns (bool);
  function baseURI() external returns (string memory);

  // not sure about palettes
  function palettes(uint8 _paletteIndex, uint256 _colorIndex) external view returns (string memory);

  // 1. SKY / BG
  // 2. FLOOR
  // 3. BODY
  // 4. BOTTOM
  // 5. WHEELS
  // 6. HEADLIGHT
  // 7. WINDOWS
  // 8. WEATHER
  // 9. TOP / MISC
  //Hi there, I'm a comment.

  // return asset with given index
  function backgrounds(uint256 _index) external view returns (string memory);
  function floors(uint256 _index) external view returns (bytes memory);
  function bodies(uint256 _index) external view returns (bytes memory);
  function bottoms(uint256 _index) external view returns (bytes memory);
  function wheels(uint256 _index) external view returns (bytes memory);
  function headlights(uint256 _index) external view returns (bytes memory);
  function windows(uint256 _index) external view returns (bytes memory);
  function weathers(uint256 _index) external view returns (bytes memory);
  function miscs(uint256 _index) external view returns (bytes memory);

  // return component counts
  function backgroundCount() external view returns (uint256);
  function floorCount() external view returns (uint256);
  function bodyCount() external view returns (uint256);
  function bottomCount() external view returns (uint256);
  function wheelCount() external view returns (uint256);
  function headlightCount() external view returns (uint256);
  function windowCount() external view returns (uint256);
  function weatherCount() external view returns (uint256);
  function miscCount() external view returns (uint256);

  // add component to component arrays
  function addBackground(string calldata _background) external;
  function addFloor(bytes calldata _floor) external;
  function addBody(bytes calldata _body) external;
  function addBottom(bytes calldata _bottom) external;
  function addWheel(bytes calldata _wheel) external;
  function addHeadlight(bytes calldata _headlight) external;
  function addWindow(bytes calldata _window) external;
  function addWeather(bytes calldata _weather) external;
  function addMisc(bytes calldata _misc) external;

  // multi-add components to component arrays
  function multiAddBackground(string[] calldata _backgrounds) external;
  function multiAddFloor(bytes[] calldata _floors) external;
  function multiAddBody(bytes[] calldata _bodies) external;
  function multiAddBottom(bytes[] calldata _bottoms) external;
  function multiAddWheel(bytes[] calldata _wheels) external;
  function multiAddHeadlight(bytes[] calldata _headlights) external;
  function multiAddWindow(bytes[] calldata _windows) external;
  function multiAddWeather(bytes[] calldata _weathers) external;
  function multiAddMisc(bytes[] calldata _miscs) external;

  // admin commands
  function lockParts() external;
  function toggleDataURIEnabled() external;
  function setBaseURI(string calldata _baseURI) external;

  // URIs
  function tokenURI(uint256 _tokenId, ICarsSeeder.Seed memory _seed) external view returns (string memory);
  function dataURI(uint256 _tokenId, ICarsSeeder.Seed memory _seed) external view returns (string memory);
  function genericDataURI(
    string calldata _name,
    string calldata _description,
    ICarsSeeder.Seed memory _seed
  ) external view returns (string memory);

  // seed -> SVG image
  function generateSVGImage(ICarsSeeder.Seed memory _seed) external view returns (string memory);

}


