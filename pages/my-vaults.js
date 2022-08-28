import { Grid, GridItem, Heading, Container } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import VaultCard from "../components/VaultCard";
import { vaults } from "../data";

export default function main() {
  return (
    <>
      <NavBar />
      <Container>
        <Heading>My Vaults</Heading>
        <Grid templateColumns="repeat(5, 1fr)" gap={6} p="4">
          {vaults.map((vault, index) => (
            <GridItem key={index}>
              <VaultCard
                name={vault.name}
                symbol={vault.symbol}
                token={vault.token}
                icon={vault.icon}
              />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );
}
