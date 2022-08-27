import React, { useState } from "react";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { initializeProvider } from "@metamask/providers";

const CreateContract = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  // const providerOptions = {
  //   walletconnect: {
  //     package: MetaMaskProvider,
  //     options: {
  //       infuraId: `https://rinkeby.infura.io/v3/3866064be23a4f38b9ea22b19b01ac13`,
  //     },
  //   },
  // };

  // Create a stream to a remote provider:
  // const metamaskStream = new LocalMessageDuplexStream({
  //   name: "inpage",
  //   target: "contentscript",
  // });

  // this will initialize the provider and set it as window.ethereum
  // initializeProvider({
  //   connectionStream: metamaskStream,
  // });

  const handleSubmit = async () => {
    console.log("handleSubmit");
    // const web3modal = new Web3Modal();
    // console.log("web3modal", web3modal);
    // const connection = await web3modal.connect();
    // console.log("connection", connection);
    // const provider = new ethers.providers.Web3Provider(connection);
    // console.log("provider", provider);
    // const signer = provider.getSigner();
    // console.log("signer", signer);

    const web3Modal = new Web3Modal(
      initializeProvider({
        connectionStream: metamaskStream,
      })
    );
    console.log("web3Modal", web3Modal);
    const instance = await web3Modal.connect();
    console.log("instance", instance);
    const provider = new ethers.providers.Web3Provider(instance);
    console.log("provider", provider);
    const signer = provider.getSigner();
    console.log("signer", signer);

    console.log("handleSubmit", name, symbol);
    const data = { name, symbol, signer };

    let result = await axios.post(`/api/deploy-contract`, data);
    console.log("result", result);
  };

  return (
    <>
      <NavBar />
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Deploy ERC721 Contract</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Contract Name</FormLabel>
                <Input
                  type="text"
                  placeholder="BoredApeYachtClub"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Contract Symbol</FormLabel>
                <Input
                  type="text"
                  placeholder="BAYC"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </FormControl>
              <Button
                width="full"
                mt={4}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Deploy Contract
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default CreateContract;
