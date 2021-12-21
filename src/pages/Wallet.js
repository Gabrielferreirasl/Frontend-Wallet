import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Table from '../components/Table';
import EditExpense from '../components/EditExpense';

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
    const { store: { user, wallet: { editing } } } = this.props;
    const { totalValue } = this.state;
    return (
      <main>
        <header>
          <div>Wallet</div>
          <div>
            <h3 data-testid="email-field">{user.email}</h3>
            <h3 data-testid="total-field">
              Despesa Total:
              {' '}
              { totalValue }
            </h3>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        { editing ? <EditExpense />
          : <Form handleTotal={ this.handleTotal } />}
        <Table handleTotal={ this.handleTotal } />
      </main>
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
