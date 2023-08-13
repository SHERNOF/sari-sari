import classes from "./input.module.css";
export default function Input(props) {
  return (
    <input required type={props.type} placeholder={props.placeholder}>
      {props.children}
    </input>
  );
}
