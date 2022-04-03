import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { render } from '@testing-library/react';
import rootReducers from '../src/reducers/index';

const renderWithRouter = (
  component,
  {
    initialState = {},
    store = createStore(rootReducers, initialState, applyMiddleware(thunk)),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
      <Provider store={ store }>
        <Router history={ history }>
        {component}
        </Router>
      </Provider>,
  ),
  history,
  store,
});

export default renderWithRouter;
