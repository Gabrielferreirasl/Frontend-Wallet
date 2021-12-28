import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteExpense as deleteExpenseAction,
  editExpense as editExpenseAction } from '../actions';
import Tr from './Tr';

class Table extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense({ target: { value } }) {
    const { deleteExpense, expenses, handleTotal } = this.props;
    const ArrayExpenseDeleted = expenses.filter((item) => item.id !== Number(value));
    deleteExpense(ArrayExpenseDeleted);
    handleTotal(ArrayExpenseDeleted);
  }

  render() {
    const { expenses, editExpense } = this.props;
    return (
      <section>
        <table className="min-w-full text-center border">
          <Tr />
          {expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr className="border-b">
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r max-w-sm truncate"
                >
                  {expense.description}
                </td>
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r"
                >
                  {expense.tag}
                </td>
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r"
                >
                  {expense.method}
                </td>
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r"
                >
                  {expense.value}
                </td>
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r"
                >
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r"
                >
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r"
                >
                  {(expense.exchangeRates[expense.currency].ask * expense.value)
                    .toFixed(2)}
                </td>
                <td
                  className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r"
                >
                  Real
                </td>
                <td
                  className="px-3 py-2 text-sm
                         font-medium text-gray-900 border-r"
                >
                  <div className="space-x-5">
                    <button
                      value={ expense.id }
                      onClick={ this.deleteExpense }
                      type="button"
                      className="bg-gray-300
                      hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                      Deletar
                    </button>
                    <button
                      value={ expense.id }
                      onClick={ ({ target: { value } }) => editExpense(value) }
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400
                      text-gray-800 font-bold py-2 px-4 rounded"
                    >
                      Editar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  handleTotal: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
  editExpense: (payload) => dispatch(editExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
