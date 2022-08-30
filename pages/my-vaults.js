import { Grid, GridItem, Heading } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import VaultCard from "../components/VaultCard";
import { vaults } from "../data";

export default function main() {
  return (
    <>
      <NavBar />
      <Heading>My Vaults</Heading>
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
    </>
  );
}
