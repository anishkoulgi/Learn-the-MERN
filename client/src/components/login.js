import React, { Component } from "react";
import "../App.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { SocialIcon } from "react-social-icons";
import axios from "axios";
import { Alert } from "reactstrap";
import { Redirect } from "react-router-dom";

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      signedup: false,
      disabled:false,
      disclass:"",
      route:false,
      err:false,
      name:""
    };
  }

  componentDidMount() {
    if (this.props.status === "true") {
      this.setState(
        {
          signedup: true
        },
        () => {
          setTimeout(() => {
            this.setState({
              signedup: false
            });
          }, 4000);
        }
      );
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      disabled: true,
      disclass: "dis"
    });
    axios
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if(res.data.status) {
          
          this.setState({
            route:true,
            name: res.data.name
          },() => {
            this.props.changeID(res.data.id)
          })
        }
        else {
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
  render() {
    console.log(this.state.route)
    if (this.state.route) {
      
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="wrapper">
        <Form className="login-form" onSubmit={this.onSubmit}>
          <h1 className="text-center">
            Learn the<span className="font-weight-bold"> MERN</span>
          </h1>
          <h2 className="text-center">Welcome!</h2>
          <div className="error">
            <Alert
              color="success"
              isOpen={this.state.signedup}
              style={{ fontSize: "15px" }}
              className="text-center"
            >
              Signed Up successfully. Log In to continue
            </Alert>
            <Alert
              color="danger"
              isOpen={this.state.err}
              style={{ fontSize: "15px" }}
              className="text-center"
            >
              Email or password is incorrect
            </Alert>
          </div>
          <FormGroup>
            <Label>Email</Label>
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
          <Button className="btn-lg btn-dark btn-block mt-3">Log In</Button>
          <div className="text-center mt-3">
            Not a user?
            <span className="p-2">
              <a href="/signup">Sign Up</a>
            </span>
          </div>
          <div className="text-center mt-3">
            <SocialIcon
              url="http://github.com/anishkoulgi"
              network="github"
              bgColor="#000"
              className="gitIcon"
            ></SocialIcon>
          </div>
        </Form>
      </div>
    );
  }
}

export default login;
