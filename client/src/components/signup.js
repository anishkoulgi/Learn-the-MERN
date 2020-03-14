import React, { Component } from "react";
import "../App.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Route } from "react-router-dom";
import { Alert } from "reactstrap";
import Login from "./login"

class signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      disabled: false,
      disclass: "",
      route: false,
      err: false
    };
  }

  handleSubmit = e => {
    this.setState({
      disabled: true,
      disclass: "dis"
    });
    e.preventDefault();
    e.disabled = true;
    axios
      .post("/signup", {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
      .then(res => {
        if (res.data.error === "") {
          this.setState({
            route: true
          });
        } else {
          this.setState(
            {
              disabled: false,
              disclass: "",
              err: true
            },
            () => {
              setTimeout(
                function() {
                  this.setState({
                    err: false
                  });
                }.bind(this),
                4000
              );
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (this.state.route) {
      return <Route path="/" component={() => (<Login status="true" changeID={this.props.changeID}/>)} />;
    }
    return (
      <div className="wrappers">
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <h2 className="text-center">
            Become a<span className="font-weight-bold"> MERNian </span>
          </h2>
          <h3 className="text-center">Sign Up</h3>
          <div className="error">
            <Alert
              color="danger"
              style={{ fontSize: "15px" }}
              isOpen={this.state.err}
            >
              An account with this email already exists!
            </Alert>
          </div>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Jonny Walker"
              name="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email-ID</Label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              name="email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            className={`btn-lg btn-dark btn-block mt-3 ${this.state.disclass}`}
            disabled={this.state.disabled}
          >
            Sign Up
          </Button>
          <div className="text-center mt-3">
            Already a user?
            <span className="p-2">
              <a href="/login">Log In</a>
            </span>
          </div>
        </Form>
      </div>
    );
  }
}

export default signup;
