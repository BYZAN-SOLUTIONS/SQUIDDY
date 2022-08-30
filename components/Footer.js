import { Container, IconButton, Text, Flex } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "../components/Logo";

export default function Footer() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "#1F3944",
      }}
    >
      <Container>
        <Logo />
      </Container>
      <Container>
        <Text fontSize="sm" color="white" textAlign={"center"}>
          &copy; {new Date().getFullYear()} Squiddy Inc. All rights reserved.
        </Text>
      </Container>
      <Container variant="ghost" width={"100%"}>
        <Flex justifyContent={"end"}>
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
            mx={2}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
            mx={2}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
            mx={2}
          />
        </Flex>
      </Container>
    </Flex>
  );
}
