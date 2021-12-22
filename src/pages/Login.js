import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setEmail as setEmailAction } from '../actions';
import walletAnimation from '../walletAnimation.gif';
import '../style/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '' };
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  validateEmail(email) {
    const structure = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return structure.test(String(email).toLowerCase());
  }

  validatePassword(password) {
    const MINIMUM = 6;
    return password.length >= MINIMUM;
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
    const { setEmail } = this.props;
    return (
      <main className="flex justify-center mt-20">
        <img className="rounded shadow-2xl" src={ walletAnimation } alt="wallet" />
        <div className="w-full max-w-xs flex shadow-2xl rounded">
          <form className="bg-white px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 bg-white">
              <h1 className="bg-white text-3xl font-sans italic">Get&apos;s Started.</h1>
              <p className="bg-white text-xs text-gray-400 mb-10 font-sans italic">
                {'Already have an account? '}
                <strong className="text-gray-400 bg-white text-blue-700 font-sans italic">
                  Log in
                </strong>
              </p>
              <label
                className="block bg-white text-gray-700 text-sm
                font-bold mb-2 font-sans italic"
                htmlFor="username"
              >
                Email address
                <input
                  type="text"
                  name="email"
                  value={ email }
                  id="username"
                  className="bg-white shadow appearance-none border rounded w-full py-2
                px-3 text-gray-700 border-blue-500
          leading-tight focus:outline-none focus:shadow-outline font-sans italic"
                  placeholder="Email address"
                  data-testid="email-input"
                  onChange={ this.handleInput }
                />
              </label>
            </div>
            <div className="mb-6">
              <label
                className="block bg-white text-gray-700
                text-sm font-bold mb-2 font-sans italic"
                htmlFor="password"
              >
                Password
                <input
                  value={ password }
                  type="password"
                  name="password"
                  id="password"
                  data-testid="password-input"
                  onChange={ this.handleInput }
                  className="bg-white shadow appearance-none border border-red-500 rounded
            w-full py-2 px-3 text-gray-700 mb-3 leading-tight
            focus:outline-none focus:shadow-outline font-sans italic"
                  placeholder="******************"
                />
              </label>
            </div>
            <div className="flex justify-center bg-white">
              <Link to="/carteira">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white
              font-bold py-2 px-4 rounded font-sans italic
              focus:outline-none focus:shadow-outline disabled:opacity-25"
                  onClick={ () => setEmail(email) }
                  disabled={ !this.validateEmail(email)
                  || !this.validatePassword(password) }
                  type="button"
                >
                  Entrar

                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setEmail: (payload) => dispatch(setEmailAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
