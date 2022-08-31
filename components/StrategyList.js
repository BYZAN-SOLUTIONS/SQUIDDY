import React, { useState, useEffect } from "react";
import { stockStrategies } from "../data";
import {
  Box,
  VStack,
  StackDivider,
  Text,
  Flex,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineCopy, AiOutlineQuestionCircle } from "react-icons/ai";
import copy from "copy-to-clipboard";
import { EtherScanIcon } from "../Icons/EtherScan";

const StrategyList = () => {
  const [strategyBoxElement, setStrategyBoxElement] = useState("");
  const [strategyDescriptionElement, setStrategyDescriptionElement] =
    useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState("");

  useEffect(() => {
    const strategyBox = document.getElementById("strategy-box");
    const strategyDescription = document.getElementById("strategy-description");
    setStrategyBoxElement(strategyBox);
    setStrategyDescriptionElement(strategyDescription);
    strategyDescription.style.display = "none";
  }, []);

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        id="strategy-box"
      >
        {stockStrategies.map((strategy, index) => (
          <Box key={index} m={0} py={2}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text>{strategy.name}</Text>
              <Flex>
                {/* Strategy Description */}
                <Tooltip label="Description" aria-label="Description">
                  <Button
                    onClick={() => {
                      strategyBoxElement.style.display = "none";
                      strategyDescriptionElement.style.display = "block";
                      setSelectedStrategy(strategy.name);
                      setSelectedDescription(strategy.description);
                    }}
                    id="question-btn"
                  >
                    <AiOutlineQuestionCircle />
                  </Button>
                </Tooltip>

                {/* Etherscan */}
                <Tooltip label="Etherscan" aria-label="Etherscan">
                  <Button
                    color="teal.500"
                    mx={2}
                    onClick={() =>
                      window.open(
                        `https://etherscan.io/address/${strategy.contract}`,
                        "_blank"
                      )
                    }
                  >
                    <EtherScanIcon width={20} height={20} />
                  </Button>
                </Tooltip>

                {/* Copy */}
                <Tooltip
                  label={`Copy: ${strategy.contract}`}
                  aria-label="A Copy"
                >
                  <Button
                    onClick={(e) => {
                      copy(e.target.dataset.clipboardText);
                    }}
                    data-clipboard-text={strategy.contract}
                  >
                    <AiOutlineCopy
                      onClick={(e) => {
                        copy(e.target.dataset.clipboardText);
                      }}
                      data-clipboard-text={strategy.contract}
                    />
                  </Button>
                </Tooltip>
              </Flex>
            </Flex>
          </Box>
        ))}
        ;
      </VStack>
      <Box id="strategy-description">
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
          paddingRight={1}
        >
          {selectedStrategy}
        </Text>

        <Text>{selectedDescription}</Text>
        <Flex justifyContent={"end"} pt={2}>
          <Button
            onClick={() => {
              strategyBoxElement.style.display = "block";
              strategyDescriptionElement.style.display = "none";
              setSelectedStrategy("");
              setSelectedDescription("");
            }}
          >
            back
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default StrategyList;
