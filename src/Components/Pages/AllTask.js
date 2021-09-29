import React, { useState } from "react";
import NavigationBar from "../Layout/NavigationBar";
import AddCollection from "../Collection/addCollection";
import Task from "./Task";
const AllTask = () => {
    const [addCollectionIsShown, setaddCollectionIsShown] = useState(false);

    const hideAddCollection = () => {
        setaddCollectionIsShown(false);
    };
    const ShowAddCollection = () => {
        setaddCollectionIsShown(true);
    };
    return (
        <React.Fragment>
            {addCollectionIsShown && (
                <AddCollection onClose={hideAddCollection} />
            )}
            <NavigationBar onShowAddCollection={ShowAddCollection} />
            <Task />
        </React.Fragment>
    );
};

export default AllTask;
