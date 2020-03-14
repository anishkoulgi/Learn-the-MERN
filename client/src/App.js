import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       userID:""
    }
  }
  
  changeUserID = id => {
    this.setState({
      userID:id
    })
  }

  render() {
    console.log(this.state.userID)
    return (

      <Router>
        <Switch>
          <Route exact path="/signup" component={() => (<Signup changeID={this.changeUserID} />)} />
          <Route exact path="/dashboard" component={() => (<Dashboard id={this.state.userID} />)} />
          <Route path="/" component={() => (<Login status="false" changeID={this.changeUserID} />)} />
        </Switch>
      </Router>
    );
  }
}

export default App;
