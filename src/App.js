import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Collection from "./Components/Pages/Collection";
import AllTask from "./Components/Pages/AllTask";
import NotFound from "./Components/Pages/NotFound";

function App() {
    return (
        <Switch>
            <Route path="/" exact>
                <Redirect to="/all-task" />
            </Route>
            <Route path="/all-task">
                <AllTask />
            </Route>
            <Route path="/collection" exact>
                <Collection />
            </Route>
            <Route path="/collection/*" exact>
                <Collection />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    );
}

export default App;
