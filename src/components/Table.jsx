import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteExpense as deleteExpenseAction,
  editExpense as editExpenseAction } from '../actions';

class Table extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getTrArray = this.getTrArray.bind(this);
  }

  getTrArray(expense) {
    const { description, tag, method, value } = expense;
    return [description, tag, method, value,
      expense.exchangeRates[expense.currency].name.split('/')[0],
      Number(expense.exchangeRates[expense.currency].ask).toFixed(2),
      (expense.exchangeRates[expense.currency].ask * expense.value)
        .toFixed(2), ' Real'];
  }

  deleteExpense({ target: { value } }) {
    const { deleteExpense, expenses, handleTotal } = this.props;
    const ArrayExpenseDeleted = expenses.filter((item) => item.id !== Number(value));
    const idUpdate = ArrayExpenseDeleted.map((item, index) => {
      item.id = index;
      return item;
    });
    deleteExpense(idUpdate);
    handleTotal(ArrayExpenseDeleted);
  }

  handleEdit(idExpense) {
    const { expenses, updateStateEdit, editExpense } = this.props;
    const expense = expenses.find((item) => item.id === Number(idExpense));
    editExpense(expense);
    updateStateEdit(expense);
  }

  render() {
    const { expenses } = this.props;
    const thArr = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    return (
      <section>
        <table className="min-w-full text-center border">
          <thead className="border-b bg-violet-500">
            <tr>
              {thArr.map((th) => (
                <th
                  key={ th }
                  className="text-sm font-medium text-white px-6 py-4 border-r"
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          {expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr className="border-b">
                {this.getTrArray(expense).map((td, index) => (
                  <td
                    key={ index }
                    className="px-3 py-2 text-sm hover:bg-gray-300
                         font-medium text-gray-900 border-r max-w-sm truncate"
                  >
                    {td}
                  </td>
                ))}
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
                      onClick={ ({ target: { value } }) => this.handleEdit(value) }
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
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleTotal: PropTypes.func.isRequired,
  updateStateEdit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(deleteExpenseAction(payload)),
  editExpense: (payload) => dispatch(editExpenseAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
