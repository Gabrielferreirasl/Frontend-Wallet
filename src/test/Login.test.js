import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as apiFuncs from '../services/coinsAPI';
import renderWithRouter from '../../helpers/renderWithRouter';
import mocks from './mocks';
import App from '../App';

const getCoinsMocked = jest.spyOn(apiFuncs, 'default')
  .mockResolvedValue(mocks.coins);

describe.only('Testes do componente "Login"', () => {
  describe('Ao passar email e senha invalidos', () => {
    it('Botão "Entrar" deve estar desabilitado', async () => {
      renderWithRouter(<App />);

      const inputPassword = screen.getByLabelText(/Password/i);
      const inputEmail = screen.getByLabelText(/Email address/i);
      const loginButton = screen.getByText(/Entrar/i);
      expect(inputEmail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();

      userEvent.click(inputEmail);
      userEvent.type(inputEmail, mocks.invalidEmail);
      expect(inputEmail).toHaveValue(mocks.invalidEmail);

      userEvent.click(inputPassword);
      userEvent.type(inputPassword, mocks.invalidPassword);
      expect(inputPassword).toHaveValue(mocks.invalidPassword);

      expect(loginButton).toBeDisabled();
    });

    it(`Botão "Entrar" deve estar desabilitado se o email não
    for valido mesmo quando a senha é valida`, async () => {
      renderWithRouter(<App />);

      const inputPassword = screen.getByLabelText(/Password/i);
      const loginButton = screen.getByText(/Entrar/i);

      userEvent.type(inputPassword, mocks.validPassword);
      expect(inputPassword).toHaveValue(mocks.validPassword);

      expect(loginButton).toBeDisabled();
    });
  describe('Ao passar email e senha validos', () => {
    it('Botão "Entrar" deve estar habilitado', async () => {
      renderWithRouter(<App />);

      const inputPassword = screen.getByLabelText(/Password/i);
      const inputEmail = screen.getByLabelText(/Email address/i);
      const loginButton = screen.getByText(/Entrar/i);

      userEvent.click(inputEmail);
      userEvent.type(inputEmail, mocks.validEmail);
      expect(inputEmail).toHaveValue(mocks.validEmail);

      userEvent.click(inputPassword);
      userEvent.type(inputPassword, mocks.validPassword);
      expect(inputPassword).toHaveValue(mocks.validPassword);

      expect(loginButton).not.toBeDisabled();
      });

      it('Botão "Entrar" deve redirecionar para "/carteira"', async () => {
        const { history, store } = renderWithRouter(<App />);

        const inputPassword = screen.getByLabelText(/Password/i);
        const inputEmail = screen.getByLabelText(/Email address/i);
        const loginButton = screen.getByText(/Entrar/i);

        userEvent.click(inputEmail);
        userEvent.type(inputEmail, mocks.validEmail);

        userEvent.click(inputPassword);
        userEvent.type(inputPassword, mocks.validPassword);

        userEvent.click(loginButton);
        expect(store.getState().user.email).toBe(mocks.validEmail);

        expect(store.getState().user.email).toBe(mocks.validEmail);
        expect(getCoinsMocked).toBeCalledTimes(1);

       const { pathname } = history.location;
       expect(pathname).toBe('/carteira');
      });
    });
  });
});
