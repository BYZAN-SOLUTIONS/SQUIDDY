import { Button } from "@chakra-ui/react";

const ConnectButton = ({
  metamaskInstalled,
  connectWalletPressed,
  walletAddress,
}) => {
  const trimAddress = (address) => {
    return address.slice(0, 6) + "..." + address.slice(-3);
  };

  return (
    <div>
      {metamaskInstalled && (
        <Button variant="outline-primary" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " + trimAddress(walletAddress)
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button>
      )}
    </div>
  );
};

export default ConnectButton;
