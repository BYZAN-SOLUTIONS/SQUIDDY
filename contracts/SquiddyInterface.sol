// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.8;

import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";

struct Strategy{
    uint256 performanceFee;
    uint256 activation;
    uint256 debtRatio;
    uint256 minDebtPerHarvest;
    uint256 maxDebtPerHarvest;
    uint256 lastReport;
    uint256 totalDebt;
    uint256 totalGain;
    uint256 totalLoss;
}

interface SquidAPI is IERC4626 {
    function name() external view returns (string calldata);

    function symbol() external view returns (string calldata);

    function decimals() external view returns (uint8);

    function permit(
        address owner,
        address spender,
        uint256 amount,
        uint256 expiry,
        bytes calldata signature
    ) external returns (bool);

    function deposit(uint256 amount, address recipient) external returns (uint256);

    function withdraw(uint256 maxShares, address recipient) external returns (uint256);

    function token() external view returns (address);

    function strategies(address _strategy) external view returns (Strategy memory);

    function pricePerShare() external view returns (uint256);

    function totalAssets() external view returns (uint256);

    function depositLimit() external view returns (uint256);

    function maxAvailableShares() external view returns (uint256);

    /**
     - View how much liquidity provided by vault to this Strategy,
     - based on its present performance. 
     */
    function creditAvailable() external view returns (uint256);

    /**
     - View how much the Vault would like to pull back from the Strategy,
     - based on its present performance.
     */
    function debtOutstanding() external view returns (uint256);

    /**
     - View how much the Vault expect this Strategy to return at the current
     - block, based on its present performance.
     */
    function expectedReturn() external view returns (uint256);

    /**
     - This is the main contact point where the Strategy interacts with the
     - Vault. The Strategy will inform the Vault of its estimated total assets
     */
    function earningsReport(
        uint256 _gain,
        uint256 _loss,
        uint256 _debtPayment
    ) external returns (uint256);

    /**
     - This function should only be used in the scenario where the Strategy is
     - being retired but no migration of the positions are possible or desirable.
     */
    function revokeStrategy() external;


    /**
     * View the management address of the Vault to assert privileged functions
     * can only be called by management. The Strategy serves the Vault, so it
     * is subject to management defined by the Vault.
     */
    function management() external view returns (address);

}

/**
 * This interface is here for the searcher bot to use.
 */
interface StrategyAPI {
    function name() external view returns (string memory);

    function vault() external view returns (address);

    function strategyTotalAssets() external view returns (address);

    function searcher() external view returns (address);

    function isActive() external view returns (bool);

    function delegatedAssets() external view returns (uint256);

    function estimatedTotalAssets() external view returns (uint256);

    function harvestTrigger(uint256 callCost) external view returns (bool);

    function harvest() external;

    event Harvested(uint256 profit, uint256 loss, uint256 debtPayment, uint256 debtOutstanding);
}

interface VitalsReport {
    function check(
        uint256 profit,
        uint256 loss,
        uint256 debtPayment,
        uint256 debtOutstanding,
        uint256 totalDebt
    ) external view returns (bool);
}

interface SquiddyFee {
    function isBaseFeeSustainable() external view returns (bool);
}

