import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginService from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
  COMMON_FIELDS,
  REGISTRATION_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from '../MessageBundle';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false,
      loginSuccess: false,
    };
  }

  handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
  handleOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const loginResult = await LoginService(data);
    if (loginResult !== 200) {
      this.setState({
        error: true,
        loginSuccess: false,
      });
    } else{

      this.setState({
        loginSuccess: true,
        error: false,
      });
      localStorage.setItem('isLogged','true');
      window.location.href = '/notes'
    }
  };

  render() {
    const { loginSuccess, error } = this.state;

    return (
      <div className="Login mt-5">
        <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1> {' '}
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="fields">
              <p> {COMMON_FIELDS.EMAIL} </p>    {' '}
              <input
                type="text"
                name="email"
                onChange={this.handleOnChangeEmail}
                autoComplete="off"
                onKeyDown={this.handleEnter}
                required
              />
            </div>{' '}
            {' '}
            <div className="fields">
              {' '}
              <p> {COMMON_FIELDS.PASSWORD} </p>    {' '}
              <input
                type="password"
                name="Password"
                onChange={this.handleOnChangePassword}
                onKeyDown={this.handleEnter}
                autoComplete="off"
                required
              />{' '}
                  {' '}
            </div>{' '}
            {' '}
            <div className="buttons">
              {' '}
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-primary"
              >
                {' '}
                  {LOGIN_FIELDS.LOGIN}    {' '}
              </button>{' '}
                  <Link to="/register">
                     {REGISTRATION_FIELDS.REGISTER} </Link>  {' '}
               {' '}
            </div>{' '}
               {' '}
          </div>{' '}
           {' '}
        </form>{' '}
            {loginSuccess && <Message message={LOGIN_MESSAGE} />}    {' '}
        {error && <Error message={ERROR_IN_LOGIN} />}    {' '}
      </div>
    );
  }
}
