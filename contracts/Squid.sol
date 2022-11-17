// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import { IERC20 } from "./interfaces/IERC20.sol";
import { SafeTransferLib } from "@rari-capital/solmate/src/utils/SafeTransferLib.sol";
import "./interfaces/OneSplitAudit.sol";
import "./interfaces/IStrategy.sol";
import "./interfaces/Converter.sol";

contract Squiddy {
    address public vaultManager;

    address public onesplit;
    address public rewards;
    mapping(address => address) public vaults;
    mapping(address => address) public strategies;
    mapping(address => mapping(address => address)) public converters;

    mapping(address => mapping(address => bool)) public approvedStrategies;

    uint256 public split = 500;
    uint256 public constant max = 10000;

    constructor(address _rewards) {
        vaultManager = msg.sender;
        onesplit = address(0x50FDA034C0Ce7a8f7EFDAebDA7Aa7cA21CC1267e);
        rewards = _rewards;
    }

    function setRewards(address _rewards) public {
        require(msg.sender == vaultManager, "!vaultManager");
        rewards = _rewards;
    }

    function setSplit(uint256 _split) public {
        require(msg.sender == vaultManager, "!vaultManager");
        split = _split;
    }

    function setOneSplit(address _onesplit) public {
        require(msg.sender == vaultManager, "!vaultManager");
        onesplit = _onesplit;
    }


    function setVault(address _token, address _vault) public {
        require( msg.sender == vaultManager, "!vaultManager");
        require(vaults[_token] == address(0), "vault");
        vaults[_token] = _vault;
    }

    function approveStrategy(address _token, address _strategy) public {
        require(msg.sender == vaultManager, "!vaultManager");
        approvedStrategies[_token][_strategy] = true;
    }

    function revokeStrategy(address _token, address _strategy) public {
        require(msg.sender == vaultManager, "!vaultManager");
        approvedStrategies[_token][_strategy] = false;
    }

    function setConverter(
        address _input,
        address _output,
        address _converter
    ) public {
        require( msg.sender == vaultManager, "!vaultManager");
        converters[_input][_output] = _converter;
    }

    function setStrategy(address _token, address _strategy) public {
        require(msg.sender == vaultManager, "!vaultManager");
        require(approvedStrategies[_token][_strategy] == true, "!approved");

        address _current = strategies[_token];
        if (_current != address(0)) {
            Strategy(_current).withdrawAll();
        }
        strategies[_token] = _strategy;
    }

    function earn(address _token, uint256 _amount) public {
        address _strategy = strategies[_token];
        address _want = Strategy(_strategy).want();
        if (_want != _token) {
            address converter = converters[_token][_want];
            IERC20(_token).transfer(converter, _amount);
            _amount = Converter(converter).convert(_strategy);
            IERC20(_want).transfer(_strategy, _amount);
        } else {
            IERC20(_token).transfer(_strategy, _amount);
            Strategy(_strategy).deposit();
        }
    }

    function balanceOf(address _token) external view returns (uint256) {
        return Strategy(strategies[_token]).balanceOf();
    }

    function withdrawAll(address _token) public {
        require( msg.sender == vaultManager, "!vaultManager");
        Strategy(strategies[_token]).withdrawAll();
    }

    function inCaseTokensGetStuck(address _token, uint256 _amount) public {
        require( msg.sender == vaultManager, "!vaultManager");
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function inCaseStrategyTokenGetStuck(address _strategy, address _token) public {
        require( msg.sender == vaultManager, "!vaultManager");
        Strategy(_strategy).withdraw(_token);
    }

    function getExpectedReturn(
        address _strategy,
        address _token,
        uint256 parts
    ) public view returns (uint256 expected) {
        uint256 _balance = IERC20(_token).balanceOf(_strategy);
        address _want = Strategy(_strategy).want();
        (expected, ) = OneSplitAudit(onesplit).getExpectedReturn(_token, _want, _balance, parts, 0);
    }

    // Only allows to withdraw non-core strategy tokens 
    function searcher(
        address _strategy,
        address _token,
        uint256 parts
    ) public {
        require(msg.sender == vaultManager, "!vaultManager");
        // This contract should never have value in it, but just incase since this is a public call
        uint256 _before = IERC20(_token).balanceOf(address(this));
        Strategy(_strategy).withdraw(_token);
        uint256 _after = IERC20(_token).balanceOf(address(this));
            if (_after > _before) {
                _amount = _after - _before;
                uint256 _reward = (_amount * split) / max;
                earn(_want, _amount - _reward);
                IERC20(_want).transfer(rewards, _reward);
            }
        }
    }

    function withdraw(address _token, uint256 _amount) public {
        require(msg.sender == vaults[_token], "!vault");
        Strategy(strategies[_token]).withdraw(_amount);
    }
}