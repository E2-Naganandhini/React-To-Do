import classes from "./Input.module.css";
const Input = (props, ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input />
        </div>
    );
};

export default Input;
