interface ENSAddressFormProps {
  handleSubmit: (event: { preventDefault: () => void }) => void;
  loading: boolean | null;
  address: string;
  setAddress: (value: string) => void;
}

const ENSAddressForm = (props: ENSAddressFormProps) => {
  const { handleSubmit, loading, address, setAddress } = props;

  return (
    <div
      className="formWrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="gradientContainer"
        style={{
          height: "275px",
          width: "450px",
          maxWidth: "90%",
          borderRadius: "25px",
          overflow: "hidden",
          opacity: "85%",
          position: "relative",
        }}
      >
        <div
          className="gradientTop"
          style={{
            height: "50%",
            width: "100%",
            background:
              "linear-gradient(55deg,  #DDD8FA 5%, #95d5c6, #B2E5B4, #E0EBBB, #F1ECC4, #F1ECC5, #F5E4D1, #E0EBBB, #FDCDF3)",
          }}
        />
        <div
          className="gradientBottom"
          style={{
            height: "50%",
            width: "100%",
            background:
              "linear-gradient(145deg,  #E4D0F6 5%, #FFFFFF, #D7A3DF, #9370DB, #DC143C, #DC143C, #C71585, #DB7093, #DB7093)",
          }}
        />
      </div>
      <div
        className="form"
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "200px",
            width: "325px",
            maxWidth: "90%",
            borderRadius: "25px",
            overflow: "hidden",
            background: "white",
            padding: "20px 20px 20px 20px",
            boxShadow: "rgba(255, 255, 255, 0.9) 0 0 15px 5px",
          }}
        >
          <div style={{ marginBottom: "100px" }}>
            <h1 style={{ color: "black" }}>ENS Lookup</h1>
            {loading ? (
              <p style={{ color: "black", marginBottom: "10px" }}>
                ...Searching
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <label
                  style={{ color: "black", marginBottom: "10px" }}
                  htmlFor="address"
                >
                  Address:{" "}
                </label>
                <input
                  id="address"
                  name="address"
                  value={address}
                  placeholder="0x225f137127d90677883..."
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    marginBottom: "20px",
                    padding: "10px",
                    width: "calc(100% - 20px)",
                    borderRadius: "10px",
                    border: "1px solid #CCCCCC",
                  }}
                />
                <button
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor: "#000000",
                    color: "white",
                    width: "100%",
                  }}
                  type="submit"
                  aria-label="Submit ENS Address"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ENSAddressForm;
