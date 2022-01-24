import styles from './style'
function App() {
  return (
    <div className='App' style={styles.container}>
      <div className='top-section' style={styles.topSection}>
        <header style={styles.header}>
          <h1 style={styles.title}>CarsDAO</h1>
          <nav style={styles.nav}>
            <ul style={styles.navList}>
              <li>
                <a>Treasury</a>
              </li>
              <li>
                <a>Governance</a>
              </li>
              <li>
                <button style={styles.walletButton}>Connect Wallet</button>
              </li>
            </ul>
          </nav>
        </header>
        <div style={styles.grid}>
          <div style={styles.NFTdisplaySection}>
            <div style={styles.imageContainer}></div>
            <div style={styles.formContainer}>
              <h2>CAR {1}</h2>
              <form>
                <input style={styles.biddingInput} type='nummber'></input>
                <button style={styles.submitBid}>Submit</button>
              </form>
              <p style={styles.highestBid}>Highest bid: Ξ </p>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-section'></div>
    </div>
  )
}

export default App
