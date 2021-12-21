import getCoins from '../services/coinsAPI';

export const SET_EMAIL = 'SET_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const SET_EXPENSES = 'SET_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

export const setEmail = (payload) => ({ type: SET_EMAIL, payload });
export const setCurrencies = (payload) => ({ type: SET_CURRENCIES, payload });
export const setExpenses = (payload) => ({ type: SET_EXPENSES, payload });
export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
export const editExpense = (payload) => ({ type: EDIT_EXPENSE, payload });
export const saveEditedExpense = (payload) => ({ type: SAVE_EDITED_EXPENSE, payload });

export const getCoinsAPI = () => async (dispatch) => {
  try {
    const coins = await getCoins();
    const filter = Object.values(coins).filter((coin) => coin.codein !== '');
    const payload = filter.map((item) => {
      const coin = (item.name).split('/')[0];
      item.name = coin;
      return item;
    });
    dispatch(setCurrencies(payload));
  } catch (error) {
    dispatch(setCurrencies(error));
  }
};
