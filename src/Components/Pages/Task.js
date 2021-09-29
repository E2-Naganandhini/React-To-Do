import { useEffect, useState } from "react";
import classes from "./Task.module.css";
import { Link } from "react-router-dom";
import database from "../Task/firbase";

const Task = () => {
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
            {tasks.map((task) => (
                <li
                    onClick={() => {
                        console.log(task);
                    }}
                >
                    <Link to={`/collection/${task.collection}`}>
                        {task.collection}
                        {console.log(task)}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default Task;
