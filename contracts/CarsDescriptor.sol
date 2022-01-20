// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { ICarsDescriptor } from "./interfaces/ICarsDescriptor.sol";
import { ICarsSeeder } from "./interfaces/ICarsSeeder.sol";
import { NFTDescriptor } from "./libs/NFTDescriptor.sol";
import { MultiPartRLEToSVG } from "./libs/MultiPartRLEToSVG.sol";

contract CarsDescriptor is ICarsDescriptor, Ownable {
  using Strings for uint256;

  /** ADMIN COMMANDS */
  bool public override arePartsLocked;
  bool public override isDataURIEnabled = true;
  string public override baseURI;

  mapping(uint8 => string[]) public override palettes;

  /** ASSET ARRAYS */
  string[] public override backgrounds;
  bytes[] public override floors;
  bytes[] public override bodies;
  bytes[] public override bottoms;
  bytes[] public override wheels;
  bytes[] public override headlights;
  bytes[] public override windows;
  bytes[] public override weathers;
  bytes[] public override miscs;

  modifier whenPartsNotLocked() {
    require(!arePartsLocked, "Parts are locked");
    _;
  }

  /** ASSET COUNTS */
  function backgroundCount() external view override returns (uint256) {
    return backgrounds.length;
  }

  function floorCount() external view override returns (uint256) {
    return floors.length;
  }

  function bodyCount() external view override returns (uint256) {
    return bodies.length;
  }

  function bottomCount() external view override returns (uint256) {
    return bottoms.length;
  }

  function wheelCount() external view override returns (uint256) {
    return wheels.length;
  }

  function headlightCount() external view override returns (uint256) {
    return headlights.length;
  }

  function windowCount() external view override returns (uint256) {
    return windows.length;
  }

  function weatherCount() external view override returns (uint256) {
    return weathers.length;
  }

  function miscCount() external view override returns (uint256) {
    return miscs.length;
  }


  /** (SINGLE) ADD ASSETS */
  function addBackground(string calldata _background) external override onlyOwner whenPartsNotLocked {
    _addBackground(_background);
  }

  function addFloor(bytes calldata _floor) external override onlyOwner whenPartsNotLocked {
    _addFloor(_floor);
  }

  function addBody(bytes calldata _body) external override onlyOwner whenPartsNotLocked {
    _addBody(_body);
  }

  function addBottom(bytes calldata _bottom) external override onlyOwner whenPartsNotLocked {
    _addBottom(_bottom);
  }

  function addWheel(bytes calldata _wheel) external override onlyOwner whenPartsNotLocked {
    _addWheel(_wheel);
  }

  function addHeadlight(bytes calldata _headlight) external override onlyOwner whenPartsNotLocked {
    _addHeadlight(_headlight);
  }

  function addWindow(bytes calldata _window) external override onlyOwner whenPartsNotLocked {
    _addWindow(_window);
  }

  function addWeather(bytes calldata _weather) external override onlyOwner whenPartsNotLocked {
    _addWeather(_weather);
  }

  function addMisc(bytes calldata _misc) external override onlyOwner whenPartsNotLocked {
    _addMisc(_misc);
  }


  /** (MULTI) ADD ASSETS */
  function multiAddBackground(string[] calldata _backgrounds) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _backgrounds.length; i++) {
      _addBackground(_backgrounds[i]);
    }
  }

  function multiAddFloor(bytes[] calldata _floors) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _floors.length; i++) {
      _addFloor(_floors[i]);
    }
  }

  function multiAddBody(bytes[] calldata _bodies) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _bodies.length; i++) {
      _addBody(_bodies[i]);
    }
  }

  function multiAddBottom(bytes[] calldata _bottoms) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _bottoms.length; i++) {
      _addBottom(_bottoms[i]);
    }
  }

  function multiAddWheel(bytes[] calldata _wheels) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _wheels.length; i++) {
      _addWheel(_wheels[i]);
    }
  }

  function multiAddHeadlight(bytes[] calldata _headlights) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < __headlights.length; i++) {
      _addHeadlight(_headlights[i]);
    }
  }

  function multiAddWindow(bytes[] calldata _windows) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _windows.length; i++) {
      _addWindow(_windows[i]);
    }
  }

  function multiAddWeather(bytes[] calldata _weathers) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _weathers.length; i++) {
      _addWeather(_weathers[i]);
    }
  }

  function multiAddMisc(bytes[] calldata _miscs) external override onlyOwner whenPartsNotLocked {
    for (uint256 i=0; i < _miscs.length; i++) {
      _addMisc(_miscs);
    }
  }


  /** ADMIN COMMANDS */
  function lockParts() external override onlyOwner whenPartsNotLocked {
    arePartsLocked = true;
    emit PartsLocked();
  }

  function toggleDataURIEnabled() external override onlyOwner {
    bool enabled = !isDataURIEnabled;
    isDataURIEnabled = enabled;
    emit DataURIToggled(enabled);
  }

  function setBaseURI(string calldata _baseURI) external override onlyOwner {
    baseURI = _baseURI;
    emit BaseURIUpdated(_baseURI);
  }


  /** URI stuff */
  function tokenURI(uint256 _tokenId, ICarsSeeder.Seed memory _seed) external view override returns (string memory) {
    if (isDataURIEnabled) {
      return dataURI(_tokenId, _seed);
    }
    return string(abi.encodePacked(baseURI, _tokenId.toString()));
  }

  function dataURI(uint256 _tokenId, ICarsSeeder.Seed memory _seed) public view override returns (string memory) {
    string memory carId = _tokenId.toString();
    string memory name = string(abi.encodePacked("Car ", _carId));
    string memory description = string(abi.encodePacked("Noun ", carId, " is a member of the CarsDAO."));

    return genericDataURI(name, description, _seed);
  }

  function genericDataURI(
    string memory _name,
    string memory _description,
    ICarsSeeder.Seed memory _seed
  ) public view override returns (string memory) {
    NFTDescriptor.TokenURIParams memory params = NFTDescriptor.TokenURIParams({
      name: _name,
      description: _description,
      parts: _getPartsForSeed(_seed),
      background: backgrounds[_seed.background]
    });
    return NFTDescriptor.constructTokenURI(params, palettes);
  }

  function generateSVGImage(ICarsSeeder.Seed memory _seed) external view override returns (string memory) {
    MultiPartRLEToSVG.SVGParams memory params = MultiPartRLEToSVG.SVGParams({
      parts: _getPartsForSeed(_seed),
      background: backgrounds[_seed.background]
    });
    return NFTDescriptor.generateSVGImage(params, palettes);
  }


  /** INTERNAL FUNCTIONS */
  function _addBackground(string calldata _background) internal { 
    backgrounds.push(_background); 
  }

  function _addFloor(bytes calldata _floor) internal {
    floors.push(_floor);
  }

  function _addBody(bytes calldata _body) internal {
    bodies.push(_body);
  }

  function _addBottom(bytes calldata _bottom) internal {
    bottoms.push(_bottom);
  }

  function _addWheel(bytes calldata _wheel) internal {
    wheels.push(_wheel);
  }

  function _addHeadlight(bytes calldata _headlight) internal {
    headlights.push(_headlight);
  }

  function _addWindow(bytes calldata _window) internal {
    windows.push(_window);
  }

  function _addWeather(bytes calldata _weather) internal {
    weathers.push(_weather);
  }

  function _addMisc(bytes calldata _misc) internal {
    miscs.push(_misc);
  }

  function _getPartsForSeed(ICarsSeeder.Seed memory _seed) internal view returns (bytes[] memory) {
    bytes[] memory _parts = new bytes[](8);
    _parts[0] = floors[_seed.floor];
    _parts[1] = bodies[_seed.body];
    _parts[2] = bottoms[_seed.bottom];
    _parts[3] = wheels[_seed.wheel];
    _parts[4] = headlights[_seed.headlight];
    _parts[5] = windows[_seed.window];
    _parts[6] = weathers[_seed.weather];
    _parts[7] = miscs[_seed.misc];
    return _parts;
  }

}

