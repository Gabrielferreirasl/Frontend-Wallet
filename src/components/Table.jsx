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
        <table>
          <Tr />
          {expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(expense.exchangeRates[expense.currency].ask * expense.value)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    value={ expense.id }
                    onClick={ this.deleteExpense }
                    type="button"
                    data-testid="delete-btn"
                  >
                    Deletar
                  </button>
                  <button
                    value={ expense.id }
                    onClick={ ({ target: { value } }) => editExpense(value) }
                    type="button"
                    data-testid="edit-btn"
                  >
                    Editar

                  </button>
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
