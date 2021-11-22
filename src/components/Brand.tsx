export default function Brand(props: any) {
  return (
    <>
      {!props.greenLogo ? (
        <div
          id="photo"
          style={{
            textAlign: "right",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <span style={{ verticalAlign: "middle" }}>OCTOPUS</span>
          <img
            src={require("../assets/images/vfdLogo.svg").default}
            alt="logom"
            style={{ verticalAlign: "middle" }}
            height="40"
          />
        </div>
      ) : (
        <div
          id="photo"
          style={{
            textAlign: "right",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          <span style={{ verticalAlign: "middle" }} className="text-primary">OCTOPUS</span>
          <img
            src={require("../assets/images/vfdLogoGreen.png").default}
            alt="logom"
            style={{ verticalAlign: "middle" }}
            height="40"
          />
        </div>
      )}
    </>
  );
}
