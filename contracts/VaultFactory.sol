// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./proxy/BeaconProxy.sol";
import "./proxy/Beacon.sol";
import "./SquiddyVault.sol";

contract VaultFactory {
    using Counters for Counters.Counter;
    Counters.Counter public vaultId;
    Counters.Counter public removedVaults;

    // index => proxyAddress
    mapping(uint256 => VaultDetails) public vaultId_to_vaultDetails;
    mapping(uint256 => address) public vaultId_to_vaultAddress;
    mapping(uint256 => bool) public vaultId_to_isActive;
    // Beacon private squiddyCoreBeacon;
    address private squiddyCoreImplementation;

    event NewVault(
        string indexed name,
        string indexed symbol,
        address indexed vaultAddress,
        address managerAddress,
        uint256 index
    );

    struct VaultDetails {
        string name;
        string symbol;
        address vaultAddress;
        address managerAddress;
        address assetAddress;
        uint256 index;
    }

    constructor(address _SquiddyCore) {
        // squiddyCoreBeacon = new Beacon(_SquiddyCore);
        squiddyCoreImplementation = _SquiddyCore;
    }

    function buildVault(
        string memory _name,
        string memory _symbol,
        address _managerAddress,
        address _assetAddress,
    ) public {
        vaultId.increment();
        uint256 _vaultId = vaultId.current();

        BeaconProxy vault = new BeaconProxy(
            address(squiddyCoreBeacon),
            abi.encodeWithSelector(
                SquiddyCore(payable(address(0))).initializeBeaconProxy.selector,
                _assetAddress,
                _managerAddress,
                _name,
                _symbol,
            )
        );

        // VaultDetails(
        //     _name,
        //     _symbol,
        //     address(vault),
        //     _managerAddress,
        //     _assetAddress,
        //     _vaultId
        // );

        vaultId_to_vaultAddress[_vaultId] = address(vault);
        vaultId_to_isActive[_vaultId] = true;
        vaultId_to_vaultDetails[_vaultId] = VaultDetails(
            _name,
            _symbol,
            address(vault),
            _managerAddress,
            _assetAddress,
            _vaultId
        );

        emit NewVault(
            _name,
            _symbol,
            address(vault),
            _managerAddress,
            _vaultId
        );
    }

    // function getBeacon() public view returns (address) {
    //     return address(squiddyCoreBeacon);
    // }

    function getImplementation() public view returns (address) {
        return squiddyCoreImplementation;
    }

    function fetchAllVaults() public view returns (VaultDetails[] memory) {
        uint256 vaultCount = vaultId.current();
        uint256 currentVaultCount = vaultId.current() - removedVaults.current();
        uint256 currentIndex = 0;

        VaultDetails[] memory vaults = new VaultDetails[](currentVaultCount);

        if (vaultCount == 0) {
            return vaults;
        }

        for (uint256 i = 0; i < vaultCount; i++) {
            bool status = vaultId_to_isActive[i + 1];
            if (status == true) {
                uint256 currentId = i + 1;
                VaultDetails storage currentItem = vaultId_to_vaultDetails[
                    currentId
                ];
                vaults[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return vaults;
    }

    function removeVaultContractFromFrontend(uint8 index) public {
        require(
            hasRole(VAULT_ADMIN, msg.sender),
            "VaultFactory: must have vault admin role to remove vault"
        );
        uint256 vaultCount = vaultId.current();
        require(
            index <= vaultCount,
            "VaultFactory: index must be less than vault count"
        );
        require(
            vaultId_to_isActive[index],
            "VaultFactory: vault already removed"
        );
        removedVaults.increment();
        vaultId_to_isActive[index] = false;
    }
}
