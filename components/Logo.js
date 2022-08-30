import React from "react";
import Image from "next/image";

export default function Logo() {
  return (
    <Image src={"/squidradient.png"} alt="Loader" width="200" height="100" />
  );
}
