import { atom } from "recoil";

export const myVaults = atom({
  key: "myVaults",
  default: false,
});

export const vaultStatus = atom({
  key: "vaultStatus",
  default: [],
});
