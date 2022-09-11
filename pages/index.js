import { useState, useEffect } from "react";
import { Grid, GridItem, Flex, Text, Container } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import VaultCard from "../components/VaultCard";
import Footer from "../components/Footer";
import { useRecoilValue } from "recoil";
import { myVaults } from "../recoil/atoms.js";
import Home from "../styles/Home.module.css";
import { vaultFactoryAddress } from "../config";
import VaultFactory from "../artifacts/contracts/VaultFactory.sol/VaultFactory.json";
import { ethers } from "ethers";

export default function Main() {
  const currentMyVaultsState = useRecoilValue(myVaults);
  const [walletAddress, setWalletAddress] = useState("");
  const [allVaults, setAllVaults] = useState([]);

  //infura goerli
  const provider = new ethers.providers.InfuraProvider(
    "goerli",
    process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
  );
  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    setWalletAddress(walletAddress);
    loadVaults();
  }, []);

  const loadVaults = async () => {
    const vaultContract = new ethers.Contract(
      vaultFactoryAddress,
      VaultFactory.abi,
      provider
    );

    const factoryVaults = await vaultContract.fetchAllVaults();
    setAllVaults(factoryVaults);
    console.log("factoryVaults", factoryVaults);
  };

  const userNotLoggedIn = () => {
    return (
      <div className={Home.container}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          height="100vh"
          width="100vw"
        >
          <Text fontSize="6xl" fontWeight="bold">
            Pick a vault, connect your wallet, and start earning!
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            Squiddy is a decentralized protocol that allows Ethereum users to
            earn yield on their assets by depositing them into a vault.
          </Text>
        </Flex>
      </div>
    );
  };

  const assetIcons = (assetAddress) => {
    switch (assetAddress) {
      case "0x6B175474E89094C44Da98b954EedeAC495271d0F":
        return "/images/dai.png";
      case "0x514910771AF9Ca656af840dff83E8264EcF986CA":
        return "/images/link.png";
      case "0x111111111117dC0aa78b770fA6A738034120C302":
        return "/images/1inch.png";
    }
  };

  const assetNames = (assetAddress) => {
    switch (assetAddress) {
      case "0x6B175474E89094C44Da98b954EedeAC495271d0F":
        return "DAI";
      case "0x514910771AF9Ca656af840dff83E8264EcF986CA":
        return "LINK";
      case "1inch":
        return "/images/1inch.png";
    }
  };

  const vaultTLV = async (vaultAddress) => {
    const SquiddyCore = new ethers.Contract(
      vaultFactoryAddress,
      VaultFactory.abi,
      provider
    );
    const vaultInstance = SquiddyCore.attach(vaultAddress);
    const tlv = await vaultInstance.totalLockedValue();
    return tlv;
  };

  const isOwner = (managerAddress) => {
    const userWallet = localStorage.getItem("walletAddress");
    if (managerAddress.toLowerCase() === userWallet.toLowerCase()) {
      return true;
    }
    return false;
  };

  const filteredVaults = () => {
    const userWallet = localStorage.getItem("walletAddress");
    if (userWallet) {
      const result = allVaults.filter(
        (vault) =>
          vault.managerAddress.toLowerCase() === userWallet.toLowerCase()
      );
      if (result.length > 0) {
        return (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} ml={12}>
            {result.map((vault, index) => (
              <GridItem key={index}>
                <VaultCard
                  key={index}
                  name={vault.name}
                  symbol={vault.symbol}
                  token={assetNames(vault.assetAddress)}
                  icon={assetIcons(vault.assetAddress)}
                  strategy={vault.strategyAddress}
                  manager={vault.managerAddress}
                  tlv={0}
                  assetAddress={vault.assetAddress}
                  isOwner={true}
                  vaultAddress={vault.vaultAddress}
                  index={index}
                />
              </GridItem>
            ))}
          </Grid>
        );
      } else {
        return (
          <Flex justifyContent={"center"} mt={10}>
            <Text fontSize="3xl">You have no vaults</Text>
          </Flex>
        );
      }
    }
  };

  return (
    <>
      <div className={Home.wrapper}>
        <NavBar />
        {!walletAddress ? (
          userNotLoggedIn()
        ) : !currentMyVaultsState ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} ml={12}>
            {allVaults.map((vault, index) => (
              <GridItem key={index}>
                <VaultCard
                  name={vault.name}
                  symbol={vault.symbol}
                  token={assetNames(vault.assetAddress)}
                  icon={assetIcons(vault.assetAddress)}
                  strategy={vault.strategyAddress}
                  manager={vault.managerAddress}
                  tlv={0}
                  assetAddress={vault.assetAddress}
                  isOwner={isOwner(vault.managerAddress)}
                  vaultAddress={vault.vaultAddress}
                  index={index}
                />
              </GridItem>
            ))}
          </Grid>
        ) : (
          filteredVaults()
        )}
      </div>
      <Footer />
    </>
  );
}
