// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.8;
import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {Strategy, SquidAPI, StrategyAPI, VitalsReport, SquiddyFee} from "./SquidInterface.sol";


contract SquiddyVault is ERC4626 {
        constructor(address _token,
                string memory vName,
                string memory vSymbol
                )
    ERC4626(IERC20Metadata(_token)) ERC20(vName, vSymbol) { 
    }

}

