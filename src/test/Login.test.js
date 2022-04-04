import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as apiFuncs from '../services/coinsAPI';
import renderWithRouter from '../../helpers/renderWithRouter';
import App from '../App';
import loginMocks from './mocks/loginMocks';
import coinsMock from './mocks/coinsMock';

const getCoinsMocked = jest.spyOn(apiFuncs, 'default')
  .mockResolvedValue(coinsMock.coins);

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
      userEvent.type(inputEmail, loginMocks.invalidEmail);
      expect(inputEmail).toHaveValue(loginMocks.invalidEmail);

      userEvent.click(inputPassword);
      userEvent.type(inputPassword, loginMocks.invalidPassword);
      expect(inputPassword).toHaveValue(loginMocks.invalidPassword);

      expect(loginButton).toBeDisabled();
    });

    it(`Botão "Entrar" deve estar desabilitado se o email não
    for valido mesmo quando a senha é valida`, async () => {
      renderWithRouter(<App />);

      const inputPassword = screen.getByLabelText(/Password/i);
      const loginButton = screen.getByText(/Entrar/i);

      userEvent.type(inputPassword, loginMocks.validPassword);
      expect(inputPassword).toHaveValue(loginMocks.validPassword);

      expect(loginButton).toBeDisabled();
    });
  describe('Ao passar email e senha validos', () => {
    it('Botão "Entrar" deve estar habilitado', async () => {
      renderWithRouter(<App />);

      const inputPassword = screen.getByLabelText(/Password/i);
      const inputEmail = screen.getByLabelText(/Email address/i);
      const loginButton = screen.getByText(/Entrar/i);

      userEvent.click(inputEmail);
      userEvent.type(inputEmail, loginMocks.validEmail);
      expect(inputEmail).toHaveValue(loginMocks.validEmail);

      userEvent.click(inputPassword);
      userEvent.type(inputPassword, loginMocks.validPassword);
      expect(inputPassword).toHaveValue(loginMocks.validPassword);

      expect(loginButton).not.toBeDisabled();
      });

      it('Botão "Entrar" deve redirecionar para "/carteira"', async () => {
        const { history, store } = renderWithRouter(<App />);

        const inputPassword = screen.getByLabelText(/Password/i);
        const inputEmail = screen.getByLabelText(/Email address/i);
        const loginButton = screen.getByText(/Entrar/i);

        userEvent.click(inputEmail);
        userEvent.type(inputEmail, loginMocks.validEmail);

        userEvent.click(inputPassword);
        userEvent.type(inputPassword, loginMocks.validPassword);

        userEvent.click(loginButton);
        expect(store.getState().user.email).toBe(loginMocks.validEmail);

        expect(store.getState().user.email).toBe(loginMocks.validEmail);
        expect(getCoinsMocked).toBeCalledTimes(1);

       const { pathname } = history.location;
       expect(pathname).toBe('/carteira');
      });
    });
  });
});
