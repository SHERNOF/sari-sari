import classes from "./input.module.css";
export default function Input(props) {
  return (
    <input
      required
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
    >
    </input>
  );
}
