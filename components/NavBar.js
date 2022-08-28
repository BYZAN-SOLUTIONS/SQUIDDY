import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ConnectButton from "./ConnectButton";
import {
  connectWallet,
  getCurrentWalletConnected,
  getNetworkName,
} from "../pages/utils/interact.js";
import Image from "next/image";

const NavLink = ({ title, href }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {title}
  </Link>
);

const links = [
  { name: "Vaults", href: "/" },
  { name: "My Vaults", href: "/my-vaults" },
  { name: "Create Vault", href: "/create-vault" },
  // { name: "View Collection", href: "/view-collection" },
];

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [chainId, setChainId] = useState("");
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  useEffect(() => {
    async function getWallet() {
      const { address, status } = await getCurrentWalletConnected();

      setWallet(address);
      setStatus(status);
      const networkName = await getNetworkName();
      setChainId(networkName);
      addWalletListener();
    }

    getWallet();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      setMetamaskInstalled(true);

      window.ethereum.on("chainChanged", async () => {
        const networkName = await getNetworkName();
        setChainId(networkName);
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          window.location.reload();
        } else {
          setWallet("");
          setStatus("");
          window.location.reload();
        }
      });
    } else {
      setMetamaskInstalled(false);

      setStatus(
        <p>
          {" "}
          🦊 You must install Metamask.{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://metamask.io/download.html"
          >
            Download
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Image
            src={"/squidradient.png"}
            alt="Loader"
            width="200"
            height="100"
          />
          <Box>
            {links.map((link, index) => (
              <NavLink key={index} href={link.href} title={link.name} />
            ))}
          </Box>

          <Flex alignItems={"center"}>
            <ConnectButton
              metamaskInstalled={metamaskInstalled}
              connectWalletPressed={connectWalletPressed}
              walletAddress={walletAddress}
            ></ConnectButton>
            <h3>{status}</h3>
            {/* <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <MenuDivider />
                  <MenuItem>Connect Wallet</MenuItem>
                  <MenuItem>Donate</MenuItem>
                </MenuList>
              </Menu>
            </Stack> */}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
