// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/CarsDAOLogic.sol';

contract CarsDAOImmutable is CarsDAOLogic {
    constructor(
        address timelock_,
        address cars_,
        // address admin_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) {
        // admin = msg.sender;
        initialize(timelock_, cars_, vetoer_, votingPeriod_, votingDelay_, proposalThresholdBPS_, quorumVotesBPS_);

        // admin = admin_;
    }

    function initialize(
        address timelock_,
        address cars_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) public override onlyOwner {
        // require(msg.sender == admin, 'CarsDAO::initialize: admin only');
        require(address(timelock) == address(0), 'CarsDAO::initialize: can only initialize once');

        timelock = ICarsDAOExecutor(timelock_);
        cars = CarsTokenLike(cars_);
        vetoer = vetoer_;
        votingPeriod = votingPeriod_;
        votingDelay = votingDelay_;
        proposalThresholdBPS = proposalThresholdBPS_;
        quorumVotesBPS = quorumVotesBPS_;
    }
}
