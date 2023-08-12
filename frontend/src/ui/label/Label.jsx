export default function Label(props) {
  return (
    <label
      htmlFor={props.htmlFor}
      style={{
        textAlign: "left",
        width: "100%",
        fontSize: "0.9em",
        marginBottom: "0.3rem",
        // color: "white",
      }}
    >
      {props.children}
    </label>
  );
}
