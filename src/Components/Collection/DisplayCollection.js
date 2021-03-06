import { useEffect, useState } from "react";
import classes from "./DisplayCollection.module.css";
import { Link } from "react-router-dom";
import database from "../Task/firbase";

const DisplayCollection = (props) => {
    const [tasks, setTask] = useState([]);

    useEffect(() => {
        database.collection("collections").onSnapshot((snapshot) => {
            setTask(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    collection: doc.data().collection,
                }))
            );
        });
        database.collection("collections").onSnapshot((snapshot) => {
            console.log(snapshot.docs.map((doc) => doc.id));
        });
    }, []);

    return (
        <ul className={classes.collection}>
            {tasks
                .filter((task) => {
                    if (props.searchTermChange == "") {
                        return task;
                    } else if (
                        task.collection
                            .toLowerCase()
                            .includes(props.searchTermChange.toLowerCase())
                    ) {
                        return task;
                    }
                })
                .map((task) => (
                    <li
                        onClick={() => {
                            console.log(task);
                        }}
                    >
                        <Link to={`/collection/${task.collection}`}>
                            {task.collection}
                        </Link>
                    </li>
                ))}
        </ul>
    );
};

export default DisplayCollection;
