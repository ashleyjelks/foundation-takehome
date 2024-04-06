import React from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

interface WalletConnectorProps {
  onVerifySignature: (
    message: string,
    signedMsg: string,
    address: string,
  ) => Promise<boolean | undefined>;
}
const WalletConnector: React.FC<WalletConnectorProps> = ({
  onVerifySignature,
}) => {
  const { status, address } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const handleSignMessage = async () => {
    const message = "I'm signing a message.";

    signMessageAsync({ message })
      .then((signedMsg: string) => {
        return onVerifySignature(message, signedMsg, address!);
      })
      .catch((error) => {
        console.error("Error signing message/verifying signature:", error);
      });
  };

  const buttonStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#000000",
    color: "white",
    margin: "0 10px",
    width: "150px",
  }

  return (
    <div style={{ minHeight: "175px" }}>
      {error && (
        <div
          style={{ fontSize: 12, fontWeight: "bold", color: "red" }}
        >{`Unable to connect to wallet: ${error.message}`}</div>
      )}
      {(status === "reconnecting" || status === "connecting") && (
        <p style={{ fontSize: 24, fontWeight: "bold" }}>Connecting...</p>
      )}

      {status === "disconnected" && (
        <div style={{ margin: "0 10px" }}>
          <p style={{ fontSize: 24, fontWeight: "bold" }}>
            Connect Your Wallet
          </p>
          {address && <p style={{ fontSize: 14 }}>Your Address: {address}</p>}
          {connectors.map(
            (connector: {
              uid: React.Key | null | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => (
              <button
                style={buttonStyle}
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
                aria-label={`Connect to ${connector.name}`}
              >
                {connector.name}
              </button>
            ),
          )}
        </div>
      )}
      {status === "connected" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px",
          }}
        >
          <p style={{ fontSize: 24, fontWeight: "bold" }}>
            Disconnect Your Wallet
          </p>
          {address && <p style={{ fontSize: 14 }}>Your Address: {address}</p>}

          <div>
            <button
              style={buttonStyle}
              type="button"
              onClick={() => disconnect()}
              aria-label="Disconnect your wallet"
            >
              Disconnect
            </button>
            <button
              style={buttonStyle}
              type="button"
              onClick={() => handleSignMessage()}
              aria-label="Sign Message"
            >
              Sign Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;
