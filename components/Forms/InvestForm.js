import React, { useState } from "react";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormErrorMessage,
  useToast,
  Spinner,
  Text,
  Container,
} from "@chakra-ui/react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { vaultFactoryAddress } from "../../config";
import VaultFactory from "../../artifacts/contracts/VaultFactory.sol/VaultFactory.json";

const InvestForm = ({ onClose, botStrategy }) => {
  const [value, setValue] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValueError = value === "";

  const toast = useToast();

  const handleSubmit = async () => {
    console.log("handleSubmit");
    // setHasSubmitted(true);

    // if (value === "") {
    //   return;
    // }

    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const walletAddress = await signer.getAddress();

    // let vaultContract = new ethers.Contract(
    //   vaultFactoryAddress,
    //   VaultFactory.abi,
    //   signer
    // );

    // let transaction = await vaultContract.buildVault(
    //   name,
    //   symbol,
    //   strategy,
    //   walletAddress,
    //   asset,
    //   getDecimals(asset)
    // );

    // setIsLoading(true);
    // await transaction.wait();
    // onClose();
    // setIsLoading(false);

    // toast({
    //   position: "top-left",
    //   title: "Vault Created",
    //   description: "Investment successfully deposited.",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
  };

  return (
    <>
      {isLoading ? (
        <Container maxW="2xl" centerContent paddingBottom={4}>
          <Text fontSize="3xl" paddingBottom={4}>
            Transaction in progress...
          </Text>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Container>
      ) : (
        <Box textAlign="left">
          <form>
            <FormControl isInvalid={isValueError && hasSubmitted}>
              <FormLabel>{`Flashbot strategy: ${botStrategy}`}</FormLabel>
              <Input
                type="text"
                placeholder="Deposit Amount"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {isValueError && hasSubmitted && (
                <FormErrorMessage>Value is required.</FormErrorMessage>
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
              Deposit
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default InvestForm;
