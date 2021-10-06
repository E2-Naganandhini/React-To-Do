import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import { FaAlignJustify } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import database from "../Task/firbase";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { MdAddCircleOutline } from "react-icons/md";
const NavigationBar = (props) => {
    const [sideBar, setsideBar] = useState(false);
    const [collection, setCollection] = useState([]);
    const [search, setSearch] = useState(false);
    useEffect(() => {
        database.collection("collections").onSnapshot((snapshot) => {
            setCollection(snapshot.docs.map((doc) => doc.data().collection));
        });
    }, []);

    const sideControlClasses = sideBar
        ? `${classes.nav_menu} ${classes.active}`
        : classes.nav_menu;
    console.log(sideControlClasses);
    const menuIconClick = () => {
        sideBar ? setsideBar(false) : setsideBar(true);
        console.log(sideBar);
    };
    return (
        <React.Fragment>
            <div>
                <header className={classes.header}>
                    <div className={classes.sidetitle}>
                        <Link to="#" className={classes.nav_side_bars}>
                            <FaAlignJustify
                                className={classes.collIcon}
                                onClick={menuIconClick}
                            />
                        </Link>
                        <div className={classes.title}>TO DO</div>
                    </div>
                    <div className={classes.secondsidetitle}>
                        <MdAddCircleOutline
                            className={classes.addCollIcon}
                            onClick={props.onShowAddCollection}
                        />
                        <nav className={classes.nav}>
                            <ul>
                                <li>
                                    <BiSearch
                                        className={classes.searchIcon}
                                        onClick={() => {
                                            setSearch(!search);
                                        }}
                                    />
                                </li>
                                <li>
                                    {search && (
                                        <input
                                            placeholder="Search.."
                                            type="text"
                                            onChange={props.onChange}
                                        />
                                    )}
                                </li>
                                <li className={classes.collTitle}>
                                    <NavLink to="/collection">
                                        Collection
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <nav className={sideControlClasses}>
                    <ul
                        className={classes.nav_menu_items}
                        onClick={menuIconClick}
                    >
                        <li>
                            <Link to="#" className={classes.menu_bars}>
                                <AiOutlineClose />
                            </Link>
                        </li>
                        <li className={classes.nav_text}>
                            <Link to="/collection">
                                <span>Collection</span>
                            </Link>
                        </li>
                        <ul className={classes.nav_sub_menu_items}>
                            {collection.map((task) => (
                                <li key={task} className={classes.nav_text}>
                                    <Link to={`/collection/${task}`}>
                                        {task}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </ul>
                </nav>
            </div>
            <div className={classes.miniAddCollIcon}>
                <MdAddCircleOutline
                    className={classes.addCollIcon}
                    onClick={props.onShowAddCollection}
                />
            </div>
        </React.Fragment>
    );
};
export default NavigationBar;
