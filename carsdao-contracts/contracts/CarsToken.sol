// SPDX-License-Identifier: GPL-3.0

/// @title The CarsDAO ERC-721 token

/*
       -           __
     --          ~( @\   \
    ---   _________]_[__/_>________
         /  ____ \ <>     |  ____  \
        =\_/ __ \_\_______|_/ __ \__D
    ________(__)_____________(__)____
 */

<<<<<<< HEAD
pragma solidity ^0.8.0;
=======
pragma solidity ^0.8.6;
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interfaces/ICarsToken.sol";
import "./interfaces/ICarsTraits.sol";

contract CarsToken is ICarsToken, ERC721, Ownable {

  // mint price
  uint256 public constant MINT_PRICE = 0 ether;
  // max number of tokens that can be minted - 50000 in production
  uint256 public immutable MAX_TOKENS;
  // number of tokens have been minted so far
  uint16 public minted;
  // quantity of each trait type
<<<<<<< HEAD
  uint8[][9] public traitCounts;
=======
  uint8[][9] public rarities;
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2

  // mapping from tokenId to a struct containing the token's traits
  mapping(uint256 => Car) public tokenTraits;
  // mapping from hashed(tokenTrait) to the tokenId it's associated with
  // used to ensure there are no duplicates
  mapping(uint256 => uint256) public existingCombinations;

  // reference to Traits and AuctionHouse contract
  ICarsTraits public traits;
//   ICarsAuctionHouse public auctionHouse;

<<<<<<< HEAD
  modifier onlyAuctionHouse() {
    require(_msgSender() == auctionHouse.address, "Only auction house can call this function");
    _;
  }

  constructor(address _traits, address _auctionHouse, uint256 _maxTokens) ERC721("CarDAO", 'CARD') { 
=======
  // modifier onlyAuctionHouse() {
  //   require(_msgSender() == auctionHouse.address, "Only auction house can call this function");
  //   _;
  // }

  constructor(address _traits, uint256 _maxTokens) ERC721("CarDAO", 'CARD') { 
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2
    traits = ICarsTraits(_traits);
    // auctionHouse = ICarsAuctionHouse(_auctionHouse);
    MAX_TOKENS = _maxTokens;

<<<<<<< HEAD
    // bg
    traitCounts[0] = 7;
    // floor
    traitCounts[1] = 9;
    // body
    traitCounts[2] = 6;
    // bottom
    traitCounts[3] = 5;
    // wheel
    traitCounts[4] = 7;
    // headlight
    traitCounts[5] = 8;
    // window
    traitCounts[6] = 6;
    // weather
    traitCounts[7] = 7;
    // misc
    traitCounts[8] = 7;
=======
   // bg
    rarities[0] = [1, 1, 1, 1, 1, 1, 1];
    // ground
    rarities[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    // body
    rarities[2] =  [1, 1, 1, 1, 1, 1];
    // bottom
    rarities[3] = [1, 1, 1, 1, 1];
    // wheel
    rarities[4] = [1, 1, 1, 1, 1, 1, 1];
    // headlight
    rarities[5] = [1, 1, 1, 1, 1, 1, 1, 1];
    // window
    rarities[6] = [1, 1, 1, 1, 1, 1];
    // weather
    rarities[7] = [1, 1, 1, 1, 1, 1, 1];
    // misc
    rarities[8] = [1, 1, 1, 1, 1, 1, 1];
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2
  }

  /** EXTERNAL */
  // REMEMBER TO ADD onlyAuctionHouse
  function mint() external payable returns (uint256) {
    require(tx.origin == _msgSender(), "Only EOA wallets allowed.");
    // require(_msgSender() == auctionHouse.address, "Only auction house can mint");

    minted++;
    uint256 seed = random(minted);
    generateTraits(minted, seed);
    _safeMint(_msgSender(), minted);

    return minted;
  }

  // function transferFrom(
  //   address from,
  //   address to,
  //   uint256 tokenId
  // ) public virtual override {
  //   // Hardcode the Barn's approval so that users don't have to waste gas approving
  //   if (_msgSender() != address(extraAddr))
  //     require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
  //   _transfer(from, to, tokenId);
  // }

  /** INTERNAL */
  /**
   * generates traits for a specific token, checking to make sure it's unique
   * @param tokenId the id of the token to generate traits for
   * @param seed a pseudorandom 256 bit number to derive traits from
   * @return t - a struct of traits for the given token ID
   */
  function generateTraits(uint256 tokenId, uint256 seed) internal returns (Car memory t) {
    t = selectTraits(seed);
    if (existingCombinations[structToHash(t)] == 0) {
      tokenTraits[tokenId] = t;
      existingCombinations[structToHash(t)] = tokenId;
      return t;
    }
<<<<<<< HEAD
    return generate(tokenId, random(seed));
  }

  function selectTrait(uint16 seed, uint8 traitType) internal view returns (uint8) {
    uint8 trait = uint8(seed) % uint8(traitCounts[traitType]);
    if (seed >> 8 < traitCounts[traitType][trait]) return trait;
    return uint8((trait + 2) % traitCounts[traitType]);
=======
    return generateTraits(tokenId, random(seed));
  }

  function selectTrait(uint16 seed, uint8 traitType) internal view returns (uint8) {
    uint8 trait = uint8(seed) % uint8(rarities[traitType].length);
    if (seed >> 8 < rarities[traitType][trait]) return trait;
    return uint8((trait + 2) % rarities[traitType].length);
>>>>>>> 33de2c579b2dcb60729ae9d52c8f648200daf2b2
  }

  /**
   * selects the species and all of its traits based on the seed value
   * @param seed a pseudorandom 256 bit number to derive traits from
   * @return c -  a struct of randomly selected traits
   */
  function selectTraits(uint256 seed) internal view returns (Car memory c) {    
    seed >>= 16;
    c.background = selectTrait(uint16(seed & 0xFFFF), 0);
    seed >>= 16;
    c.floor = selectTrait(uint16(seed & 0xFFFF), 1);
    seed >>= 16;
    c.body = selectTrait(uint16(seed & 0xFFFF), 2);
    seed >>= 16;
    c.bottom = selectTrait(uint16(seed & 0xFFFF), 3);
    seed >>= 16;
    c.wheel = selectTrait(uint16(seed & 0xFFFF), 4);
    seed >>= 16;
    c.headlight = selectTrait(uint16(seed & 0xFFFF), 5);
    seed >>= 16;
    c.window = selectTrait(uint16(seed & 0xFFFF), 6);
    seed >>= 16;
    c.weather = selectTrait(uint16(seed & 0xFFFF), 7);
    seed >>= 16;
    c.misc = selectTrait(uint16(seed & 0xFFFF), 8);
  }

  /**
   * converts a struct to a 256 bit hash to check for uniqueness
   * @param c the struct to pack into a hash
   * @return the 256 bit hash of the struct
   */
  function structToHash(Car memory c) internal pure returns (uint256) {
    return uint256(bytes32(
      bytesToBytes32(
        abi.encodePacked(
          c.background,
          c.floor,
          c.body,
          c.bottom,
          c.wheel,
          c.headlight,
          c.window,
          c.weather,
          c.misc
        )
    )));
  }

  function bytesToBytes32(bytes memory source) private pure returns (bytes32 result) {
    if (source.length == 0) {
        return 0x0;
    }
    assembly {
        result := mload(add(source, 32))
    }
  }

  /**
   * generates a pseudorandom number
   * @param seed a value ensure different outcomes for different sources in the same block
   * @return a pseudorandom value
   */
  function random(uint256 seed) internal view returns (uint256) {
    return uint256(keccak256(abi.encodePacked(
      tx.origin,
      blockhash(block.number - 1),
      block.timestamp,
      seed
    )));
  }

  /** READ */
  function getTokenTraits(uint256 tokenId) external view override returns (Car memory) {
    return tokenTraits[tokenId];
  }

  /** ADMIN */

  // function setExtraAddr(address _extraAddr) external onlyOwner {
  //   extraAddr = _extraAddr;
  // }

//   function withdraw() external onlyOwner {
//     payable(owner()).transfer(address(this).balance);
//   }

  /** RENDER */
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    return traits.tokenURI(tokenId);
  }
}