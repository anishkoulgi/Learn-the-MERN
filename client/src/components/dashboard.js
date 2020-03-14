import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import axios from "axios";

class dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      isOpen:false,
      setIsOpen:false,
      name:""
    }
  }

  componentDidMount() {
    axios.post("/dashboard",{id:this.props.id})
    .then((resp) => {
      this.setState({
        name: resp.data.name
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };
render() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/dashboard">
          <img src="/mern.png" className="mern"></img>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="navitem">
              <NavLink href="https://github.com/anishkoulgi">GitHub</NavLink>
            </NavItem>
          </Nav>
            <NavbarText>Welcome,<h3>{this.state.name}</h3></NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}
};
export default dashboard;
