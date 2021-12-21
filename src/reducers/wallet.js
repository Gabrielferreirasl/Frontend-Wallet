import { DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDITED_EXPENSE, SET_CURRENCIES, SET_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editing: false,
  editObj: {},
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
      editing: true,
      editObj: state.expenses.find((item) => item.id === Number(action.payload)),
    };
  case SAVE_EDITED_EXPENSE:
  {
    // const objEdited = Object.assign(state.expenses.find((o) => o.id === action.payload.id), action.payload);
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
