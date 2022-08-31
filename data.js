export const vaults = [
  {
    id: 1,
    name: "DungeonCrawler",
    symbol: "DGC",
    token: "1inch",
    icon: "/images/1inch.png",
    strategy: {
      name: "LionFeast",
      contract: "0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0",
      description:
        "The flashloan bot gets the prices of each Uniswap fork and implements flashloan when it finds an arbitrage opportunity.",
    },
    manager: "0x5A7648b6320F69bD64647393294E3662e63Ad3d8",
    tlv: "23,012",
    assetAddress: "0x111111111117dC0aa78b770fA6A738034120C302",
  },
  {
    id: 2,
    name: "SnapSolid",
    symbol: "SS",
    token: "Dia",
    icon: "/images/dai.png",
    strategy: {
      name: "MoonKing",
      contract: "0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0",
      description:
        "The flashloan bot gets the prices of each Uniswap fork and implements flashloan when it finds an arbitrage opportunity.",
    },
    manager: "0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0",
    tlv: "1,977,876",
    assetAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    id: 3,
    name: "HotMess",
    symbol: "HM",
    token: "Link",
    icon: "/images/link.png",
    strategy: {
      name: "TimeWarp",
      contract: "0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0",
      description:
        "The flashloan bot gets the prices of each Uniswap fork and implements flashloan when it finds an arbitrage opportunity.",
    },
    manager: "0x70557CF93c108c936541eb5A98c18aa0967724E9",
    tlv: "1,992",
    assetAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  },
];

export const stockStrategies = [
  {
    name: "JuicyBottle",
    contract: "0x69c482217E7F3BAF25A0C99E3D2e9525BFA544F0",
    description:
      "The flashloan bot gets the prices of each Uniswap fork and implements flashloan when it finds an arbitrage opportunity.",
  },
  {
    name: "EnchantedTurkey",
    contract: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    description:
      "The flashloan bot gets the prices of each Uniswap fork and implements flashloan when it finds an arbitrage opportunity.",
  },
];
