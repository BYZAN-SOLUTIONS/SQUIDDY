import { stockStrategies } from "../data";
import {
  Box,
  VStack,
  StackDivider,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

const StrategyList = () => {
  const trimAddress = (address) => {
    return address.slice(0, 5) + "..." + address.slice(-4);
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
          </Flex>
        </Box>
      ))}
      ;
    </VStack>
  );
};

export default StrategyList;
