import { Button } from "@chakra-ui/react";

const ConnectButton = ({
  metamaskInstalled,
  connectWalletPressed,
  walletAddress,
}) => {
  const trimAddress = (address) => {
    return address.slice(0, 5) + "..." + address.slice(-4);
  };

  return (
    <div>
      {metamaskInstalled && (
        <Button variant="outline" onClick={connectWalletPressed}>
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
