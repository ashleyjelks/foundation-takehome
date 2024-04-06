"use client";
import React, { useState } from "react";
import WalletConnector from "./WalletConnector";
import ENSAddressForm from "./ENSAddressForm";
import { isSignatureValid } from "../api/api";
import Avatar from "./Avatar";
import { useAccount, useBalance, useEnsName } from "wagmi";

const Home: React.FC = () => {
  const { address } = useAccount();

  const [isVerified, setIsVerified] = useState<boolean | null | undefined>(
    null,
  );
  const [_verificationError, setVerificationError] = useState<string | null>(
    null,
  );

  const handleVerification = async (
    message: string,
    signature: string,
    address: string,
  ) => {
    try {
      const isValid = await isSignatureValid(message, signature, address);
      setIsVerified(isValid);
      if (!isValid) {
        setVerificationError("Verification failed.");
      }
      return isValid;
    } catch (error) {
      console.error(error);
      setVerificationError("Error occured while verifying signature");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // FIXME:
    // For now I'm just showing an error when I'm clicked and a
    // user is not signed into their Wallet nor hasn't verified signature.
    // It would better if I used react hook form or some other form validation dependency here :)
  };

  return (
    <>
      <div className="wrapper">
        <div style={{ color: "black" }}>
          <WalletConnector onVerifySignature={handleVerification} />
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <ENSAddressForm onSubmit={handleSubmit} isVerified={isVerified} />
          <Avatar isVerified={isVerified} />
        </div>
      </div>
    </>
  );
};

export default Home;
