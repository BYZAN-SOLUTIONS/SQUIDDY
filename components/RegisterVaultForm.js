import React, { useState } from "react";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { initializeProvider } from "@metamask/providers";
import axios from "axios";

const RegisterVaultForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [asset, setAsset] = useState("");
  const [strategy, setStrategy] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isAssetError = asset === "";
  const isNameError = name === "";
  const isSymbolError = symbol === "";
  const isStrategyError = strategy === "";

  const toast = useToast();

  const handleSubmit = async () => {
    setHasSubmitted(true);

    if (name === "" || symbol === "" || asset === "" || strategy === "") {
      return;
    }
    onClose();
    console.log(name, symbol, asset, strategy);
    const isVerified = await checkForVerifiedContract();
    console.log("isVerified", isVerified);

    //confirm the contract is verified on etherscan
    if (!isVerified.SourceCode) {
      toast({
        position: "top-left",
        title: "Strategy Error",
        description: "Contract must be verfied on Etherscan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    toast({
      position: "top-left",
      title: "Vault Created",
      description: "Vault successfully created.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    // const data = { name, symbol, signer };

    // let result = await axios.post(`/api/deploy-contract`, data);
    // console.log("result", result);
  };

  const checkForVerifiedContract = async () => {
    const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${strategy}&apikey=TYZNDM8J4M25PSW75GX8DM3RJUW5YWINPH`;

    //Successfully verified on etherscan (not a strategy)
    //0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413

    const res = await axios.get(url);
    return res.data.result[0];
  };

  return (
    <>
      <Box textAlign="left">
        <form>
          {/*Contract Name*/}
          <FormControl isInvalid={isNameError && hasSubmitted}>
            <FormLabel>Contract Name</FormLabel>
            <Input
              type="text"
              placeholder="BoredApeYachtClub"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {isNameError && hasSubmitted && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>

          {/*Contract Symbol*/}
          <FormControl mt={6} isInvalid={isSymbolError && hasSubmitted}>
            <FormLabel>Contract Symbol</FormLabel>
            <Input
              type="text"
              placeholder="BAYC"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
            {isSymbolError && hasSubmitted && (
              <FormErrorMessage>Symbol is required.</FormErrorMessage>
            )}
          </FormControl>

          {/*Underlying Asset*/}
          <FormControl mt={6} isInvalid={isAssetError && hasSubmitted}>
            <FormLabel>Underlying Asset</FormLabel>
            <Select
              placeholder="Select Asset"
              onChange={(e) => setAsset(e.target.value)}
            >
              <option>Dai</option>
              <option>Link</option>
            </Select>
            {isStrategyError && hasSubmitted && (
              <FormErrorMessage>Underlying ssset is required.</FormErrorMessage>
            )}
          </FormControl>

          {/*Strategy */}
          <FormControl mt={6} isInvalid={isStrategyError && hasSubmitted}>
            <FormLabel>Flashloan Strategy</FormLabel>
            <Input
              type="text"
              placeholder="0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            />
            {isStrategyError && hasSubmitted && (
              <FormErrorMessage>Strategy is required.</FormErrorMessage>
            )}
          </FormControl>

          {/*Submit*/}
          <Button
            width="full"
            my={4}
            onClick={() => {
              handleSubmit();
            }}
          >
            Deploy Contract
          </Button>
        </form>
      </Box>
    </>
  );
};

export default RegisterVaultForm;
