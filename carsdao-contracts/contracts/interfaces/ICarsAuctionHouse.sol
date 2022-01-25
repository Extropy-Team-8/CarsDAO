// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.6;

interface ICarsAuctionHouse {
    struct Auction {
        uint carID;
        uint highestBidAmount;
        address highestBidder;
    }

    function placeBid(uint256 _bidAmount) external;

    function getHighestBid() external view returns(uint256);

    function settleAuctionAndCreateNewAuction() external;


}