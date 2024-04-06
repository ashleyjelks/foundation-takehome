import React from "react";
import { normalize } from "viem/ens";
import { useAccount, useBalance, useEnsAvatar, useEnsName } from "wagmi";

interface AvatarProps {
  isVerified: boolean | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ isVerified }) => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const avatar = useEnsAvatar({
    name: normalize(ensName ?? ""),
  });
  const ethBalance = useBalance({
    address,
  });

  const textStyle = {
    color: "white",
    fontSize: "small",
    marginTop: "10px",
  };

  const avatarContainer = {
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
    overflow: "hidden",
  };

  return (
    <div style={avatarContainer}>
      <img
        style={{ height: "100px", width: "100px", padding: "0 5px" }}
        alt="ENS Avatar"
        src={
          isVerified && avatar.data
            ? avatar.data
            : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        }
      />
      {!isConnected ? (
        <p style={textStyle}>
          Connect wallet to view balance and account details.
        </p>
      ) : !isVerified ? (
        <p style={textStyle}>
          Verification required. Tap Sign Message to view balance and account
          details.
        </p>
      ) : (
        <>
          <p style={textStyle}>
            {`ENS Name: ${ensName ? ensName : "Unavailable"}`}
          </p>
          <p style={textStyle}>
            {`Balance: ${ethBalance?.data?.formatted ? ethBalance.data.formatted + " " + ethBalance.data.symbol : "Unavailable"}`}
          </p>
        </>
      )}
    </div>
  );
};

export default Avatar;
