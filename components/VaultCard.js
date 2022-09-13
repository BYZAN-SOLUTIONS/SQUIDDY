import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Stack,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import VaultCards from "../styles/VaultCards.module.css";
import { EtherScanIcon } from "../Icons/EtherScan";
import { stats } from "../Icons/Stats";
import { info } from "../Icons/Info";
import { ImStatsDots } from "react-icons/im";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { strategyStats } from "../data";
import InvestModal from "./Modals/InvestModal";

function VaultCard(props) {
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
    vaultAddress,
    index,
  } = props;
  const [vaultName, setVaultName] = useState("");
  const [tokenIcon, setTokenIcon] = useState("");
  const [botStrategy, setBotStrategy] = useState("");

  const {
    isOpen: isInvestOpen,
    onOpen: onInvestOpen,
    onClose: onInvestClose,
  } = useDisclosure();

  const trimAddress = (address) => {
    if (address) {
      return address?.slice(0, 5) + "..." + address.slice(-4);
    }
  };

  const handleStrategyClick = (e) => {
    console.log(e);
  };

  const handleInvestClick = (name, icon, strategy) => {
    console.log("Invest Clicked");
    setVaultName(name);
    setTokenIcon(icon);
    setBotStrategy(strategy);
    onInvestOpen();
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

  const handleCardFlip = (e) => {
    e.preventDefault();
    const innerCard = document.getElementById(index);
    const flipbutton = document.getElementById("flipbutton" + index);
    if (innerCard.style.transform === "") {
      flipbutton.innerHTML = info;
      innerCard.style.transform = "rotateY(180deg)";
    } else {
      innerCard.style.transform = "";
      flipbutton.innerHTML = stats;
    }
  };

  return (
    <>
      {/* Invest Modal */}
      <InvestModal
        isOpen={isInvestOpen}
        onClose={onInvestClose}
        vaultName={vaultName}
        tokenIcon={tokenIcon}
        botStrategy={botStrategy}
      />
      <Container>
        {/* Vault Name & Symbol */}
        <Container padding={2}>
          <Flex
            alignItems={"center"}
            textAlign={{ base: "center", md: "left" }}
            justify={"space-between"}
          >
            <Box>
              <Flex
                alignItems={"center"}
                textAlign={{ base: "center", md: "left" }}
              >
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
            </Box>
            <Button
              id={`flipbutton${index}`}
              marginRight={6}
              onClick={(e, index) => {
                handleCardFlip(e, index);
              }}
            >
              <ImStatsDots />
            </Button>
          </Flex>
        </Container>
        <div className={VaultCards.flipcard}>
          <div className={VaultCards.flipcardinner} id={index}>
            <div className={VaultCards.flipcardfront}>
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
                  {/* Vault Contract */}
                  <Box
                    p={4}
                    display={{ md: "flex" }}
                    width="23rem"
                    borderWidth={1}
                    className={VaultCards.button}
                    onClick={() =>
                      window.open(
                        `https://goerli.etherscan.io/address/${vaultAddress}`,
                        "_blank"
                      )
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
                      Contract:
                    </Text>

                    <Text
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="teal.600"
                      width={"50%"}
                      textAlign={"right"}
                    >
                      {trimAddress(vaultAddress)}
                    </Text>
                  </Box>

                  {/* Vault Manager Address */}
                  <Box
                    p={4}
                    display={{ md: "flex" }}
                    width="23rem"
                    borderWidth={1}
                    margin={2}
                    cursor="pointer"
                    className={VaultCards.button}
                    onClick={() =>
                      window.open(
                        `https://goerli.etherscan.io/address/${manager}`,
                        "_blank"
                      )
                    }
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
                      Manager:
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
                      window.open(
                        `https://etherscan.io/address/${manager}`,
                        "_blank"
                      )
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
                        `https://goerli.etherscan.io/address/${assetAddress}`,
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

                  {/* Invest Button */}
                  <Container margin={0}>
                    <Flex justify="end">
                      <Button
                        color={"gray.500"}
                        variant="outline"
                        left="14px"
                        id={`flipbutton${index}`}
                        onClick={() => {
                          handleInvestClick(name, icon, strategyName(strategy));
                        }}
                        marginTop={1}
                      >
                        Invest
                      </Button>
                    </Flex>
                  </Container>
                </Stack>
              </Box>
            </div>

            <div className={VaultCards.flipcardback}>
              <Box
                p={4}
                display={{ md: "flex" }}
                width="25rem"
                borderWidth={1}
                margin={2}
                height="100%"
                borderRadius={8}
                className={VaultCards.card}
              >
                <Stack
                  align={{ base: "center", md: "stretch" }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  {/* Bot Stats */}
                  <Box
                    p={4}
                    display={{ md: "flex" }}
                    width="23rem"
                    borderWidth={1}
                    className={VaultCards.button}
                    onClick={() =>
                      window.open(
                        `https://goerli.etherscan.io/address/${strategy}`,
                        "_blank"
                      )
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
                      Strategy:
                    </Text>

                    <Text
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="teal.600"
                      width={"50%"}
                      textAlign={"right"}
                      paddingRight={2}
                    >
                      {strategyName(strategy)}
                    </Text>
                    <EtherScanIcon width={25} height={25} />
                  </Box>
                  <Text
                    fontWeight={"bold"}
                    paddingBottom={0}
                    color={"gray.500"}
                  >
                    Performance Overview:
                  </Text>
                  <Box
                    paddingRight={2}
                    display={{ md: "flex" }}
                    justifyContent={"end"}
                  >
                    <Box>
                      {strategyStats.map((stat, index) => {
                        return (
                          <Stack
                            direction={"row"}
                            align={"center"}
                            key={index}
                            paddingY={2}
                            justify={"end"}
                          >
                            <Text
                              fontWeight="bold"
                              textTransform="uppercase"
                              fontSize="sm"
                              letterSpacing="wide"
                              color="teal.600"
                              paddingRight={2}
                              textAlign={"center"}
                            >
                              {stat.duration}
                            </Text>

                            <Button
                              leftIcon={<ImStatsDots />}
                              colorScheme={stat.color}
                              width={"7rem"}
                            >
                              {stat.percentage}
                            </Button>
                            <Button
                              leftIcon={
                                <Image
                                  maxWidth="20px"
                                  src={icon}
                                  alt="icon"
                                  m={0}
                                />
                              }
                              colorScheme={stat.color}
                              width={"6rem"}
                            >
                              {stat.value}
                            </Button>
                            <Button
                              id={`statsArrow${index}`}
                              colorScheme={stat.color}
                            >
                              {stat.color === "green" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              )}
                            </Button>
                          </Stack>
                        );
                      })}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default VaultCard;
