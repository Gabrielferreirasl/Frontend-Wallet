import React, { Component } from 'react';

class CoinOptions extends Component {
  render() {
    const { coins } = this.props;
    return (
      <>
        {coins.map((coin) => (
          <option
            key={ coin.code + coin.codein }
            value={ coin.code }
            name="currency"
          >
            {coin.code}
          </option>))}
      </>
    );
  }
}

export default CoinOptions;
