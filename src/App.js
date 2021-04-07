import React, {Component} from "react";
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import CompanyShare from "./components/companyShare";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";

class App extends Component {

    render() {

        return (
            <React.Fragment>
                <NavBar/>
                <main className="container">
                    <Switch>
                        <Route path="/" exact component={CompanyShare}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
