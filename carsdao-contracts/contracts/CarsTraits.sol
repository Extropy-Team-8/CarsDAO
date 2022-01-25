// SPDX-License-Identifier: MIT LICENSE

<<<<<<< HEAD
pragma solidity ^0.8.0;
=======
/*
       -           __
     --          ~( @\   \
    ---   _________]_[__/_>________
         /  ____ \ <>     |  ____  \
        =\_/ __ \_\_______|_/ __ \__D
    ________(__)_____________(__)____
 */


pragma solidity ^0.8.6;
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./interfaces/ICarsTraits.sol";
import "./interfaces/ICarsToken.sol";
import "base64-sol/base64.sol";

contract CarsTraits is Ownable, ICarsTraits {

  using Strings for uint256;
  
  struct Trait {
    string name;
    string png;
  }

  string[9] _traitTypes = [
    "background",
    "ground",
    "body",
    "bottom",
    "wheel",
    "headlight",
    "window",
    "weather",
    "misc"
  ];

  // storage of each traits name and base64 PNG data
  mapping(uint8 => mapping(uint8 => Trait)) public traitData;
  // maps trait type to count;
  // mapping(uint8 => uint8) public traitCounts;

  ICarsToken public carTokenContract;

  constructor() {}

  /** ADMIN */
  function setCarContract(address _carContractAddress) external onlyOwner {
    carTokenContract = ICarsToken(_carContractAddress);
  }

  /**
   * administrative to upload the names and images associated with each trait
   * @param traitType the trait type to upload the traits for (see traitTypes for a mapping)
   * @param traits the names and base64 encoded PNGs for each trait
   */
  function uploadTraits(uint8 traitType, uint8[] calldata traitIds, Trait[] calldata traits) external onlyOwner {
    require(traitIds.length == traits.length, "Mismatched inputs");
    // traitCounts[traitType] = traitIds.length;
    for (uint i = 0; i < traits.length; i++) {
      traitData[traitType][traitIds[i]] = Trait(
        traits[i].name,
        traits[i].png
      );
    }
  }

  /** RENDER */
  /**
   * generates an <image> element using base64 encoded PNGs
   * @param trait the trait storing the PNG data
   * @return the <image> element
   */
  function drawTrait(Trait memory trait) internal pure returns (string memory) {
    return string(abi.encodePacked(
      '<image x="4" y="4" width="32" height="32" image-rendering="pixelated" preserveAspectRatio="xMidYMid" xlink:href="data:image/png;base64,',
      trait.png,
      '"/>'
    ));
  }

  /**
   * generates an entire SVG by composing multiple <image> elements of PNGs
   * @param tokenId the ID of the token to generate an SVG for
   * @return a valid SVG of the Sheep / Wolf
   */
  function drawSVG(uint256 tokenId) public view returns (string memory) {
<<<<<<< HEAD
    ICar.Car memory c = carTokenContract.getTokenTraits(tokenId);
=======
    ICarsToken.Car memory c = carTokenContract.getTokenTraits(tokenId);
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2

    string memory svgString = string(abi.encodePacked(
      drawTrait(traitData[0][c.background]),
      drawTrait(traitData[1][c.floor]),
      drawTrait(traitData[2][c.body]),
      drawTrait(traitData[3][c.bottom]),
      drawTrait(traitData[4][c.wheel]),
      drawTrait(traitData[5][c.headlight]),
      drawTrait(traitData[6][c.window]),
      drawTrait(traitData[7][c.weather]),
      drawTrait(traitData[8][c.misc])
    ));

    return string(abi.encodePacked(
      '<svg id="woolf" width="100%" height="100%" version="1.1" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',
      svgString,
      "</svg>"
    ));
  }

  /**
   * generates an attribute for the attributes array in the ERC721 metadata standard
   * @param traitType the trait type to reference as the metadata key
   * @param value the token's trait associated with the key
   * @return a JSON dictionary for the single attribute
   */
  function attributeForTypeAndValue(string memory traitType, string memory value) internal pure returns (string memory) {
    return string(abi.encodePacked(
      '{"trait_type":"',
      traitType,
      '","value":"',
      value,
      '"}'
    ));
  }

  /**
   * generates an array composed of all the individual traits and values
   * @param tokenId the ID of the token to compose the metadata for
   * @return a JSON array of all of the attributes for given token ID
   */
  function compileAttributes(uint256 tokenId) public view returns (string memory) {
<<<<<<< HEAD
    ICar.Car memory c = carTokenContract.getTokenTraits(tokenId);
=======
    ICarsToken.Car memory c = carTokenContract.getTokenTraits(tokenId);
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2
    string memory traits;

    traits = string(abi.encodePacked(
      attributeForTypeAndValue(_traitTypes[0], traitData[0][c.background].name),',',
      attributeForTypeAndValue(_traitTypes[1], traitData[1][c.floor].name),',',
      attributeForTypeAndValue(_traitTypes[2], traitData[2][c.body].name),',',
      attributeForTypeAndValue(_traitTypes[3], traitData[3][c.bottom].name),',',
      attributeForTypeAndValue(_traitTypes[4], traitData[4][c.wheel].name),',',
      attributeForTypeAndValue(_traitTypes[5], traitData[5][c.headlight].name),',',
      attributeForTypeAndValue(_traitTypes[6], traitData[6][c.window].name),',',
      attributeForTypeAndValue(_traitTypes[7], traitData[7][c.weather].name),',',
      attributeForTypeAndValue(_traitTypes[8], traitData[8][c.misc].name),','
    ));
    
    return string(abi.encodePacked(
      '[',
      traits,
      '{"trait_type":"Type","value":',
      '"Car"',
      '}]'
    ));
  }

  /**
   * generates a base64 encoded metadata response without referencing off-chain content
   * @param tokenId the ID of the token to generate the metadata for
   * @return a base64 encoded JSON dictionary of the token's metadata and SVG
   */
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    string memory metadata = string(abi.encodePacked(
      '{"name": "',
      'Car #',
      tokenId.toString(),
      '", "description": "Random car NFTs created on the blockchain. No API, no IPFS.", "image": "data:image/svg+xml;base64,',
      Base64.encode((bytes(drawSVG(tokenId)))),
      '", "attributes":',
      compileAttributes(tokenId),
      "}"
    ));

    return string(abi.encodePacked(
      "data:application/json;base64,",
      Base64.encode((bytes(metadata)))
    ));
  }

  /** CAR TRAIT COUNTS */
  // function backgroundCount() external view override returns (uint256) {
  //   return traitCounts[0];
  // }

  // function floorCount() external view override returns (uint256) {
  //   return traitCounts[1];
  // }

  // function bodyCount() external view override returns (uint256) {
  //   return traitCounts[2];
  // }

  // function bottomCount() external view override returns (uint256) {
  //   return traitCounts[3];
  // }

  // function wheelCount() external view override returns (uint256) {
  //   return traitCounts[4];
  // }

  // function headlightCount() external view override returns (uint256) {
  //   return traitCounts[5];
  // }

  // function windowCount() external view override returns (uint256) {
  //   return traitCounts[6];
  // }

  // function weatherCount() external view override returns (uint256) {
  //   return traitCounts[7];
  // }

  // function miscCount() external view override returns (uint256) {
  //   return traitCounts[8];
  // }

  // function traitCount(uint8 _traitIndex) external view returns (uint8) {

  // }

}