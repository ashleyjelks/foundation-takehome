"use client";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
  // useProvider,
} from "wagmi";
import { normalize } from "viem/ens";
import { ethers } from "ethers";
import WalletConnector from "./WalletConnector";
import ENSAddressForm from "./ENSAddressForm";

const Home: React.FC = () => {
  const [address, setAddress] = useState("");
  const [loading, setIsLoading] = useState<boolean | null>(false);
  const [_ensName, setEnsName] = useState<string | null>(null);
  const [avatar, setEnsAvatar] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [_error, setError] = useState<string | null>(null);

  const {
    data: ensName,
    isError,
    error,
    isLoading,
  } = useEnsName({
    address,
    enabled: address,
  });

  const ensAvatar = useEnsAvatar({
    name: normalize(ensName),
  });

  useEffect(() => {
    if (address.length === 0) {
      setEnsAvatar(null);
      setEnsName(null);
    }
  }, [address]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (isError) {
      setError(error);
      return;
    }
    setEnsAvatar(ensAvatar.data);
    setEnsName(ensName);

    // if (!isConnected) {
    //   setError("Please connect your wallet first.");
    //   return;
    // }

    // handleENSNameLookup(address)
    //   .then(() => {
    //   console.log("🚀 ~ address ~ address:", address)
    //     // handleETHBalance(address)
    //   })
    //   .catch((error: { message: React.SetStateAction<null>; }) => {
    //     // This will catch any errors from handleENSNameLookup or handleETHBalance
    //     setError(error.message);
    //   });
  };

  return (
    <>
      <div
        className="wrapper"
      >
        <div style={{color: "black" }}>
          <WalletConnector />
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <ENSAddressForm
            handleSubmit={handleSubmit}
            loading={loading}
            address={address}
            setAddress={setAddress}
          />
          <div
            className="avatarContainer"
            style={{
              height: "200px",
              width: "115px",
              background: "black",
              borderRadius: "20px",
              margin: "0 40px",
              padding: "20px 10px",
              display: "flex",
              maxWidth: "125px",
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <img
              style={{ height: "100px", width: "100px", padding: "0 5px" }}
              src={
                avatar
                  ? avatar
                  : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }
            />
            <p style={{ textColor: "white" }}>{ensName}</p>
            <p style={{ textColor: "white" }}>Balance</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
