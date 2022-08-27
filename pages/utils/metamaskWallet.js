//Checking to make sure wallet is connected
const checkWalletConnection = async () => {
  const { ethereum } = window;

  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return;
  } else {
    console.log("We have the ethereum object", ethereum);
    confirmChainId(ethereum);
  }
};

const confirmChainId = async (ethereum) => {
  const goerliChainId = "0x5";
  let chainId = await ethereum.request({ method: "eth_chainId" });
  console.log("Connected to chain " + chainId);
  if (chainId !== goerliChainId) {
    alert("Please connect to the Goerli Test Network!");
    return;
  }
  ethereum.on("chainChanged", (_chainId) => window.location.reload());
  getCurrentConnectedAccount(ethereum);
};

const getCurrentConnectedAccount = async (ethereum) => {
  const accounts = await ethereum.request({ method: "eth_accounts" });

  if (accounts.length !== 0) {
    const account = accounts[0];
    console.log("Found an authorized account:", account);
    const modifyAccount = modifyWalletAddress(account);
    console.log("Modified wallet address:", modifyAccount);
    return modifyAccount;
  } else {
    console.log("No authorized account found");
    return null;
  }
};

const addWalletListener = async (ethereum) => {
  ethereum.on("accountsChanged", (accounts) => {
    const [currentAccount] = accounts;
    confirmChainId(ethereum, currentAccount);
  });
};

// slice wallet address
const modifyWalletAddress = (currentAccount) => {
  console.log(currentAccount);
  let modified = currentAccount.slice(0, 6) + "..." + currentAccount.slice(-3);
  console.log("Modified wallet address:", modified);
  return modified;
};

//Connecting wallet
const connectWalletAction = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Install MetaMask!");
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};

export { checkWalletConnection, connectWalletAction, addWalletListener };
