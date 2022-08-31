import React, { useState } from "react";
import { stockStrategies } from "../data";
import {
  Box,
  VStack,
  StackDivider,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { AiOutlineCopy } from "react-icons/ai";
import copy from "copy-to-clipboard";

const StrategyList = () => {
  const trimAddress = (address) => {
    return address.slice(0, 5) + "..." + address.slice(-4);
  };

  const copyStrategy = (e) => {
    console.log(e.target.id);
    copy(e.target.id);
  };

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {stockStrategies.map((strategy, index) => (
        <Box key={index} m={0} py={2}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text>{strategy.name}</Text>
            <Flex>
              <Button
                color="teal.500"
                width={"8rem"}
                onClick={() =>
                  window.open(
                    `https://etherscan.io/address/${strategy.contract}`,
                    "_blank"
                  )
                }
              >
                {trimAddress(strategy.contract)}
              </Button>

              <Button
                ml={2}
                onClick={(e) => {
                  copyStrategy(e);
                }}
                id={strategy.contract}
              >
                <AiOutlineCopy />
              </Button>
            </Flex>
          </Flex>
        </Box>
      ))}
      ;
    </VStack>
  );
};

export default StrategyList;
