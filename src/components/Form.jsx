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
        <form
          className="flex rounded shadow-2xl bg-slate-500
          px-6 pt-4 pb-6 space-x-10 w-fit mb-5"
        >
          <div className="space-x-3 ">
            <label
              htmlFor="valor"
              className="text-slate-50
                font-bold font-sans italic"
            >
              Valor
            </label>
            <input
              onChange={ this.handleInput }
              value={ value }
              name="value"
              type="number"
              id="valor"
              className="bg-white shadow appearance-none border rounded py-1
              px-2 text-gray-700 border-blue-500 w-20
        leading-tight focus:outline-none focus:shadow-outline font-sans italic"
            />

          </div>
          <div className="space-x-3 ">
            <label
              htmlFor="descrição"
              className="text-slate-50
                font-bold font-sans italic"
            >
              Descrição
            </label>
            <input
              onChange={ this.handleInput }
              value={ description }
              name="description"
              type="text"
              id="descrição"
              className="bg-white shadow appearance-none border rounded py-1
              px-2 text-gray-700 border-blue-500
        leading-tight focus:outline-none focus:shadow-outline font-sans italic"
            />
          </div>
          <div className="space-x-3 space-y-2">
            <label
              htmlFor="currency"
              className="text-slate-50
                font-bold font-sans italic"
            >
              Moeda
            </label>
            <select
              onChange={ this.handleInput }
              name="currency"
              id="currency"
              className="bg-white border border-blue-500
        text-gray-700  pt-1 py-1 px-2 pr-6 rounded
        leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <CoinOptions coins={ coins } />
            </select>
          </div>
          <SelectWithOptions handleInput={ this.handleInput } />
          <button
            className="bg-transparent hover:bg-blue-500 text-white
          font-semibold hover:text-white py-2 px-4 border
          border-white hover:border-transparent rounded"
            onClick={ this.handleClick }
            type="button"
          >
            Adicionar despesa

          </button>
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
