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

describe('Testes do componente "Wallet"', () => {
  describe('Ao não fazer Login', () => {
    it('Deve ser redirecionado para a rota "/"', async () => {
      const { history } = renderWithRouter(<App />, { initialEntries: ['/', '/carteira'] });
      expect(history.location.pathname).toBe('/');
    });
  });

  describe('Ao Fazer Login', () => {
    it('As informações do usuario devem aparecer corretamente', async () => {
      const { history } = renderWithRouter(<App />,
      {
        initialEntries: ['/carteira'],
        initialState: {
          user: {
            email: mocks.validEmail,
          },
        },
      });

      expect(history.location.pathname).toBe('/carteira');

      expect(screen.getByText(`Hello ${mocks.validEmail}. Your total expense:`))
      .toBeInTheDocument();
    });

    it('Deve haver um select com options de todas moedas, e sendo salvas no estado', async () => {
      const { store } = renderWithRouter(<App />,
      {
        initialEntries: ['/carteira'],
        initialState: {
          user: {
            email: mocks.validEmail,
          },
        },
      });

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
});
