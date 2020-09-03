import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {
  UserRegistration,
  EmailValidation,
} from '../services/RegistrationService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
  REGISTRATION_FIELDS,
  REGISTRATION_MESSAGE,
  COMMON_FIELDS,
  ERROR_IN_REGISTRATION,
} from '../MessageBundle';
import validator from 'validator'

export default class Registration extends Component {
  constructor (props) {
    super (props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      mobileno:'',
      register: false,
      error: false,
      errors: {}
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

  handleOnChangeFirstName = e => {
    this.setState ({
      first_name: e.target.value,
    });
  };

  handleOnChangeLastName = e => {
    this.setState ({
      last_name: e.target.value,
    });
  };

  handleOnChangeEmail = e => {
    this.setState ({
      email: e.target.value,
    });
  };

  handleOnChangePassword = e => {
    this.setState ({
      password: e.target.value,
    });
  };


  isValid = () => {
    let fields = this.state
    let isFormValid = true
    let errors = {}
    if(!validator.isMobilePhone(fields.mobileno)){
        errors["mobileno"] = "Enter a Valid Mobile number"
        isFormValid = false
    }
    if(!validator.isEmail(fields.email)){
      errors["email"] = "Enter a valid email"
      isFormValid = false
    } 

    this.setState({errors})
    return isFormValid
  }
  handleOnChangeMobileno = e => {
        this.setState ({
          errors: {},
          mobileno: e.target.value,

    }); 
  };

  handleOnBlur = async e => {
    this.setState ({
      email: e.target.value,
    });
    const data = {
      email: this.state.email,
    };
    const isEmailTaken = await EmailValidation (data);

    isEmailTaken === 204
      ? this.setState ({email_taken: true})
      : this.setState ({email_taken: false});
  };

  onSubmit = async e => {
    e.preventDefault ();
    if(this.isValid()){
      const data = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password,
        mobileno: this.state.mobileno,
      };
  
      const registerStatus = await UserRegistration (data);
      if (registerStatus === 200) {
        this.setState ({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          mobileno: '',
          register: true,
          error: false,
        });
        window.location.href="/login";
      } else
        this.setState ({
          error: true,
          register: false,
        });
    }
  };

  render () {
    const {register, error, email_taken, errors} = this.state;

    return (
      <div className="Registration mt-5">
        <h1> {REGISTRATION_FIELDS.REGISTRATION_HEADING} </h1> <form
          onSubmit={this.onSubmit}
        >
          <div>
            <div className="fields">
              <p> {REGISTRATION_FIELDS.FIRST_NAME} </p>
              {' '}
              <input
                type="text"
                value={this.state.first_name}
                name="FirstName"
                onKeyDown={this.handleEnter}
                onChange={this.handleOnChangeFirstName}
                autoComplete="off"
              />
              {' '}
            </div> <div className="fields">
              <p> {REGISTRATION_FIELDS.LAST_NAME} </p>
              {' '}
              <input
                type="text"
                value={this.state.last_name}
                autoComplete="off"
                onKeyDown={this.handleEnter}
                name="LastName"
                onChange={this.handleOnChangeLastName}
              />
              {' '}
            </div> <div className="fields">
              <p> {COMMON_FIELDS.EMAIL} </p>
              {' '}
              <input
                type="email"
                className={classNames ({error: email_taken || errors.email})}
                value={this.state.email}
                onKeyDown={this.handleEnter}
                name="Email"
                onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeEmail}
                autoComplete="off"
                required
              />
              {errors.email && <div className="text-danger">Enter a Valid Email</div>}
              {email_taken && <div className="text-danger">Email Already Registered</div>}
              </div>
           <div className="fields">
              <p> {COMMON_FIELDS.PASSWORD} </p>
              {' '}
              <input
                type="password"
                value={this.state.password}
                name="Password"
                onKeyDown={this.handleEnter}
                onChange={this.handleOnChangePassword}
                autoComplete="off"
                required
              />
            </div> <div className="fields">
              <p> {REGISTRATION_FIELDS.MOBILENO} </p>
              {' '}
              <input
                value={this.state.mobileno}
                className={classNames ({error: errors.mobileno})}
                name="mobileno"
                onChange={this.handleOnChangeMobileno}
                autoComplete="off"
                onKeyDown={this.handleEnter}
                required
              />
              {errors.mobileno && <div className="text-danger">Enter a Valid Mobile number</div>}
            </div>
            <div className="buttons">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={email_taken}
              >
                {' '}{REGISTRATION_FIELDS.REGISTER}{' '}
              </button>
              {' '}
              <Link to="/login"> {REGISTRATION_FIELDS.CANCEL} </Link>
              {' '}
            </div>{' '}
          </div>{' '}
        </form>
        {' '}
        {error && <Error message={ERROR_IN_REGISTRATION} />}
        {' '}
        {register && <Message message={REGISTRATION_MESSAGE} />}
        {' '}
      </div>
    );
  }
}
