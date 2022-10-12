// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

import {SquiddyOps} from "./SquiddyOps.sol";

contract HarvestTask is SquiddyOps {
    uint256 public count;
    bool public executable;

    // solhint-disable-next-line no-empty-blocks
    constructor(address payable _ops) SquiddyOps(_ops) {}

    // solhint-disable not-rely-on-time
    function depositYeildToVaultContract(uint amount) external onlyOps {
        require(executable, "HarveestTask: depositYeildToVaultContract: Not executable");

        count += amount;
    }

    function setExecutable(bool _executable) external {
        executable = _executable;
    }
}
