// import { Box, Flex, Heading } from "@chakra-ui/react";
// import styles from "/styles/Home.module.css";
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const Faucet_Card = () => {
//   const innerBoxStyles = {
//     alignItems: "left",
//     justifyContent: "center",
//     textAlign: "left",
//     color: "#cff9e0",
//     textShadow: "0 1 4px black",
//     fontSize: "20px",
//     shadow: "0px 5px 10px rgba(4, 4, 4, 4)",
//     border: ".5px",
//     borderColor: "#C3CDDA",
//     boxSize: "300px",
//     w: "100%",
//     borderRadius: "0.5 0.5 0 0",
//   };

//   return (
//     <div>
//       <Box sx={innerBoxStyles} backdropFilter="auto" backdropBlur="15px">
//         <Flex
//           justifyContent="start"
//           alignItems="start"
//           bg="linear-gradient(to right,  #212121 0%, #383838 100%) "
//           className={styles.miniHead}
//         ></Flex>
//         <Heading
//           as="h1"
//           size="md"
//           color="#cff9e0"
//           textShadow="0 1 4px black"
//           fontSize="20px"
//         >
//           A simple faucet.
//         </Heading>
//       </Box>
//     </div>
//   );
// };

// export default Faucet_Card;

import React from "react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
} from "@chakra-ui/react";

function VaultCard(props) {
  const { name, symbol, token } = props;
  console.log("VaultCard", props.name);

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
    >
      <AspectRatio ratio={1 / 1}>
        <Image
          maxWidth="200px"
          margin="auto"
          src="https://picsum.photos/id/237/250/250"
          alt="Woman paying for a purchase"
        />
      </AspectRatio>
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          {name}
        </Text>
        <Link
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
          href="#"
        >
          {symbol}
        </Link>
        <Text my={2} color="gray.500">
          {token}
        </Text>
        <Button maxWidth="100px" my={2}>
          Click me!
        </Button>
      </Stack>
    </Box>
  );
}

export default VaultCard;
