import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as apiFuncs from '../services/coinsAPI';
import renderWithRouter from '../../helpers/renderWithRouter';
import mocks from './mocks';
import App from '../App';
import { fireEvent } from '@testing-library/react/dist/pure';

const getCoinsMocked = jest.spyOn(apiFuncs, 'default')
.mockResolvedValue(mocks.coins);


describe('Ao não fazer Login', () => {
  it('Deve ser redirecionado para a rota "/"', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/', '/carteira'] });
    expect(history.location.pathname).toBe('/');
  });
});

describe('Ao Fazer Login', () => {
  it('As informações do usuario devem aparecer corretamente', async () => {
    const { history } = renderWithRouter(<App />, mocks.stateWithLogin);

    expect(history.location.pathname).toBe('/carteira');

    expect(screen.getByText(`Hello ${mocks.validEmail}. Your total expense:`))
    .toBeInTheDocument();
  });

  it('Deve haver um select com options de todas moedas, e sendo salvas no estado', async () => {
    const { store } = renderWithRouter(<App />, mocks.stateWithLogin);

    expect(getCoinsMocked).toBeCalled();
      await waitFor(() => {
        expect(store.getState().wallet.currencies).toStrictEqual(mocks.coinsName);
      });
      
      const coinsOptions = screen.getByTestId('coins-options');
      mocks.coinsName.forEach((coin) => {
        const option = screen.getByText(coin);
        expect(coinsOptions).toContainEqual(option);
      });
    });
});

describe('Deve ser Possivel adicionar uma despesa', () => {
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

   const currency = mocks.coinsName[2];

   await waitFor(() => {
    fireEvent.change(currencySelect, { target: { value: currency } })
    expect(screen.getByRole('option', { name: currency }).selected).toBeTruthy();
   });

   const methodSelect = screen.getByLabelText(/Payment method/i);
   mocks.paymentMethods.forEach((method) => {
    const option = screen.getByRole('option', { name: method });
    expect(methodSelect).toContainEqual(option);
  });

  const method = mocks.paymentMethods[2];

  fireEvent.change(methodSelect, { target: { value: method } })
   expect(screen.getByRole('option', { name: method }).selected).toBeTruthy();

   const TagSelect = screen.getByLabelText(/Tag/i);
   mocks.tags.forEach((tag) => {
    const option = screen.getByRole('option', { name: tag });
    expect(TagSelect).toContainEqual(option);
  });

  const tag = mocks.tags[2];

  fireEvent.change(TagSelect, { target: { value: tag } })
   expect(screen.getByRole('option', { name: tag }).selected).toBeTruthy();
});
});
