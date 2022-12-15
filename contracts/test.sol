    // SPDX-License-Identifier: MIT
    pragma solidity >=0.7.0 <0.9.0;
    contract Test {

    struct mStruct {
        string message;
        address sender;
        uint balance;
    }

    function testmeEncode() public pure returns(bytes32) {

        mStruct memory message = mStruct("Receiver closing signature", 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c, 100);
        return keccak256(abi.encode(message.message, message.sender, message.balance));
    }

    function testmeDecode(bytes32 _hash) public pure returns(mStruct memory) {
        mStruct memory message;
        (message.message, message.sender, message.balance) = abi.decode(abi.encodePacked(_hash), (string, address, uint));
        return message;
    }

    function testmeEncodePacked() public pure returns(bytes32) {

        mStruct memory message = mStruct("Receiver closing signature", 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c, 100);
        return keccak256(abi.encodePacked(message.message, message.sender, message.balance));
    }

    function testmeDecodePacked(bytes32 _hash) public pure returns(mStruct memory) {
        mStruct memory message;
        (message.message, message.sender, message.balance) = abi.decode(abi.encodePacked(_hash), (string, address, uint));
        return message;
    }

   
}  