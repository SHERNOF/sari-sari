export default function FormElements(props) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      {props.children}
    </div>
  );
}
