import { Grid, GridItem, Heading, Center } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import VaultCard from "../components/VaultCard";

export default function main() {
  const vaults = [
    { name: "Vault1", symbol: "V1", token: "Eth" },
    { name: "Vault2", symbol: "V2", token: "Dia" },
    { name: "Vault3", symbol: "V3", token: "Link" },
  ];
  return (
    <>
      <NavBar />
      <Center>
        <Heading>My Vaults</Heading>
      </Center>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} p="4">
        {vaults.map((vault, index) => (
          <GridItem key={index}>
            <VaultCard
              name={vault.name}
              symbol={vault.symbol}
              token={vault.token}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
