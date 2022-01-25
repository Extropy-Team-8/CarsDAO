import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import styles from './style'
import Header from '../../components/Header'

function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const [signer, setSigner] = useState(null)
  const [connectedAddress, setConnectedAddress] = useState(null)
  const [bidInput, setBidInput] = useState('')

  const connect = async () => {
    await provider.send('eth_requestAccounts', [])
    setSigner(provider.getSigner())
  }
  // console.log('Account:', await signer.getAddress())

  useEffect(() => {
    const updateConnectedAddress = async () => {
      setConnectedAddress(await signer.getAddress())
    }
    if (signer) {
      updateConnectedAddress()
    }
  }, [signer])

  return (
    <div className='App' style={styles.container}>
      <div className='top-section' style={styles.topSection}>
        <Header connect={connect} signer={signer} connectedAddress={connectedAddress} />
        <div style={styles.grid}>
          <div style={styles.NFTdisplaySection}>
            <div style={styles.imageContainer}></div>
            <div style={styles.formContainer}>
              <h2 style={styles.h2}>CAR {1}</h2>
              <form>
                <input
                  onChange={(event) => setBidInput(event.target.value)}
                  value={bidInput}
                  style={styles.biddingInput}
                  type='number'
                ></input>
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
