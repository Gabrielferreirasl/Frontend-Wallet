import { DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDITED_EXPENSE,
  SET_CURRENCIES, SET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editing: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editing: action.payload,
    };
  case SAVE_EDITED_EXPENSE:
  {
    return {
      ...state,
      editing: false,
      expenses: state.expenses.reduce((acc, cur) => {
        const { payload } = action;
        if (cur.id === payload.id) return [...acc, payload];
        return [...acc, cur];
      }, []),
    };
  }

  default: return state;
  }
};

export default wallet;
