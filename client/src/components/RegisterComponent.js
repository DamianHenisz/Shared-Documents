import React, { Component } from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";

import "../styles/LoginRegisterStyles.scss";
class RegisterComponent extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errors: {},
      isLoader: false
    };

    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push("/");
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-4 form-user">
          <h2 className="form-title">Rejestracja</h2>
          <h3 className="title-input">Nazwa użytkownika</h3>
          <input className={classnames("form-control", { "is-invalid": errors.userName })} type="text" placeholder="Podaj nazwę użytkownika" defaultValue={this.state.userName} onChange={this.handleChangeUserName} />
          {errors.userName && <div className="invalid-feedback text-error">{errors.userName} </div>}
          <h3 className="title-input">Hasło</h3>
          <input className={classnames("form-control", { "is-invalid": errors.password })} type="password" placeholder="Podaj hasło" defaultValue={this.state.password} onChange={this.handleChangePassword} />
          {errors.password && <div className="invalid-feedback text-error">{errors.password} </div>}

          <button className="btn btn-primary  form-button" onClick={this.onSignUp}>
            {/* {this.state.isLoader && <i className="fa fa-spinner" aria-hidden="true" />} */}
            Zarejestruj Się
          </button>
        </div>
        <div className="col-md-4" />
      </div>
    );
  }
}

RegisterComponent.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(RegisterComponent));
