import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CoinOptions from './CoinOptions';

export class SelectWithOptions extends Component {
  render() {
    const { handleInput, selectValues } = this.props;

    return (
      <>
        <div className="space-x-3 space-y-2 mt-1">
          <label
            htmlFor="currency"
            className="text-slate-50
                font-bold font-sans italic"
          >
            Currency
          </label>
          <select
            value={ selectValues.currency }
            onChange={ handleInput }
            name="currency"
            id="currency"
            data-testid="coins-options"
            className="bg-white border border-blue-500
        text-gray-700  pt-1 py-1 px-2 pr-6 rounded
        leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <CoinOptions />
          </select>
        </div>
        <div className="space-x-3 space-y-2 mt-1">
          <label
            htmlFor="pagamento"
            className="text-slate-50
                font-bold mb-2 font-sans italic"
          >
            Payment method
          </label>
          <select
            value={ selectValues.method }
            onChange={ handleInput }
            name="method"
            id="pagamento"
            className="bg-white border border-blue-500
        text-gray-700 pt-1 py-1 px-2 pr-6 rounded
        leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option name="method" value="Dinheiro">Cash</option>
            <option name="method" value="Cartão de crédito">Credit card</option>
            <option name="method" value="Cartão de débito">Debit card</option>
          </select>
        </div>
        <div className="space-x-3  space-y-2 mt-1">
          <label
            htmlFor="tag"
            className="text-slate-50
                font-bold mb-2 font-sans italic"
          >
            Tag
          </label>
          <select
            value={ selectValues.tag }
            onChange={ handleInput }
            name="tag"
            id="tag"
            className="bg-white border border-blue-500
        text-gray-700 pt-1 py-1 px-2 pr-6 rounded
        leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option name="tag" value="Alimentação">Food</option>
            <option name="tag" value="Lazer">Leisure</option>
            <option name="tag" value="Trabalho">Work</option>
            <option name="tag" value="Transporte">Transport</option>
            <option name="tag" value="Saúde">Health</option>
          </select>
        </div>
      </>
    );
  }
}

SelectWithOptions.propTypes = {
  handleInput: PropTypes.func.isRequired,
  selectValues: PropTypes.shape({
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ editObj }) => ({ editObj });

export default connect(mapStateToProps, null)(SelectWithOptions);
