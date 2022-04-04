import coinsMock from "./coinsMock";
import loginMocks from "./loginMocks";

const paymentMethods = [
  'Cash', 'Credit card', 'Debit card'
];

const tags = [
  'Food', 'Leisure', 'Work', 'Transport', 'Health',
];

const descriptionInput = 'this is a test description';

const defaultLoginState = {
  initialEntries: ['/carteira'],
  initialState: {
    user: {
      email: loginMocks.validEmail,
    },
  },
};

const expense = {
  id: 0,
  value: "5",
  description: descriptionInput,
  currency: coinsMock.currencies[coinsMock.currencies.length - 1],
  method: paymentMethods[paymentMethods.length - 1],
  tag: tags[tags.length - 1],
  exchangeRates: { ...coinsMock.coins },
};

const expenseEdited = {
  id: 0,
  value: "10",
  description: 'this is a edit test',
  currency: coinsMock.currencies[0],
  method: paymentMethods[0],
  tag: tags[0],
  exchangeRates: { ...coinsMock.coins },
}

const stateWithLoginAndExpense = {
  initialEntries: [ ...defaultLoginState.initialEntries ],
  initialState: {
    ...defaultLoginState.initialState,
    wallet: {
      currencies: coinsMock.currencies,
      editing: false,
      expenses: [expense]
    }
  }
};

export default {
  valueInput: 5,
  descriptionInput,
  stateWithLogin: defaultLoginState,
  stateWithLoginAndExpense,
  paymentMethods,
  expenseEdited,
  tags,
  expense,
  thNames: ['Description', 'Tag', 'Payment method', 'Value','Currency', 'exchange used',
  'Converted value', 'Conversion currency'],
  valuesFromTableExpense: [
    'this is a test description', 'Health', 'Debit card', '5', 'Dogecoin', '0.65', '3.26', 'Real',
  ],
};
