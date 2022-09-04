// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "./UpgradeableBeacon.sol";
import "./Ownable.sol";

contract Beacon is Ownable {
    UpgradeableBeacon immutable beacon;

    address public SquiddyCore;

    constructor(address _SquiddyCore) {
        beacon = new UpgradeableBeacon(_SquiddyCore);
        SquiddyCore = _SquiddyCore;
        transferOwnership(tx.origin);
    }

    function update(address _newSquiddyCore) public onlyOwner {
        beacon.upgradeTo(_newSquiddyCore);
        SquiddyCore = _newSquiddyCore;
    }

    function implementation() public view returns (address) {
        return beacon.implementation();
    }
}
