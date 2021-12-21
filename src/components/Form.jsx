import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoinsAPI, setExpenses as setExpensesAction } from '../actions';
import { SelectWithOptions } from './SelectWithOptions';
import getCoinsFromApi from '../services/coinsAPI';
import CoinOptions from './CoinOptions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { getCoins } = this.props;
    getCoins();
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { coins, expenses, setExpenses, handleTotal } = this.props;
    const { value, description,
      method, currency, tag } = this.state;
    const coinUSDT = await getCoinsFromApi();
    coinUSDT.USDT.code = 'USDT';
    const newArrayOfCOins = [...coins, coinUSDT.USDT];
    const exchangeRates = {};
    newArrayOfCOins.reduce((object, coin) => {
      const valueObj = [coin][0];
      object = {
        [coin.code]: valueObj,
      };
      Object.assign(exchangeRates, object);
      return coin;
    }, {});
    setExpenses({ id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
    handleTotal();
  }

  render() {
    const { coins } = this.props;
    const { value, description } = this.state;
    return (
      <section>
        <form>
          <label htmlFor="valor">
            Valor
            <input
              onChange={ this.handleInput }
              value={ value }
              name="value"
              type="number"
              id="valor"
            />
          </label>
          <label htmlFor="descrição">
            Descrição
            <input
              onChange={ this.handleInput }
              value={ description }
              name="description"
              type="text"
              id="descrição"
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select onChange={ this.handleInput } name="currency" id="currency">
              <CoinOptions coins={ coins } />
            </select>
          </label>
          <SelectWithOptions handleInput={ this.handleInput } />
          <button onClick={ this.handleClick } type="button">Adicionar despesa</button>
        </form>
      </section>
    );
  }
}

Form.propTypes = {
  getCoins: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.object).isRequired,
  setExpenses: PropTypes.func.isRequired,
  handleTotal: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(getCoinsAPI()),
  setExpenses: (payload) => dispatch(setExpensesAction(payload)),
});

const mapStateToProps = ({ wallet: { currencies, expenses } }) => ({
  coins: currencies,
  expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
