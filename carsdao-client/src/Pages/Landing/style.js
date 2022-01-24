import { colors } from '../../styleguide'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    height: '50vh',
    backgroundColor: colors.primary,
  },
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
  walletButton: {
    backgroundColor: colors.tertiary,
    padding: '1rem 1.5rem',
    borderRadius: '12rem',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 600,
    marginLeft: '3rem',
  },
  grid: {
    display: 'grid',
    gridTemplateAreas: `'. middle .'`,
    gridTemplateColumns: `1fr 2fr 1fr`,
    height: 'calc(50vh - 13rem)',
  },
  NFTdisplaySection: {
    gridArea: 'middle',
    border: `1px solid ${colors.tertiary}`,
    display: 'flex',
  },
  imageContainer: {
    width: '33%',
    backgroundColor: 'white',
    height: '100%',
  },
  formContainer: {
    width: '67%',
    backgroundColor: 'salmon',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.tertiary,
  },
  biddingInput: {
    padding: '1rem',
    fontSize: '1.2rem',
    color: colors.primary,
    fontWeight: 700,
  },
  submitBid: {
    padding: '1rem 2rem',
    marginLeft: '2rem',
    fontSize: '1.2rem',
  },
  highestBid: {
    fontSize: '2rem',
    color: colors.secondary,
  },
}

export default styles
