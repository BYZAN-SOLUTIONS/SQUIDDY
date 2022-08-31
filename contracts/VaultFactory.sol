// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "openzeppelin/contracts/utils/Counters.sol";

import "./VaultBeacon.sol";
import "./Vault.sol";

contract VaultFactory {
    using Counters for Counters.Counter;
    Counters.Counter private vaultId;

    // index => proxyAddress
    mapping(uint32 => address) private vaults;
    VaultBeacon immutable beacon;

    event NewVault(
        uint256 indexed name,
        address indexed symbol,
        uint256 indexed vaultAddress,
        address strategyAddress,
        address managerAddress,
    );

    constructor(address _initBlueprint) {
        beacon = new VaultBeacon(_initBlueprint);
    }

    function buildVault(
        string memory _name,
        string memory _symbol,
        address _strategy,
        address _manager,
        address _assetAddress
    ) public {
        vaultId.increment();
        uint256 _vaultId = vaultId.current();

        BeaconProxy vault = new BeaconProxy(
            address(beacon),
            abi.encodeWithSelector(
                Vault(address(0)).initialize.selector,
                _name,
                _symbol,
                _strategy,
                _manager,
                _assetAddress,
                _vaultId
            )
        );
        vaults[_vaultId] = address(vault);
    }

    function getVaultAddress(uint32 vaultId) external view returns (address) {
        return vaults[vaultId];
    }

    function getBeacon() public view returns (address) {
        return address(beacon);
    }

    function getImplementation() public view returns (address) {
        return beacon.implementation();
    }
}
