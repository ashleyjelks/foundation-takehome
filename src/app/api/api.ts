import { verifyMessage } from "@ambire/signature-validator";
import { ethers } from "ethers";

// Ran into issues getting the sig validated with ethers' verifyMessage func so I deviated a bit from the project instructions
// This still validates the signature, in the interest of time I couldn't spend more debugging
// https://github.com/ethers-io/ethers.js/issues/3924
// https://ethereum.stackexchange.com/questions/144451/typeerror-cannot-read-properties-of-undefined-reading-jsonrpcprovider
// https://github.com/AmbireTech/signature-validator/?tab=readme-ov-file
// Helpful tool for validating signatures: https://sigtool.ambire.com/

export const isSignatureValid = (
  message: string,
  signature: string,
  signer: string,
): Promise<boolean | undefined> => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-rpc.com",
  );

  return verifyMessage({
    signer,
    message,
    signature,
    provider,
  })
    .then((res: boolean) => {
      return res;
    })
    .catch((err: Error) => {
      console.error("Error validating signature", err);
      return undefined;
    });
};
