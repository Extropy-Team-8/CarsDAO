// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.6;

interface ICarsAuctionHouse {
    struct Auction {
        // ID for the Car (ERC721 token ID)
        uint256 carId;
        // The current highest bid amount
        uint256 amount;
        // The time that the auction started
        uint256 startTime;
        // The time that the auction is scheduled to end
        uint256 endTime;
        // The address of the current highest bid
        address payable bidder;
        // Whether or not the auction has been settled
        bool settled;
    }

    event AuctionCreated(uint256 indexed carId, uint256 startTime, uint256 endTime);

    event AuctionBid(uint256 indexed carId, address sender, uint256 value);

    event AuctionExtended(uint256 indexed carId, uint256 endTime);

    event AuctionSettled(uint256 indexed carId, address winner, uint256 amount);
    
    event AuctionMinBidIncrementPercentageUpdated(uint256 minBidIncrementPercentage);



    function settleAuction() external;

    function settleCurrentAndCreateNewAuction() external;

    function createBid(uint256 carId) external payable;

    function setMinBidIncrementPercentage(uint8 minBidIncrementPercentage) external;
}
