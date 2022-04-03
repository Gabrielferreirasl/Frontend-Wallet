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

export default {
  valueInput: 5,
  descriptionInput,
  stateWithLogin: defaultLoginState,
  paymentMethods,
  tags,
  expense: {
    id: 0,
    value: "5",
    description: descriptionInput,
    currency: coinsMock.currencies[coinsMock.currencies.length - 1],
    method: paymentMethods[paymentMethods.length - 1],
    tag: tags[tags.length - 1],
    exchangeRates: { ...coinsMock.coins },
  },
};
