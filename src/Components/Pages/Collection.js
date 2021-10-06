import NavigationBar from "../Layout/NavigationBar";
import { useState } from "react";
import AddCollection from "../Collection/addCollection";
import React from "react";
import AddTask from "../Task/AddTask";
import DisplayCollection from "../Collection/DisplayCollection";
import { useLocation } from "react-router";

const Collection = () => {
    const [addCollectionIsShown, setaddCollectionIsShown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const hideAddCollection = () => {
        setaddCollectionIsShown(false);
    };
    const location = useLocation();
    const path = location.pathname;
    const lastItem = path.substring(path.lastIndexOf("/") + 1);
    const ShowAddCollection = () => {
        setaddCollectionIsShown(true);
    };
    return (
        <React.Fragment>
            {addCollectionIsShown && (
                <AddCollection onClose={hideAddCollection} />
            )}
            <NavigationBar
                onShowAddCollection={ShowAddCollection}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                }}
            />
            {lastItem === "collection" ? (
                <DisplayCollection searchTermChange={searchTerm} />
            ) : (
                <AddTask />
            )}
        </React.Fragment>
    );
};

export default Collection;
