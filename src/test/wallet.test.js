import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as apiFuncs from '../services/coinsAPI';
import renderWithRouter from '../../helpers/renderWithRouter';
import mocks from './mocks/mocks';
import App from '../App';
import { fireEvent } from '@testing-library/react/dist/pure';
import loginMocks from './mocks/loginMocks';
import coinsMock from './mocks/coinsMock';

const getCoinsMocked = jest.spyOn(apiFuncs, 'default')
.mockResolvedValue(coinsMock.coins);

const currencyToInput = coinsMock.currencies[coinsMock.currencies.length - 1];
const methodToInput = mocks.paymentMethods[mocks.paymentMethods.length - 1];
const tagToInput = mocks.tags[mocks.tags.length - 1];

describe('Ao não fazer Login', () => {
  it('Deve ser redirecionado para a rota "/"', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/', '/carteira'] });
    expect(history.location.pathname).toBe('/');
  });
});

describe('Ao Fazer Login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('As informações do usuario devem aparecer corretamente', async () => {
    const { history } = renderWithRouter(<App />, mocks.stateWithLogin);

    expect(history.location.pathname).toBe('/carteira');

    expect(screen.getByText(`Hello ${loginMocks.validEmail}. Your total expense:`))
    .toBeInTheDocument();
  });

  it('Deve haver um select com options de todas moedas, e sendo salvas no estado', async () => {
    const { store } = renderWithRouter(<App />, mocks.stateWithLogin);

    expect(getCoinsMocked).toBeCalled();
      await waitFor(() => {
        expect(store.getState().wallet.currencies).toStrictEqual(coinsMock.currencies);
      });
      
      const coinsOptions = screen.getByTestId('coins-options');
      coinsMock.currencies.forEach((coin) => {
        const option = screen.getByText(coin);
        expect(coinsOptions).toContainEqual(option);
      });
    });
});

describe('Deve ser Possivel adicionar uma despesa', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve haver um form para preencher informações sobre a despesa', async () => {
     renderWithRouter(<App />, mocks.stateWithLogin);

    const addExpenseButton = screen.getByText(/add expense/i);
    expect(addExpenseButton).toBeInTheDocument();

    const valueInput = screen.getByLabelText(/value/i);
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.getByLabelText(/Description/i);
    expect(descriptionInput).toBeInTheDocument();

    const currencySelect = screen.getByLabelText(/Currency/i);
    expect(currencySelect).toBeInTheDocument();

    const methodSelect = screen.getByLabelText(/Payment method/i);
    expect(methodSelect).toBeInTheDocument();

    const TagSelect = screen.getByLabelText(/Tag/i);
    expect(TagSelect).toBeInTheDocument();
  });

  it('Todos option de cada select devem conter as informações corretas', async () => {
    renderWithRouter(<App />, mocks.stateWithLogin);

   const valueInput = screen.getByLabelText(/value/i);
   userEvent.click(valueInput);
   userEvent.type(valueInput, mocks.valueInput.toString());
   expect(valueInput).toHaveValue(mocks.valueInput);

   const descriptionInput = screen.getByLabelText(/Description/i);
   userEvent.click(descriptionInput);
   userEvent.type(descriptionInput, mocks.descriptionInput);
   expect(descriptionInput).toHaveValue(mocks.descriptionInput);

   const currencySelect = screen.getByLabelText(/Currency/i);
   await waitFor(() => {
    fireEvent.change(currencySelect, { target: { value: currencyToInput } })
    expect(screen.getByRole('option', { name: currencyToInput }).selected).toBeTruthy();
   });

   const methodSelect = screen.getByLabelText(/Payment method/i);
   mocks.paymentMethods.forEach((method) => {
    const option = screen.getByRole('option', { name: method });
    expect(methodSelect).toContainEqual(option);
  });

  fireEvent.change(methodSelect, { target: { value: methodToInput } })
   expect(screen.getByRole('option', { name: methodToInput }).selected).toBeTruthy();

   const TagSelect = screen.getByLabelText(/Tag/i);
   mocks.tags.forEach((tag) => {
    const option = screen.getByRole('option', { name: tag });
    expect(TagSelect).toContainEqual(option);
  });

  fireEvent.change(TagSelect, { target: { value: tagToInput } })
   expect(screen.getByRole('option', { name: tagToInput }).selected).toBeTruthy();
});

  it('Deve ser possivel adicionar uma despesa', async () => {
    const { store } = renderWithRouter(<App />, mocks.stateWithLogin);

    const valueInput = screen.getByLabelText(/value/i);
    userEvent.click(valueInput);
    userEvent.type(valueInput, mocks.valueInput.toString());

    const descriptionInput = screen.getByLabelText(/Description/i);
    userEvent.click(descriptionInput);
    userEvent.type(descriptionInput, mocks.descriptionInput);

    const currencySelect = screen.getByLabelText(/Currency/i);
    await waitFor(() => {
      fireEvent.change(currencySelect, { target: { value: currencyToInput } })
      expect(screen.getByRole('option', { name: currencyToInput }).selected).toBeTruthy();
    });

    const methodSelect = screen.getByLabelText(/Payment method/i);
    fireEvent.change(methodSelect, { target: { value: methodToInput } })

    const TagSelect = screen.getByLabelText(/Tag/i);

    fireEvent.change(TagSelect, { target: { value: tagToInput } });

    const addExpenseButton = screen.getByText(/add expense/i);
    
    userEvent.click(addExpenseButton);

    expect(getCoinsMocked).toBeCalledTimes(2);

    await waitFor(() => {
      expect(store.getState().wallet.expenses[0]).toStrictEqual(mocks.expense)
    });
  });
});
