/*The Auth contract is a Solidity contract that provides a flexible and updatable pattern
for user authorization. The contract defines an owner and an authority, which can be used 
to determine whether a given user is authorized to perform certain actions within the contract. 
The owner is the default authority,but can be changed by calling the setOwner function. 
The authority is an implementation of the Authority interface, which defines a canCall function
that can be used to determine whether a given user is authorized to call a given function on a given contract.
The Auth contract also defines a requiresAuth modifier, which can be used to require that a function can only
be called by authorized users. */

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
    /// @param _vaultManager The owner of the factory.
    /// @param _authority The Authority of the factory.
    constructor(address _vaultManager, Authority _authority) Auth(_vaultManager, _authority) {}

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
    /// @param vaultManager The owner of the new Vault.
    /// @param name The name of the new Vault.
    /// @param symbol The symbol of the new Vault.
    /// @param squid The address of the Squid contract.
    /// @return vault The newly deployed Vault contract which accepts the provided underlying token.
    function deployVault(ERC20 underlying, address vaultManager, string calldata name, string calldata symbol, address squid) external returns (Vault vault) {
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
