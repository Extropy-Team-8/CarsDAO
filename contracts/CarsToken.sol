// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { IERC721 } from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import { IProxyRegistry } from './external/opensea/IProxyRegistry.sol';
import { ICarsDescriptor } from "./interfaces/ICarsDescriptor.sol";
import { ICarsSeeder } from "./interfaces/ICarsSeeder.sol";
import { ICarsToken } from "./interfaces/ICarsToken.sol";
// import { ERC721Checkpointable } from './base/ERC721Checkpointable.sol';


contract CarsToken is ICarsToken, Ownable, ERC721 {
  address public cardersDAO;
  address public minter; // car minter -> i.e. auction house?

  ICarsDescriptor public descriptor;
  ICarsSeeder public seeder;

  bool public isMinterLocked;
  bool public isDescriptorLocked;
  bool public isSeederLocked;

  mapping(uint256 => ICarsSeeder.Seed) public seeds;

  uint256 private _currentCarId;

  string private _contractURIHash = ""; // URI HASH NEEDED

  IProxyRegistry public immutable proxyRegistry;

  modifier whenMinterNotLocked() {
    require(!isMinterLocked, "Minter is locked.");
    _;
  }

  modifier whenDescriptorNotLocked() {
    require(!isDescriptorLocked, "Descriptor is locked.");
    _;
  }

  modifier whenSeederNotLocked() {
    require(!isSeederLocked, "Seeder is locked.");
    _;
  }

  modifier onlyCardersDAO() {
    require(msg.sender == cardersDAO, "Sender is not cardersDAO address.");
    _;
  }

  modifier onlyMinter() {
    require(msg.sender == minter, "Sender is not minter.");
    _;
  }

  constructor(
    address _cardersDAO,
    address _minter,
    ICarsDescriptor _descriptor,
    ICarsSeeder _seeder,
    IProxyRegistry _proxyRegistry
  ) ERC721("Cars", "CAR") {
    cardersDAO = _cardersDAO;
    minter = _minter;
    descriptor = _descriptor;
    seeder = _seeder;
    proxyRegistry = _proxyRegistry;
  }

  function contractURI() public view returns (string memory) {
    return string(abi.encodePacked("ipfs://", _contractURIHash));
  }

  function setContractURIHash(string memory _newContractURIHash) external onlyOwner {
    _contractURIHash = _newContractURIHash;
  }

  // Override isApprovedForAll to remove gas from listings.
  function isApprovedForAll(address owner, address operator) public view override(IERC721, ERC721) returns (bool) {
    // Whitelist OpenSea proxy contract for easy trading.
    if (proxyRegistry.proxies(owner) == operator) {
      return true;
    }
    return super.isApprovedForAll(owner, operator);
  }


  // Maybe mint to carsDAO address every 10 cars??
  function mint() public override onlyMinter returns (uint256) {
    if (_currentCarId % 10 == 0) {
      _mintTo(cardersDAO, _currentCarId++);
    }
    return _mintTo(minter, _currentCarId++);
  }

  function burn(uint256 _nounId) public override onlyMinter {
    _burn(_nounId);
    emit NounBurned(_nounId);
  }

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "CarsToken: URI query for nonexistent token");
    return descriptor.tokenURI(_tokenId, seeds[_tokenId]);
  }

  function dataURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "CarsToken: URI query for nonexistent token");
    return descriptor.dataURI(_tokenId, seeds[_tokenId]);
  }

  function setCardersDAO(address _cardersDAO) external override onlyCardersDAO {
    cardersDAO = _cardersDAO;
    emit CardersDAOUpdated(_cardersDAO);
  }

  function setMinter(address _minter) external override onlyOwner whenMinterNotLocked {
    minter = _minter;
    emit MinterUpdated(_minter);
  }

  function lockMinter() external override onlyOwner whenMinterNotLocked {
    isMinterLocked = true;
    emit MinterLocked();
  }

  function setDescriptor(ICarsDescriptor _descriptor) external override onlyOwner whenDescriptorNotLocked {
    descriptor = _descriptor;
    emit DescriptorUpdated(_descriptor);
  }

  function lockDescriptor() external override onlyOwner whenDescriptorNotLocked {
    isDescriptorLocked = true;
    emit DescriptorLocked();
  }

  function setSeeder(ICarsSeeder _seeder) external override onlyOwner whenSeederNotLocked {
    seeder = _seeder;
    emit SeederUpdated(_seeder);
  }

  function lockSeeder() external override onlyOwner whenSeederNotLocked {
    isSeederLocked = true;
    emit SeederLocked();
  }

  function _mintTo(address _to, uint256 _carId) internal returns (uint256) {
    ICarsSeeder.Seed memory seed = seeds[_carId] = seeder.generateSeed(_carId, descriptor);

    _mint(owner(), to, _carId);
    emit CarCreated(_carId, seed);

    return _carId;
  }
}