// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.8;

import {ERC20} from "./ERC20.sol";
import {ERC4626} from "./ERC4626.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract SquiddyCore is ERC4626, AccessControl {
    address internal _manager;
    uint256 public beforeWithdrawHookCalledCounter = 0;
    uint256 public afterDepositHookCalledCounter = 0;
    uint256 internal BASE_UNIT;
    ERC20 public UNDERLYING;
    bytes32 public constant VAULT_FACTORY_ROLE =
        keccak256("VAULT_FACTORY_ROLE");

    //*******************************EVENTS*******************************************//

    event StrategyAInitilized(
        address indexed searcher,
        address indexed vault,
        uint256 duration
    );

    event StrategyBInitilized(
        address indexed stakePoolContract,
        address indexed vault,
        uint256 duration
    );

    event OwnershipTransferred(
        address indexed previousManager,
        address indexed newManager
    );
    event UnderlyingIsWETHUpdated(
        address indexed user,
        bool newUnderlyingIsWETH
    );
    /// @notice Emitted when the Vault is initialized.
    /// @param user The authorized user who triggered the initialization.
    event Initialized(address indexed user);

    event vaultPublic(bool isPublicVault);

    event FeePercentUpdated(address indexed user, uint256 newFeePercent);

    event FeesClaimed(address indexed user, uint256 sVTokenAmount);

    event TargetFloatPercentUpdated(
        address indexed user,
        uint256 newTargetFloatPercent
    );

    //********************************************************************************//
    //*******************************MODIFIERS****************************************//

    modifier onlyManager() {
        require(manager() == msg.sender, "Ownable: caller is not the manager");
        _;
    }

    modifier onlyVaultFactory() {
        require(
            hasRole(VAULT_FACTORY_ROLE, msg.sender),
            "Ownable: caller is not the vault factory"
        );
        _;
    }

    //******************************************************************************//

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function initializeBeaconProxy(
        address _underlying,
        address _managerAddress,
        string memory _name,
        string memory _symbol,
        uint8 _decimals) public {

        UNDERLYING = ERC20(_underlying);
        _manager = _managerAddress;
        BASE_UNIT = 10**decimals;

        /* Prevent minting of sVTokens until
         * the initialize function is called.
         */
        totalSupply = type(uint256).max;

        initializeERC4626(_underlying, _name, _symbol, _decimals);
    }

    //******************************************************************************//
    /************************MANAGER***********************************************/

    function manager() public view virtual returns (address) {
        return _manager;
    }

    /*
     * NOTE: Renouncing ownership will leave the contract without an manager,
     * thereby removing any functionality that is only available to the manager.
     */
    function renounceOwnership() public virtual onlyManager {
        emit OwnershipTransferred(_manager, address(0));
        _manager = address(0);
    }

    /*
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current manager.
     */
    function transferOwnership(address newOwner) public virtual onlyManager {
        require(
            newOwner != address(0),
            "Ownable: new manager is the zero address"
        );
        emit OwnershipTransferred(_manager, newOwner);
        _manager = newOwner;
    }

    //******************************************************************************//
    /***********************FEE CONFIGURATION/CLAIM***************************/
    /// @notice The percentage of profit recognized each harvest to reserve as fees.
    /// @dev A fixed point number where 1e18 represents 100% and 0 represents 0%.
    uint256 public feePercent;

    /// @notice Sets a new fee percentage.
    /// @param newFeePercent The new fee percentage.
    function setFeePercent(uint256 newFeePercent) external onlyManager {
        // A fee percentage over 100% doesn't make sense.
        require(newFeePercent <= 1e18, "FEE_TOO_HIGH");

        // Update the fee percentage.
        feePercent = newFeePercent;

        emit FeePercentUpdated(msg.sender, newFeePercent);
    }

    /// @notice Claims fees accrued from harvests.
    /// @param sVTokenAmount The amount of rvTokens to claim.
    /// @dev Accrued fees are measured as rvTokens held by the Vault.
    function claimFees(uint256 sVTokenAmount) external onlyManager {
        emit FeesClaimed(msg.sender, sVTokenAmount);

        // Transfer the provided amount of rvTokens to the caller.
        ERC20(this).transfer(msg.sender, sVTokenAmount);
    }

    /******************************************************************************/
    /********************TARGET FLOAT CONFIGURATION********************************/

    /// @notice The desired percentage of the Vault's holdings to keep as float.
    /// @dev A fixed point number where 1e18 represents 100% and 0 represents 0%.
    uint256 public targetFloatPercent;

    /// @notice Set a new target float percentage.
    /// @param newTargetFloatPercent The new target float percentage.
    function setTargetFloatPercent(uint256 newTargetFloatPercent)
        external
        onlyManager
    {
        // A target float percentage over 100% doesn't make sense.
        require(newTargetFloatPercent <= 1e18, "TARGET_TOO_HIGH");

        // Update the target float percentage.
        targetFloatPercent = newTargetFloatPercent;

        emit TargetFloatPercentUpdated(msg.sender, newTargetFloatPercent);
    }

    /******************************************************************************/
    /*******************UNDERLYING IS WETH CONFIGURATION******************************/

    /// @notice Whether the Vault should treat the underlying token as WETH compatible.
    /// @dev If enabled the Vault will allow trusting strategies that accept Ether.
    bool public underlyingIsWETH;

    /// @notice Sets whether the Vault treats the underlying as WETH.
    /// @param newUnderlyingIsWETH Whether the Vault should treat the underlying as WETH.
    /// @dev The underlying token must have 18 decimals, to match Ether's decimal scheme.
    function setUnderlyingIsWETH(bool newUnderlyingIsWETH)
        external
        onlyManager
    {
        // Ensure the underlying token's decimals match ETH if is WETH being set to true.
        require(
            !newUnderlyingIsWETH || UNDERLYING.decimals() == 18,
            "WRONG_DECIMALS"
        );

        // Update whether the Vault treats the underlying as WETH.
        underlyingIsWETH = newUnderlyingIsWETH;

        emit UnderlyingIsWETHUpdated(msg.sender, newUnderlyingIsWETH);
    }

    //*************************************************************************************/
    /***********************************STRATEGY*******************************************/

    /// @notice The total amount of underlying tokens held in strategies at the time of the last harvest.
    /// @dev Includes maxLockedProfit, must be correctly subtracted to compute available/free holdings.
    uint256 public totalStrategyHoldings;

    function strategyACall(
        address _searcher,
        uint160 _duration,
        uint256 _value
    ) private returns (bool) {
        (bool success, bytes memory data) = _searcher.call{value: _value}("");
        require(success, "Strategy A failed");
        emit StrategyAInitilized(_searcher, address(this), _duration);
        return abi.decode(data, (bool));
    }

    function strategyBCall(
        address _yeildBearingOption,
        uint160 _duration,
        uint256 _value
    ) private returns (bool) {
        (bool success, bytes memory data) = _yeildBearingOption.call{
            value: _value
        }("");
        require(success, "Strategy B failed");
        emit StrategyBInitilized(_yeildBearingOption, address(this), _duration);
        return abi.decode(data, (bool));
    }

    /************************************************************************************/
    /******************VAULT ACCOUNTING LOGIC********************************************/

    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this));
    }

    function beforeWithdraw(uint256, uint256) internal override {
        beforeWithdrawHookCalledCounter++;
    }

    function afterDeposit(uint256, uint256) internal override {
        afterDepositHookCalledCounter++;
    }

    /************************************************************************************/
    /*******************INITIALIZATION/DESTRUCTION**************************************/

    /// @notice Whether the Vault has been initialized yet.
    /// @dev Can go from false to true, never from true to false.
    bool public isInitialized;
    bool public isPublic;

    /// @notice Initializes the Vault, enabling it to receive deposits.
    /// @dev All critical parameters must already be set before calling.
    function initialize(address _searcher, uint160 _duration)
        external
        onlyManager
    {
        // Ensure the Vault has not already been initialized.
        require(!isInitialized, "ALREADY_INITIALIZED");

        // Mark the Vault as initialized.
        isInitialized = true;

        // Open for deposits.
        totalSupply = 0;

        strategyACall(_searcher, 100000, _duration);

        emit Initialized(msg.sender);
        if (isPublic) {
            emit vaultPublic(true);
        } else {
            emit vaultPublic(false);
        }
    }

    /// @notice Self destructs a Vault, enabling it to be redeployed.
    /// @dev Caller will receive any ETH held as float in the Vault.
    function destroy() external onlyManager {
        selfdestruct(payable(msg.sender));
    }

    /************************************************************************************/
    /*************************************RECIEVE ETHER**********************************/

    /// @dev Required for the Vault to receive unwrapped ETH.
    receive() external payable {}
    /************************************************************************************/
}
