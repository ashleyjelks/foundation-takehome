"use client";
import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const WalletConnector: React.FC = () => {
  const { addresses, status } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div style={{minHeight: "175px", border: "solid 5px red"}}>
      {error && <div style={{ fontSize: 12, fontWeight: "bold", color: "red"}}>{`Unable to connect to wallet: ${error.message}`}</div>}
      {(status === "reconnecting" || status === "connecting") && (<p style={{ fontSize: 24, fontWeight: "bold"}}>Connecting...</p>)}

      {status === "disconnected" && (
        <div style={{  margin: "0 10px" }}>
          <p style={{fontSize: 24, fontWeight: "bold"}}>Connect Your Wallet</p>
          {connectors.map((connector: {
              uid: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<
                React.ReactNode> | React.ReactPortal | null | undefined;
            }) => (
            <button
              style={{
                padding: "10px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: "#000000",
                color: "white",
                margin: "0 10px",
                width: "150px",
              }}
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
              aria-label={`Connect to ${connector.name}`}
            >
              {connector.name}
            </button>
          ))}
        </div>
      )}
      {status === "connected" && (
        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}
        >
          <p style={{fontSize: 24, fontWeight: "bold"}}>Disconnect Your Wallet</p>
          <p style={{fontSize: 14}}>{addresses[0] && `Your Address: ${addresses[0]}`}</p>
          <button
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              backgroundColor: "#000000",
              color: "white",
              width: "150px",
            }}
            type="button"
            onClick={() => disconnect()}
            aria-label="Disconnect your wallet"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
