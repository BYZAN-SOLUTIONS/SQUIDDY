import {
  Box,
  Flex,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Container,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ConnectButton from "./ConnectButton";
import {
  connectWallet,
  getCurrentWalletConnected,
  getNetworkName,
} from "../utils/interact.js";
import Image from "next/image";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { BsShieldLockFill } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineBlock } from "react-icons/ai";
import RegisterVaultModal from "../components/RegisterVaultModal";
import { MdAddModerator } from "react-icons/md";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  useEffect(() => {
    async function getWallet() {
      const { address, status } = await getCurrentWalletConnected();

      setWallet(address);
      localStorage.setItem("walletAddress", address);
      setStatus(status);
      const networkName = await getNetworkName();
      setNetworkName(networkName);
      addWalletListener();
    }

    getWallet();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      setMetamaskInstalled(true);

      window.ethereum.on("chainChanged", async () => {
        const networkName = await getNetworkName();
        setNetworkName(networkName);
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
          window.location.reload();
        } else {
          setWallet("");
          setStatus("");
          localStorage.removeItem("walletAddress");
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
    localStorage.setItem("walletAddress", walletResponse.address);
  };

  const switchModeIcons = () => {
    if (colorMode === "light") {
      return (
        <Container>
          <BsFillMoonFill />
        </Container>
      );
    } else {
      return (
        <Container>
          <BsFillSunFill />
        </Container>
      );
    }
  };

  const metamaskWindow = async () => {
    console.log("metamask window");
    await window.ethereum.enable();
  };

  return (
    <>
      <Box bg={useColorModeValue("grey.100", "black.900")} p={6}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Image
            src={"/images/Squiddy-bg.png"}
            alt="Loader"
            width="75"
            height="75"
          />

          <Flex marginLeft="10rem">
            <Button leftIcon={<FaUserTie />} mx={2}>
              My Vaults{" "}
            </Button>
            <Button leftIcon={<BsShieldLockFill />} mx={2}>
              Vaults{" "}
            </Button>
            <Button leftIcon={<MdAddModerator />} onClick={onOpen} mx={2}>
              Create Custom Vault
            </Button>
          </Flex>
          <Flex alignItems={"center"}>
            <ConnectButton
              metamaskInstalled={metamaskInstalled}
              connectWalletPressed={connectWalletPressed}
              walletAddress={walletAddress}
            ></ConnectButton>

            <Button
              leftIcon={<AiOutlineBlock />}
              onClick={metamaskWindow}
              mx={2}
            >
              {networkName}
            </Button>
            <Button onClick={toggleColorMode}>{switchModeIcons()}</Button>
            <h3>{status}</h3>
          </Flex>
        </Flex>
      </Box>
      <RegisterVaultModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
