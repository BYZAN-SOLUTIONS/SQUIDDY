import {
  Container,
  IconButton,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Avatar,
} from "@chakra-ui/react";
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
          {/* LinkedIn */}
          <Popover>
            <PopoverTrigger>
              <IconButton
                as="a"
                href="#"
                aria-label="LinkedIn"
                icon={<FaLinkedin fontSize="1.25rem" />}
                mx={2}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Flex alignItems={"center"}>
                  <FaLinkedin fontSize="1.25rem" />
                  <Text pl={2}>LinkedIn</Text>
                </Flex>
              </PopoverHeader>
              <PopoverHeader>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/in/conor-gallagher-182955213/`,
                      "_blank"
                    )
                  }
                >
                  <Avatar
                    size="md"
                    name="Conor Gallagher"
                    mr={2}
                    src="https://media-exp1.licdn.com/dms/image/C4D03AQF7GMWOXZoujA/profile-displayphoto-shrink_800_800/0/1661183112550?e=1667433600&v=beta&t=APlLn0jvDCegOjDofEe-rg10PtQVEJqiCc-BdwmeKGw"
                  />{" "}
                  Conor Gallagher
                </Flex>
              </PopoverHeader>
              <PopoverHeader>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/in/jason-schwarz-75b91482/`,
                      "_blank"
                    )
                  }
                >
                  <Avatar
                    size="md"
                    name="Jason Schwarz"
                    mr={2}
                    src="https://media-exp1.licdn.com/dms/image/C4E03AQH3b5e91FbDwg/profile-displayphoto-shrink_800_800/0/1650844151671?e=1667433600&v=beta&t=Yw7zxvqw_MYQhw1cTA32mKjxPRGJMmM5K6JxcXzqpFE"
                  />
                  Jason Schwarz
                </Flex>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          {/* Github */}
          <Popover>
            <PopoverTrigger>
              <IconButton
                as="a"
                href="#"
                aria-label="GitHub"
                icon={<FaGithub fontSize="1.25rem" />}
                mx={2}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Flex alignItems={"center"}>
                  <FaGithub fontSize="1.25rem" />
                  <Text pl={2}>Github</Text>
                </Flex>
              </PopoverHeader>

              <PopoverHeader>
                <Flex alignItems={"center"}>
                  <Text pl={2}>Project</Text>
                </Flex>
              </PopoverHeader>
              <PopoverHeader>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() =>
                    window.open(
                      `https://github.com/BYZAN-SOLUTIONS/encode_mev_hack`,
                      "_blank"
                    )
                  }
                >
                  <Avatar
                    size="md"
                    name="squiddy"
                    mr={2}
                    src="/images/squiddy-bg.png"
                  />{" "}
                  Squiddy
                </Flex>
              </PopoverHeader>

              <PopoverHeader>
                <Flex alignItems={"center"}>
                  <Text pl={2}>Developers</Text>
                </Flex>
              </PopoverHeader>

              <PopoverHeader>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() =>
                    window.open(`https://github.com/BYZAN-SOLUTIONS`, "_blank")
                  }
                >
                  <Avatar
                    size="md"
                    name="BYZAN-SOLUTIONS"
                    mr={2}
                    src="https://avatars.githubusercontent.com/u/102080035?s=200&v=4"
                  />{" "}
                  BYZAN-SOLUTIONS
                </Flex>
              </PopoverHeader>
              <PopoverHeader>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() =>
                    window.open(`https://github.com/passandscore`, "_blank")
                  }
                >
                  <Avatar
                    size="md"
                    name="passandscore"
                    mr={2}
                    src="https://avatars.githubusercontent.com/u/71670015?v=4"
                  />
                  passandscore
                </Flex>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          {/* Twitter */}
          <Popover>
            <PopoverTrigger>
              <IconButton
                as="a"
                href="#"
                aria-label="Twitter"
                icon={<FaTwitter fontSize="1.25rem" />}
                mx={2}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>
                <Flex alignItems={"center"}>
                  <FaLinkedin fontSize="1.25rem" />
                  <Text pl={2}>Twitter</Text>
                </Flex>
              </PopoverHeader>
              {/* <PopoverHeader>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/in/conor-gallagher-182955213/`,
                      "_blank"
                    )
                  }
                >
                  <Avatar
                    size="md"
                    name="Conor Gallagher"
                    mr={2}
                    src="https://media-exp1.licdn.com/dms/image/C4D03AQF7GMWOXZoujA/profile-displayphoto-shrink_800_800/0/1661183112550?e=1667433600&v=beta&t=APlLn0jvDCegOjDofEe-rg10PtQVEJqiCc-BdwmeKGw"
                  />{" "}
                  Conor Gallagher
                </Flex>
              </PopoverHeader> */}
              <PopoverHeader>
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  onClick={() =>
                    window.open(`https://twitter.com/passandscore`, "_blank")
                  }
                >
                  <Avatar
                    size="md"
                    name="Jason Schwarz"
                    mr={2}
                    src="https://pbs.twimg.com/profile_images/1518377329306783747/Ra6f8mU9_400x400.jpg"
                  />
                  Jason Schwarz
                </Flex>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </Flex>
      </Container>
    </Flex>
  );
}
