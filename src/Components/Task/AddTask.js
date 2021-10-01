import classes from "./AddTask.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import database from "./firbase";
import DisplayTask from "./displayTask";
import { IoChevronBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const AddTask = (props) => {
    const [value, setValue] = useState("");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputValidate, setInputValidate] = useState(true);

    const location = useLocation();
    useEffect(() => {
        setLoading(true);
        database.collection("tasks").onSnapshot((snapshot) => {
            setTasks(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    collection: doc.data().collection,
                    task: doc.data().task,
                    completed: doc.data().completed,
                }))
            );
        });
        setLoading(false);
    }, []);
    if (loading) {
        return <p>Loading..</p>;
    }
    const path = location.pathname;
    const lastItem = path.substring(path.lastIndexOf("/") + 1);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (value.length === 0) {
            setInputValidate(false);
            console.log(inputValidate);
        } else {
            setLoading(true);

            database.collection("tasks").add({
                collection: lastItem,
                completed: false,
                task: value,
            });
            setValue("");
            setLoading(false);
        }
        console.log(tasks);
    };
    var completeNum = 0;
    var IncompleteNum = 0;

    tasks.forEach((task) => {
        if (task.collection === lastItem) {
            if (task.completed === true) {
                completeNum += 1;
            } else {
                IncompleteNum += 1;
            }
        }
    });

    return (
        <div className={classes.container}>
            <form onSubmit={submitHandler}>
                <h2>
                    <NavLink to="/collection">
                        <IoChevronBackOutline className={classes.backIcon} />
                    </NavLink>
                    {lastItem.toUpperCase()}
                </h2>

                <input
                    type="text"
                    placeholder="Add Task"
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        setInputValidate(true);
                    }}
                />
            </form>
            {!inputValidate ? (
                <p className={classes.InputErrorMsg}>Enter Task</p>
            ) : (
                ""
            )}
            <ul className={classes.list}>
                {IncompleteNum !== 0 && <h4>InComplete - {IncompleteNum}</h4>}
                {!loading &&
                    tasks.map((task) =>
                        task.collection === lastItem &&
                        task.completed === false ? (
                            <DisplayTask todo={task} />
                        ) : (
                            ""
                        )
                    )}
                {completeNum !== 0 && <h4>Completd - {completeNum}</h4>}
                {!loading &&
                    tasks.map((task) =>
                        task.collection === lastItem &&
                        task.completed === true ? (
                            <DisplayTask todo={task} />
                        ) : (
                            ""
                        )
                    )}
                {completeNum === 0 && IncompleteNum === 0 && (
                    <p className={classes.NotificationMsg}>No Task Found</p>
                )}
            </ul>
        </div>
    );
};

export default AddTask;
