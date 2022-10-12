//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

contract SquiddyVault is ERC4626 {

    constructor(address _token,
                string memory vName,
                string memory vSymbol
                )
    ERC4626(IERC20Metadata(_token)) ERC20(vName, vSymbol) {        
    }

}