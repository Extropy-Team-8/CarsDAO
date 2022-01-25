import React from 'react'
import { colors } from '../styleguide'
import ConnectWallet from './ConnectWallet'

const styles = {
  header: {
    display: 'flex',
    padding: '0 5rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nav: {
    display: 'flex',
    width: '40rem',
    flexDirection: 'row',
    height: '6rem',
  },
  navList: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    listStyleType: 'none',
    color: colors.lightGrey,
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  title: {
    fontSize: '5rem',
  },
}

const Header = ({ connect, signer, connectedAddress, wrongNetwork }) => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>CarsDAO</h1>
      {wrongNetwork && <h2>Please connect to the Rinkeby network!</h2>}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li>
            <a>Treasury</a>
          </li>
          <li>
            <a>Governance</a>
          </li>
          <li>
            <ConnectWallet connect={connect} signer={signer} connectedAddress={connectedAddress} />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
