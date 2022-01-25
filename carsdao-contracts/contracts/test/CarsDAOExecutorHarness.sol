// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/CarsDAOExecutor.sol';

interface Administered {
    function _acceptAdmin() external returns (uint256);
}

contract CarsDAOExecutorHarness is CarsDAOExecutor {
    constructor(address admin_, uint256 delay_) CarsDAOExecutor(admin_, delay_) {}

    function harnessSetPendingAdmin(address pendingAdmin_) public {
        pendingAdmin = pendingAdmin_;
    }

    function harnessSetAdmin(address admin_) public {
        admin = admin_;
    }
}

contract CarsDAOExecutorTest is CarsDAOExecutor {
    constructor(address admin_, uint256 delay_) CarsDAOExecutor(admin_, 2 days) {
        delay = delay_;
    }

    function harnessSetAdmin(address admin_) public {
        require(msg.sender == admin);
        admin = admin_;
    }

    function harnessAcceptAdmin(Administered administered) public {
        administered._acceptAdmin();
    }
}
