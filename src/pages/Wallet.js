import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = { totalValue: 0 };
    this.handleTotal = this.handleTotal.bind(this);
  }

  componentDidMount() {
    this.handleTotal();
  }

  handleTotal(newArray) {
    const { store: { wallet: { expenses } } } = this.props;
    const totals = (newArray || expenses).reduce((total, expense) => (
      (expense.value * expense.exchangeRates[expense.currency].ask) + total),
    0);
    this.setState({ totalValue: totals.toFixed(2) });
  }

  render() {
    const { store: { user } } = this.props;
    const { totalValue } = this.state;
    return (
      <div className="ml-10 mt-10 flex-col mr-10">
        <header className="">
          <h1 className="font-sans italic text-2xl font-black">Welcome to Wallet!</h1>
          <div className="flex mb-10">
            <p className="font-sans italic text-gray-500">
              {`Hello ${user.email}. Your total expense: `}
              <strong className="text-teal-600">
                {`${totalValue} BRL`}
              </strong>
            </p>
          </div>
        </header>
        <Form handleTotal={ this.handleTotal } />
      </div>
    );
  }
}

Wallet.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  store,
});

export default connect(mapStateToProps)(Wallet);
