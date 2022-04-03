/* eslint-disable max-nested-callbacks */
/* eslint-disable indent */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as apiFuncs from '../services/coinsAPI';
import renderWithRouter from '../../helpers/renderWithRouter';
import Login from '../pages/Login';
import mocks from './mocks';

const getCoinsMocked = jest.spyOn(apiFuncs, 'getCoins')
  .mockImplementation(() => Promise.resolve([]));

describe('Testes do componente "Login"', () => {
  describe('Ao passar email e senha invalidos', () => {
    renderWithRouter(<Login />);

    const inputPassword = screen.getByLabelText(/Password/i);
    const inputEmail = screen.getByLabelText(/Email address/i);
    const loginButton = screen.getByText(/Entrar/i);

    it('Botão "Entrar" deve estar desabilitado', async () => {
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
    userEvent.clear(inputPassword);
    userEvent.type(inputPassword, mocks.validPassword);
    expect(inputPassword).toHaveValue(mocks.validPassword);

    expect(loginButton).toBeDisabled();
    });
  });
});
