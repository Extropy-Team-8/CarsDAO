// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { ICarsDescriptor } from "./ICarsDescriptor.sol";
import { ICarsSeeder } from "./ICarsSeeder.sol";

interface ICarsToken is IERC721 {
  // token events
  event CarCreated(uint256 indexed _tokenId, ICarsSeeder.Seed _seed);
  event CarBurned(uint256 indexed _tokenId);
  event CardersDAOUpdated(address _cardersDAO);
  event MinterUpdated(address _minter);
  event MinterLocked();
  event DescriptorUpdated(ICarsDescriptor _descriptor);
  event DescriptorLocked();
  event SeederUpdated(ICarsSeeder _seeder);
  event SeederLocked();

  // user functions
  function mint() external returns (uint256);
  function burn(uint256 _tokenId) external;
  function dataURI(uint256 _tokenId) external returns (string memory);

  // admin functions
  function setCardersDAO(address _cardersDAO) external;
  function setMinter(address _minter) external;
  function lockMinter() external;
  function setDescriptor(ICarsDescriptor _descriptor) external;
  function lockDescriptor() external;
  function setSeeder(ICarsSeeder _seeder) external;
  function lockSeeder() external;

}