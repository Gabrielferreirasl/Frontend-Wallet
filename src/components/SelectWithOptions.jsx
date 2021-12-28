import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SelectWithOptions extends Component {
  render() {
    const { handleInput, defaultSelect } = this.props;
    return (
      <>
        <div className="space-x-3 space-y-2">
          <label
            htmlFor="pagamento"
            className="text-slate-50
                font-bold mb-2 font-sans italic"
          >
            Método de pagamento
          </label>
          <select
            value={ defaultSelect && defaultSelect[0] }
            onChange={ handleInput }
            name="method"
            id="pagamento"
            className="bg-white border border-blue-500
        text-gray-700 pt-1 py-1 px-2 pr-6 rounded
        leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option name="method" value="Dinheiro">Dinheiro</option>
            <option name="method" value="Cartão de crédito">Cartão de crédito</option>
            <option name="method" value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>
        <div className="space-x-3  space-y-2">
          <label
            htmlFor="tag"
            className="text-slate-50
                font-bold mb-2 font-sans italic"
          >
            Tag
          </label>
          <select
            value={ defaultSelect && defaultSelect[1] }
            onChange={ handleInput }
            name="tag"
            id="tag"
            className="bg-white border border-blue-500
        text-gray-700 pt-1 py-1 px-2 pr-6 rounded
        leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option name="tag" value="Alimentação">Alimentação</option>
            <option name="tag" value="Lazer">Lazer</option>
            <option name="tag" value="Trabalho">Trabalho</option>
            <option name="tag" value="Transporte">Transporte</option>
            <option name="tag" value="Saúde">Saúde</option>
          </select>
        </div>
      </>
    );
  }
}

SelectWithOptions.propTypes = {
  handleInput: PropTypes.func.isRequired,
};

export default SelectWithOptions;
