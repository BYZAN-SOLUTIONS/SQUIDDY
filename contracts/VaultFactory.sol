// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.8;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "./Vault.sol";

// contract VaultFactory {
//     using Counters for Counters.Counter;
//     Counters.Counter public vaultId;
//     Counters.Counter public removedVaults;


//     mapping(uint256 => VaultDetails) public vaultId_to_vaultDetails;
//     mapping(uint256 => address) public vaultId_to_vaultAddress;
//     mapping(uint256 => bool) public vaultId_to_isActive;


//     event NewVault(
//         string indexed name,
//         string indexed symbol,
//         address indexed vaultAddress,
//         address managerAddress,
//         uint256 index
//     );

//     struct VaultDetails {
//         address vaultAddress;
//         ERC20 assetAddress;
//         address managerAddress;
//         string name;
//         string symbol;
//         uint256 index;
//         address squid;

//     }

//     function buildVault(
//         ERC20 _assetAddress,
//         address _managerAddress,
//         string calldata _name,
//         string calldata _symbol,
//         address _squid
//     ) public {
//         vaultId.increment();
//         uint256 _vaultId = vaultId.current();
//         Vault vault = new Vault(_assetAddress, _managerAddress,_name, _symbol, _squid);

//         vaultId_to_vaultAddress[_vaultId] = address(vault);
//         vaultId_to_isActive[_vaultId] = true;
//         vaultId_to_vaultDetails[_vaultId] = VaultDetails(
//             address(vault),
//             _assetAddress,
//             _managerAddress,
//             _name,
//             _symbol,
//             _vaultId,
//             _squid

//         );

//         emit NewVault(
//             _name,
//             _symbol,
//             address(vault),
//             _managerAddress,
//             _vaultId
//         );
//     }

//     function getVaultDetails(uint256 _vaultId)
//         public
//         view
//         returns (VaultDetails memory)
//     {
//         return vaultId_to_vaultDetails[_vaultId];
//     }

//     function getVaultAddress(uint256 _vaultId) public view returns (address) {
//         return vaultId_to_vaultAddress[_vaultId];
//     }

//     function getVaultCount() public view returns (uint256) {
//         return vaultId.current();
//     }

//     function getRemovedVaultCount() public view returns (uint256) {
//         return removedVaults.current();
//     }


//     function fetchAllVaults() public view returns (VaultDetails[] memory) {
//         uint256 vaultCount = vaultId.current();
//         uint256 currentVaultCount = vaultId.current() - removedVaults.current();
//         uint256 currentIndex = 0;

//         VaultDetails[] memory vaults = new VaultDetails[](currentVaultCount);

//         if (vaultCount == 0) {
//             return vaults;
//         }

//         for (uint256 i = 0; i < vaultCount; i++) {
//             bool status = vaultId_to_isActive[i + 1];
//             if (status == true) {
//                 uint256 currentId = i + 1;
//                 VaultDetails storage currentItem = vaultId_to_vaultDetails[
//                     currentId
//                 ];
//                 vaults[currentIndex] = currentItem;
//                 currentIndex += 1;
//             }
//         }
//         return vaults;
//     }

//     function removeVaultContractFromFrontend(uint8 index) public {
//         uint256 vaultCount = vaultId.current();
//         require(
//             index <= vaultCount,
//             "VaultFactory: index must be less than vault count"
//         );
//         require(
//             vaultId_to_isActive[index],
//             "VaultFactory: vault already removed"
//         );
//         removedVaults.increment();
//         vaultId_to_isActive[index] = false;
//     }
// }

pragma solidity 0.8.10;

import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {Auth, Authority} from "solmate/src/auth/Auth.sol";
import {Bytes32AddressLib} from "solmate/src/utils/Bytes32AddressLib.sol";

import {Vault} from "./Vault.sol";

/// Factory which enables deploying a Vault for any ERC20 token.
contract VaultFactory is Auth {
    using Bytes32AddressLib for address;
    using Bytes32AddressLib for bytes32;

    /*コ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡
                                                    CONSTRUCTOR
    コ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡*/

    /// Creates a Vault factory.
    /// @param _owner The owner of the factory.
    /// @param _authority The Authority of the factory.
    constructor(address _vaultManager Auth(_vaultManager) {}

    /*コ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡
                                                VAULT DEPLOYMENT LOGIC
    コ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡*/

    /// Emitted when a new Vault is deployed.
    /// @param vault The newly deployed Vault contract.
    /// @param underlying The underlying token the new Vault accepts.
    event VaultDeployed(Vault vault, ERC20 underlying);

    ///  Deploys a new Vault which supports a specific underlying token.
    /// @dev This will revert if a Vault that accepts the same underlying token has already been deployed.
    /// @param underlying The ERC20 token that the Vault should accept.
    /// @return vault The newly deployed Vault contract which accepts the provided underlying token.
    function deployVault(ERC20 underlying, address vaultManager, string name, string symbol, address squid) external returns (Vault vault) {
        // Use the CREATE2 opcode to deploy a new Vault contract.
        // This will revert if a Vault which accepts this underlying token has already
        // been deployed, as the salt would be the same and we can't deploy with it twice.
        vault = new Vault{salt: address(underlying).fillLast12Bytes()}(underlying, vaultManager, name, symbol, squid);

        emit VaultDeployed(vault, underlying);
    }

    /*コ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡
                                                VAULT LOOKUP LOGIC
    コ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡くコ:彡*/

    /// @notice Computes a Vault's address from its accepted underlying token.
    /// @param underlying The ERC20 token that the Vault should accept.
    /// @return The address of a Vault which accepts the provided underlying token.
    /// @dev The Vault returned may not be deployed yet. Use isVaultDeployed to check.
    function getVaultFromUnderlying(ERC20 underlying) external view returns (Vault) {
        return
            Vault(
                payable(
                    keccak256(
                        abi.encodePacked(
                            // Prefix:
                            bytes1(0xFF),
                            // Creator:
                            address(this),
                            // Salt:
                            address(underlying).fillLast12Bytes(),
                            // Bytecode hash:
                            keccak256(
                                abi.encodePacked(
                                    // Deployment bytecode:
                                    type(Vault).creationCode,
                                    // Constructor arguments:
                                    abi.encode(underlying)
                                )
                            )
                        )
                    ).fromLast20Bytes() // Convert the CREATE2 hash into an address.
                )
            );
    }

    /// @notice Returns if a Vault at an address has already been deployed.
    /// @param vault The address of a Vault which may not have been deployed yet.
    /// @return A boolean indicating whether the Vault has been deployed already.
    /// @dev This function is useful to check the return values of getVaultFromUnderlying,
    /// as it does not check that the Vault addresses it computes have been deployed yet.
    function isVaultDeployed(Vault vault) external view returns (bool) {
        return address(vault).code.length > 0;
    }
}
