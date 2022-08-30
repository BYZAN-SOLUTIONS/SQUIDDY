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
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { initializeProvider } from "@metamask/providers";

const RegisterVaultForm = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [asset, setAsset] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    setHasSubmitted(true);

    if (name === "" || symbol === "" || asset === "") {
      return;
    }

    // const data = { name, symbol, signer };

    // let result = await axios.post(`/api/deploy-contract`, data);
    // console.log("result", result);
  };

  const isAssetError = asset === "";
  const isNameError = name === "";
  const isSymbolError = symbol === "";

  return (
    <>
      <Box textAlign="left">
        <form>
          <FormControl isInvalid={isNameError && hasSubmitted}>
            <FormLabel>Contract Name</FormLabel>
            <Input
              type="text"
              placeholder="BoredApeYachtClub"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isNameError && hasSubmitted && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={6} isInvalid={isSymbolError && hasSubmitted}>
            <FormLabel>Contract Symbol</FormLabel>
            <Input
              type="text"
              placeholder="BAYC"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
            {!isSymbolError && hasSubmitted && (
              <FormErrorMessage>Symbol is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mt={6} isInvalid={isAssetError && hasSubmitted}>
            <FormLabel>Underlying Asset</FormLabel>
            <Select
              placeholder="Select Asset"
              onChange={(e) => setAsset(e.target.value)}
            >
              <option>Dai</option>
              <option>Link</option>
            </Select>
            {!isAssetError && hasSubmitted && (
              <FormHelperText>
                Select the Underlying asset for your vault contract.
              </FormHelperText>
            )}
          </FormControl>
          {/* <Button
              width="full"
              mt={4}
              onClick={() => {
                handleSubmit();
              }}
            >
              Deploy Contract
            </Button> */}
        </form>
      </Box>
    </>
  );
};

export default RegisterVaultForm;
