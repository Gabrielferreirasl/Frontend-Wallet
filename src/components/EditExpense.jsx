import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveEditedExpense as saveEditedExpenseAction } from '../actions';
import CoinOptions from './CoinOptions';
import SelectWithOptions from './SelectWithOptions';

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.setObjToEstate = this.setObjToEstate.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  componentDidMount() {
    const { wallet: { editObj } } = this.props;
    this.setObjToEstate(editObj);
  }

  setObjToEstate({ value, description, method, currency, tag }) {
    this.setState({ value, description, method, currency, tag });
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async saveExpense() {
    const { saveEditedExpense, wallet: { editObj } } = this.props;
    const { value, description, method, currency, tag } = this.state;
    const newObj = { value, description, method, currency, tag };
    Object.assign(editObj, newObj);
    console.log(editObj);
    saveEditedExpense(editObj);
  }

  render() {
    const { value, description, method, currency, tag } = this.state;
    const { wallet: { currencies } } = this.props;
    return (
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
          <select
            value={ currency }
            onChange={ this.handleInput }
            name="currency"
            id="currency"
          >
            <CoinOptions coins={ currencies } />
          </select>
        </label>
        <SelectWithOptions
          handleInput={ this.handleInput }
          defaultSelect={ [method, tag] }
        />
        <button onClick={ this.saveExpense } type="button">Editar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

const mapDispatchToProps = (dispatch) => ({
  saveEditedExpense: (payload) => dispatch(saveEditedExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
