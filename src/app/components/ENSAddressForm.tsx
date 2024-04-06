import { useAccount, useEnsName } from "wagmi";
import { useState } from "react";

interface ENSAddressFormProps {
  onSubmit: () => void;
  isVerified: boolean | null | undefined;
}

const ENSAddressForm = ({ isVerified, onSubmit }: ENSAddressFormProps) => {
  const { address, isConnected } = useAccount();
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isVerified) {
      onSubmit();
      setError(null);
    } else {
      setSubmitAttempted(true);
      setError(
        "Connect to your wallet and tap 'Sign Message' to verify signature and submit this form. Please refresh to continue.",
      );
    }
  };

  const { isLoading: ensNameLoading } = useEnsName({
    address,
  });

  const formWrapper = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const gradientContainer = {
    height: "275px",
    width: "450px",
    maxWidth: "90%",
    borderRadius: "25px",
    overflow: "hidden",
    opacity: "85%",
    position: "relative",
  };

  const gradientTop = {
    height: "50%",
    width: "100%",
    background:
      "linear-gradient(55deg,  #DDD8FA 5%, #95d5c6, #B2E5B4, #E0EBBB, #F1ECC4, #F1ECC5, #F5E4D1, #E0EBBB, #FDCDF3)",
  };

  const gradientBottom = {
    height: "50%",
    width: "100%",
    background:
      "linear-gradient(145deg,  #E4D0F6 5%, #FFFFFF, #D7A3DF, #9370DB, #DC143C, #DC143C, #C71585, #DB7093, #DB7093)",
  };

  const wrapper = {
    height: "200px",
    width: "325px",
    maxWidth: "90%",
    borderRadius: "25px",
    overflow: "hidden",
    background: "white",
    padding: "20px",
    boxShadow: "rgba(255, 255, 255, 0.9) 0 0 15px 5px",
  };

  const addressStyle = {
    marginBottom: "20px",
    padding: "10px",
    width: "calc(100% - 20px)",
    borderRadius: "10px",
    border: "1px solid #CCCCCC",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#000000",
    color: "white",
    width: "100%",
  };

  const textStyle = { color: "black", marginBottom: "10px" };

  const errorStyle = {
    color: "red",
    fontSize: "small",
    minHeight: "20px",
  };

  return (
    <div style={formWrapper}>
      <div className="" style={gradientContainer}>
        <div style={gradientTop} />
        <div style={gradientBottom} />
      </div>
      <div
        className="form"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={wrapper}>
          <div style={{ marginBottom: "100px" }}>
            <h1 style={{ color: "black" }}>ENS Lookup</h1>
            {ensNameLoading ? (
              <p style={textStyle}>...Searching</p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label style={textStyle} htmlFor="address">
                  Address:{" "}
                </label>
                {submitAttempted && !isVerified && (
                  <p style={errorStyle}>{error}</p>
                )}
                {!error && (
                  <>
                    <input
                      id="address"
                      name="address"
                      placeholder="0x1234f567890123456789012345678..."
                      type="text"
                      style={addressStyle}
                    />
                    <button
                      style={buttonStyle}
                      type="submit"
                      aria-label="Submit ENS Address"
                    >
                      Submit
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ENSAddressForm;
