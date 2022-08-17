/*
Application
 */
import React, {Component} from 'react';

//import of the routing
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Iokg from "./pages/dissertation/iokg"
export default class App extends Component{
    render() {
        return (
            //Home page:router
            <BrowserRouter>
                <Switch>
                    <Route path='/dissertation/iokg' component={Iokg}></Route>
                    <Route path='/' component={Iokg}></Route>
                </Switch>
            </BrowserRouter>
        )
         }
}

