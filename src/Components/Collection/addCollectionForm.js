import { useState } from "react";
import database from "../Task/firbase";
import classes from "./addCollectionForm.module.css";
const AddCollectionForm = (props) => {
    const [collectionInput, setCollectionInput] = useState([]);
    const [collectionIsValid, setCollectionIsValid] = useState(true);
    const confirmHandler = (event) => {
        event.preventDefault();
        if (collectionInput.length === 0) {
            setCollectionIsValid(false);
        } else {
            database.collection("collections").add({
                collection: collectionInput,
            });
            setCollectionInput("");
            props.onCancel();
        }
    };
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <label htmlFor="name">Add Collection</label>
            <input
                type="text"
                placeholder="Add Collection"
                value={collectionInput}
                onChange={(event) => {
                    setCollectionInput(event.target.value);
                    setCollectionIsValid(true);
                }}
            />
            {!collectionIsValid && (
                <p className={classes.invalid}>Please enter a valid Name</p>
            )}
            <div>
                <button onClick={confirmHandler}>Add</button>
                <button onClick={props.onCancel}>Close</button>
            </div>
        </form>
    );
};
export default AddCollectionForm;
