import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import VaultCard from "../components/VaultCard";
import { vaults } from "../data";
import Footer from "../components/Footer";

export default function Main() {
  return (
    <>
      <NavBar />
      <Grid templateColumns="repeat(3, 1fr)" gap={2} p="4">
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
            />
          </GridItem>
        ))}
      </Grid>
      <Footer />
    </>
  );
}
