import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class CoinOptions extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <>
        {currencies.map((coin) => (
          <option
            key={ coin }
            value={ coin }
            name="currency"
          >
            {coin}
          </option>))}
      </>
    );
  }
}

CoinOptions.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet: { currencies } }) => ({ currencies });

export default connect(mapStateToProps)(CoinOptions);
