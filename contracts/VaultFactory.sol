// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./BeaconProxy.sol";
import "./Beacon.sol";
import "./SquiddyCore.sol";
import "hardhat/console.sol";

contract VaultFactory {
    using Counters for Counters.Counter;
    Counters.Counter private vaultId;

    // index => proxyAddress
    mapping(address => VaultDetails) public vaultDetails;
    mapping(address => address) public vaultAddress_to_strategyAddress;
    mapping(uint256 => address) public vaultId_to_vaultAddress;
    VaultDetails[] allVaults;
    Beacon private squiddyCoreBeacon;
    bytes32 public constant VAULT_FACTORY_ROLE =
        keccak256("VAULT_FACTORY_ROLE");

    event NewVault(
        string indexed name,
        string indexed symbol,
        address indexed vaultAddress,
        address strategyAddress,
        address managerAddress,
        uint256 index
    );

    struct VaultDetails {
        string name;
        string symbol;
        address vaultAddress;
        address strategyAddress;
        address managerAddress;
        uint256 index;
    }

    constructor(address _SquiddyCore) {
        squiddyCoreBeacon = new Beacon(_SquiddyCore);
    }

    function buildVault(
        string memory _name,
        string memory _symbol,
        address _strategyAddress,
        address _managerAddress,
        address _assetAddress,
        uint8 _assetDecimals
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
                _assetDecimals
            )
        );

        VaultDetails memory _vaultDetails = VaultDetails(
            _name,
            _symbol,
            address(vault),
            _strategyAddress,
            _managerAddress,
            _vaultId
        );

        allVaults.push(_vaultDetails);

        vaultId_to_vaultAddress[_vaultId] = address(vault);
        vaultAddress_to_strategyAddress[address(vault)] = _strategyAddress;
        vaultDetails[address(vault)] = VaultDetails(
            _name,
            _symbol,
            address(vault),
            _strategyAddress,
            _managerAddress,
            _vaultId
        );

        emit NewVault(
            _name,
            _symbol,
            address(vault),
            _strategyAddress,
            _managerAddress,
            _vaultId
        );
    }

    function getBeacon() public view returns (address) {
        return address(squiddyCoreBeacon);
    }

    function getImplementation() public view returns (address) {
        return squiddyCoreBeacon.implementation();
    }
}
