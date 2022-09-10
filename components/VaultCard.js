import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Stack,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import VaultCards from "../styles/VaultCards.module.css";

function VaultCard(props) {
  const [hideStrategy, setHideStrategy] = useState(false);
  const {
    name,
    symbol,
    token,
    icon,
    strategy,
    manager,
    tlv,
    assetAddress,
    isOwner,
  } = props;

  const trimAddress = (address) => {
    if (address) {
      return address?.slice(0, 5) + "..." + address.slice(-4);
    }
  };

  const handleStrategyClick = (e) => {
    console.log(e);
  };

  const handleInvestClick = async (e) => {
    console.log(e);
  };

  const strategyName = (strategyAddress) => {
    if (strategyAddress) {
      switch (strategyAddress) {
        case "0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0":
          return "JuicyBottle";
        case "0x6B175474E89094C44Da98b954EedeAC495271d0F":
          return "EnchantedTurkey";
      }
    }
  };

  const strategyDescription = (strategyAddress) => {
    if (strategyAddress) {
      switch (strategyAddress) {
        case "0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0":
          return "The flashloan bot gets the prices of each Uniswap fork and implements flashloan when it finds an arbitrage opportunity.";
        case "0x6B175474E89094C44Da98b954EedeAC495271d0F":
          return "The flashloan bot gets the prices of each Uniswap fork and implements flashloan when it finds an arbitrage opportunity.";
      }
    }
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
          className={VaultCards.button}
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

        {/* Total Locked Value */}
        <Box
          p={4}
          display={{ md: "flex" }}
          width="23rem"
          borderWidth={1}
          margin={2}
          className={VaultCards.button}
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

        {/* Underlying Asset */}
        <Box
          p={4}
          display={{ md: "flex" }}
          width="23rem"
          borderWidth={1}
          margin={2}
          className={VaultCards.button}
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

        {/* Strategy Details */}
        <Container width={"70%"} pl={0}>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="wide"
            color="teal.600"
            paddingRight={2}
          >
            Strategy Details:
          </Text>
        </Container>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {strategyName(strategy)}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text
                fontWeight="hairline"
                fontSize="sm"
                letterSpacing="wide"
                paddingRight={2}
              >
                {strategyDescription(strategy)}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* Buttons */}
        <Button my={2} py={2} hidden={isOwner} onClick={handleInvestClick}>
          Invest
        </Button>
      </Stack>
    </Box>
  );
}

export default VaultCard;
