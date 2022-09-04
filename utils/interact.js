export const getNetworkName = async () => {
  if (window.ethereum) {
    let chainId = await window.ethereum.networkVersion;

    switch (chainId) {
      case "1":
        chainId = "Mainnet";
        break;
      case "42":
        chainId = "Kovan";
        break;
      case "4":
        chainId = "Rinkeby";
        break;
      case "5":
        chainId = "Goerli ";
        break;
      case "1337":
        chainId = "Local Host";
        break;
      case "80001":
        chainId = "Mumbai";
        break;

      default:
        chainId = "Wrong Network";
        break;
    }

    return chainId;
  }
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      //   const status = maticDetails();
      const obj = {
        // status: status.tokens,
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 You must install Metamask.{" "}
            <a
              target="_blank"
              href="https://metamask.io/download.html"
              rel="noreferrer"
            >
              Download
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        // const status = maticDetails();
        return {
          address: addressArray[0],
          //   status: status.tokens,
        };
      } else {
        return {
          address: "",
          status: "",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <p>
          {" "}
          🦊 You must install Metamask.{" "}
          <a
            rel="noreferrer"
            href="https://metamask.io/download.html"
            target="_blank"
            className=" ml-5 btn btn-link font-light p-1 rounded-md border border-white  px-4 text-white hover:border-purple-500"
          >
            Download
          </a>
        </p>
      ),
    };
  }
};
