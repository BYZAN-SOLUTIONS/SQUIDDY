import {
  Box,
  Flex,
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
import { HiOutlineLightBulb } from "react-icons/hi";
import RegisterVaultModal from "./Modals/RegisterVaultModal";
import StrategyModal from "./Modals/StrategyModal";
import { MdAddModerator } from "react-icons/md";
import { useRecoilState } from "recoil";
import { myVaults } from "../recoil/atoms.js";
export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isCustomVaultOpen,
    onOpen: onCustomVaultOpen,
    onClose: onCustomVaultClose,
  } = useDisclosure();
  const {
    isOpen: isStrategyOpen,
    onOpen: onStrategyOpen,
    onClose: onStrategyClose,
  } = useDisclosure();
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [updateMyVaultsState, setUpdateMyVaultsState] =
    useRecoilState(myVaults);
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

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    onClose();
  };

  const showMyVaults = () => {
    setUpdateMyVaultsState(true);
  };

  const showAllVaults = () => {
    setUpdateMyVaultsState(false);
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
            <Button leftIcon={<FaUserTie />} mx={2} onClick={showMyVaults}>
              My Vaults{" "}
            </Button>
            <Button
              leftIcon={<BsShieldLockFill />}
              mx={2}
              onClick={showAllVaults}
            >
              All Vaults{" "}
            </Button>
            <Button
              leftIcon={<MdAddModerator />}
              onClick={onCustomVaultOpen}
              mx={2}
            >
              Create Custom Vault
            </Button>
            <Button
              leftIcon={<HiOutlineLightBulb />}
              onClick={onStrategyOpen}
              mx={2}
            >
              Strategies
            </Button>
          </Flex>
          <Flex alignItems={"center"}>
            <ConnectButton
              metamaskInstalled={metamaskInstalled}
              connectWalletPressed={connectWalletPressed}
              walletAddress={walletAddress}
            ></ConnectButton>

            <Button leftIcon={<AiOutlineBlock />} mx={2}>
              {networkName}
            </Button>
            <Button onClick={toggleColorMode}>{switchModeIcons()}</Button>
            <h3>{status}</h3>
          </Flex>
        </Flex>
      </Box>
      <RegisterVaultModal
        isOpen={isCustomVaultOpen}
        onClose={onCustomVaultClose}
        handleSubmit={handleSubmit}
      />
      <StrategyModal
        isOpen={isStrategyOpen}
        onClose={onStrategyClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
