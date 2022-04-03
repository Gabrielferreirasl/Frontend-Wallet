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
  });
});
