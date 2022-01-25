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
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    color: colors.lightGrey,
    padding: '1rem 0',
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
    fontWeight: 600,
    color: colors.orange,
    backgroundColor: colors.darkGrey,
  },
  highestBid: {
    fontSize: '2rem',
    marginTop: '1rem',
    color: colors.secondary,
  },
}

export default styles
