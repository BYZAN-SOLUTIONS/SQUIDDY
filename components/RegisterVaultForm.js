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
import { vaultFactoryAddress } from "../config";
import VaultFactory from "../artifacts/contracts/VaultFactory.sol/VaultFactory.json";

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
    console.log(name, symbol, asset, strategy);

    const web3Modal = new Web3Modal();
    console.log("web3Modal", web3Modal);
    const connection = await web3Modal.connect();
    console.log("connection", connection);
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log("signer", signer);
    const walletAddress = await signer.getAddress();
    console.log("walletAddress", walletAddress);

    let vaultContract = new ethers.Contract(
      vaultFactoryAddress,
      VaultFactory.abi,
      signer
    );

    let transaction = await vaultContract.buildVault(
      name,
      symbol,
      strategy,
      walletAddress,
      asset
    );

    let tx = await transaction.wait();
    let event = tx.events[0];
    let vaultBeaconProxyAddress = event.args[2];
    console.log("vaultBeaconProxyAddress", vaultBeaconProxyAddress);

    toast({
      position: "top-left",
      title: "Vault Created",
      description: "Vault successfully created.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    onClose();
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
              <option value="0x6B175474E89094C44Da98b954EedeAC495271d0F">
                Dai
              </option>
              <option value="0x514910771AF9Ca656af840dff83E8264EcF986CA">
                Link
              </option>
            </Select>
            {isStrategyError && hasSubmitted && (
              <FormErrorMessage>Underlying asset is required.</FormErrorMessage>
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
