import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Stack,
  Container,
  Spacer,
} from "@chakra-ui/react";
import VaultCards from "../styles/VaultCards.module.css";

function VaultCard(props) {
  const { name, symbol, token, icon, strategy, manager, tlv, assetAddress } =
    props;

  const trimAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-3);
  };

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      width="25rem"
      borderWidth={1}
      margin={2}
      borderRadius={8}
      className={VaultCards.card}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
      >
        {/* Vault Name & Symbol */}
        <Flex alignItems={"center"}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
            color="teal.600"
            paddingRight={1}
          >
            {name}
          </Text>

          <Text
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
          >
            {`(${symbol})`}
          </Text>
        </Flex>
        {/* Vault Manager Address */}
        <Box
          p={4}
          display={{ md: "flex" }}
          width="23rem"
          borderWidth={1}
          margin={2}
          borderRadius={8}
          onClick={() =>
            window.open(`https://etherscan.io/address/${manager}`, "_blank")
          }
          cursor="pointer"
        >
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
            paddingRight={2}
            width={"50%"}
          >
            Vault Manager:
          </Text>

          <Text
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
            width={"50%"}
            textAlign={"right"}
          >
            {trimAddress(manager)}
          </Text>
        </Box>

        <Box
          p={4}
          display={{ md: "flex" }}
          width="23rem"
          borderWidth={1}
          margin={2}
          borderRadius={8}
          onClick={() =>
            window.open(`https://etherscan.io/address/${manager}`, "_blank")
          }
          cursor="pointer"
        >
          <>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color="teal.600"
              paddingRight={2}
              width={"60%"}
            >
              Total Locked Value:
            </Text>
            <Text
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color="teal.600"
              width={"40%"}
              textAlign={"right"}
            >
              {tlv}
            </Text>
          </>
        </Box>
        <Box
          p={4}
          display={{ md: "flex" }}
          width="23rem"
          borderWidth={1}
          margin={2}
          borderRadius={8}
          alignItems={"center"}
          onClick={() =>
            window.open(
              `https://etherscan.io/address/${assetAddress}`,
              "_blank"
            )
          }
          cursor="pointer"
          zIndex={1}
        >
          <Container width={"70%"} pl={0}>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color="teal.600"
              paddingRight={2}
            >
              Underlying Asset:
            </Text>
          </Container>

          <Container width={"30%"} textAlign={"center"}>
            <Flex pr={0}>
              <Text m={2} color="gray.500">
                {token}
              </Text>
              <Image
                maxWidth="200px"
                margin="auto"
                src={icon}
                alt="icon"
                pr={0}
              />
            </Flex>
          </Container>
        </Box>

        {/* Buttons */}
        <Flex>
          <Button py={2} my={2} onClick={() => window.open(strategy, "_blank")}>
            Strategy
          </Button>
          <Spacer />

          <Button my={2} py={2}>
            Select
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}

export default VaultCard;
