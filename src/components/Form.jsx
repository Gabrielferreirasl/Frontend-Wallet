import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCoinsAPI, setExpenses as setExpensesAction,
  saveEditedExpense as saveEditedExpenseAction } from '../actions';
import { SelectWithOptions } from './SelectWithOptions';
import getCoinsFromApi from '../services/coinsAPI';
import Table from './Table';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      description: '',
      currency: 'USD',
      method: 'Cash',
      tag: 'Food',
    };
    this.updateStateEdit = this.updateStateEdit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.saveEditedExpense = this.saveEditedExpense.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    const { getCoins } = this.props;
    getCoins();
  }

  updateStateEdit({ value, description, method, currency, tag }) {
    this.setState({ value, description, method, currency, tag });
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  resetState() {
    this.setState({
      value: 1,
      description: '',
      currency: 'USD',
      method: 'Cash',
      tag: 'Food',
    });
  }

  async handleClick() {
    const { expenses, setExpenses, handleTotal } = this.props;
    const updatedCoins = await getCoinsFromApi();
    setExpenses({ id: expenses.length,
      ...this.state,
      exchangeRates: updatedCoins,
    });
    handleTotal();
    this.resetState();
  }

  saveEditedExpense() {
    const { editing, saveEditedExpense, handleTotal } = this.props;
    saveEditedExpense(Object.assign(editing, this.state));
    this.resetState();
    handleTotal();
  }

  render() {
    const { handleTotal, editing } = this.props;
    const { value, description } = this.state;
    return (
      <>
        <section>
          <form
            className={ `flex rounded shadow-2xl
          px-6 pt-4 pb-6 space-x-10 w-fit mb-5
          ${editing ? 'bg-red-400' : 'bg-slate-500'}` }
          >
            <div className="space-x-3 space-y-2 mt-1">
              <label
                htmlFor="valor"
                className="text-slate-50
                font-bold font-sans italic"
              >
                Value
              </label>
              <input
                onChange={ this.handleInput }
                value={ value }
                name="value"
                type="number"
                id="valor"
                className="bg-white shadow appearance-none border rounded py-1
              px-2 text-gray-700 border-blue-500
        leading-tight focus:outline-none focus:shadow-outline font-sans italic"
              />
            </div>
            <div className="space-x-3 space-y-2 mt-1">
              <label
                htmlFor="descrição"
                className="text-slate-50
                font-bold font-sans italic"
              >
                Description
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
            <SelectWithOptions
              selectValues={ this.state }
              handleInput={ this.handleInput }
            />
            <button
              className="bg-transparent hover:bg-blue-500 text-white
          font-semibold mt-1 hover:text-white py-2 px-4 border
          border-white hover:border-transparent rounded"
              onClick={ editing ? this.saveEditedExpense : this.handleClick }
              type="button"
            >
              {editing ? 'Save' : 'Add Expense'}
            </button>
          </form>
        </section>
        <Table updateStateEdit={ this.updateStateEdit } handleTotal={ handleTotal } />
      </>
    );
  }
}

Form.propTypes = {
  editing: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCoins: PropTypes.func.isRequired,
  handleTotal: PropTypes.func.isRequired,
  setExpenses: PropTypes.func.isRequired,
  saveEditedExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(getCoinsAPI()),
  setExpenses: (payload) => dispatch(setExpensesAction(payload)),
  saveEditedExpense: (payload) => dispatch(saveEditedExpenseAction(payload)),
});

const mapStateToProps = ({ wallet: { expenses, editing } }) => ({
  expenses,
  editing,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
