// SPDX-License-Identifier: GPL-3.0

/// @title Interface for CarsDescriptor

pragma solidity ^0.8.6;

interface ICarsTraits {
  function tokenURI(uint256 tokenId) external view returns (string memory);
}