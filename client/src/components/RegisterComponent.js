import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";

class RegisterComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {},
      isLoader: false,
      nextRoute: false
    };

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  handleChangeUserName(event) {
    this.setState({ userName: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  onSignUp() {
    const newUser = {
      userName: this.state.userName,
      password: this.state.password
    };
    console.log(newUser);
    // this.setState({ isLoader: true });

    this.props.registerUser(newUser);
    // axios
    //   .post("/api/users/register", newUser)
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ errors: {}, isLoader: false, nextRoute: true });
    //   })
    //   .catch(err => {
    //     console.log(err.response.data);
    //     this.setState({ errors: err.response.data, isLoader: false });
    //   });
  }
  render() {
    const errors = this.state.errors;

    const user = this.props.auth.user;
    // if (this.state.nextRoute) {
    //   return <Redirect from="/register" to="/document" />;
    // }
    return (
      <div>
        <p>RegisterComponent.js</p>
        <p>{user ? user.userName : null}</p>
        <h3>Nazwa użytkownika:</h3>
        <input className={classnames("form-control", { "is-invalid": errors.userName })} type="text" placeholder="Enter your Login" defaultValue={this.state.userName} onChange={this.handleChangeUserName} />
        {errors.userName && <div className="invalid-feedback">{errors.userName} </div>}
        <h3>Hasło:</h3>
        <input className={classnames("form-control", { "is-invalid": errors.password })} type="password" placeholder="Enter your Password" defaultValue={this.state.password} onChange={this.handleChangePassword} />
        {errors.password && <div className="invalid-feedback">{errors.password} </div>}
        <div>
          <button className="btn btn-primary" onClick={this.onSignUp}>
            {this.state.isLoader && <i className="fa fa-spinner" aria-hidden="true" />}
            Zarejestruj Się
          </button>
        </div>
      </div>
    );
  }
}

RegisterComponent.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterComponent);
