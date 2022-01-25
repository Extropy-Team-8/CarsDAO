import React from 'react'
import { colors } from '../styleguide'

const styles = {
  walletButton: {
    backgroundColor: colors.tertiary,
    padding: '1rem 1.5rem',
    borderRadius: '12rem',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 600,
    marginLeft: '3rem',
  },
}

const ConnectWallet = ({ connect, signer, connectedAddress }) => {
  return (
    <button onClick={connect} style={styles.walletButton}>
      {connectedAddress
        ? connectedAddress.slice(0, 5) + '...' + connectedAddress.slice(-4)
        : 'Connect Wallet'}
    </button>
  )
}

export default ConnectWallet
