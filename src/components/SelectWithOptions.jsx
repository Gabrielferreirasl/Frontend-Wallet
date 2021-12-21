import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SelectWithOptions extends Component {
  render() {
    const { handleInput, defaultSelect } = this.props;
    return (
      <>
        <label htmlFor="pagamento">
          Método de pagamento
          <select
            value={ defaultSelect && defaultSelect[0] }
            onChange={ handleInput }
            name="method"
            id="pagamento"
          >
            <option name="method" value="Dinheiro">Dinheiro</option>
            <option name="method" value="Cartão de crédito">Cartão de crédito</option>
            <option name="method" value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            value={ defaultSelect && defaultSelect[1] }
            onChange={ handleInput }
            name="tag"
            id="tag"
          >
            <option name="tag" value="Alimentação">Alimentação</option>
            <option name="tag" value="Lazer">Lazer</option>
            <option name="tag" value="Trabalho">Trabalho</option>
            <option name="tag" value="Transporte">Transporte</option>
            <option name="tag" value="Saúde">Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

SelectWithOptions.propTypes = {
  handleInput: PropTypes.func.isRequired,
};

export default SelectWithOptions;
