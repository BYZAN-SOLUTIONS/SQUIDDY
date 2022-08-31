import { Grid, GridItem, Flex, Text, Container } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import VaultCard from "../components/VaultCard";
import { vaults } from "../data";
import Footer from "../components/Footer";
import { useRecoilValue } from "recoil";
import { myVaults } from "../recoil/atoms.js";
import Home from "../styles/Home.module.css";

export default function Main() {
  const currentMyVaultsState = useRecoilValue(myVaults);

  const filteredVaults = () => {
    const userWallet = localStorage.getItem("walletAddress");
    if (userWallet) {
      const result = vaults.filter(
        (vault) => vault.manager.toLowerCase() === userWallet.toLowerCase()
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
                  token={vault.token}
                  icon={vault.icon}
                  strategy={vault.strategy}
                  manager={vault.manager}
                  tlv={vault.tlv}
                  assetAddress={vault.assetAddress}
                  isOwner={true}
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
    <div className={Home.wrapper}>
      <NavBar />
      {!currentMyVaultsState ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} ml={12}>
          {vaults.map((vault, index) => (
            <GridItem key={index}>
              <VaultCard
                name={vault.name}
                symbol={vault.symbol}
                token={vault.token}
                icon={vault.icon}
                strategy={vault.strategy}
                manager={vault.manager}
                tlv={vault.tlv}
                assetAddress={vault.assetAddress}
                isOwner={false}
              />
            </GridItem>
          ))}
        </Grid>
      ) : (
        filteredVaults()
      )}
      <Footer />
    </div>
  );
}
