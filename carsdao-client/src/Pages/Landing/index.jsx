import React, { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ethers } from 'ethers'
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
  ArrowCircleRightIcon,
  ArrowCircleLeftIcon,
} from '@heroicons/react/outline'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'
import CarsTraits from '../../artefacts/CarsTraits.json'
import CarsToken from '../../artefacts/CarsToken.json'
import CarsAuctionHouse from '../../artefacts/CarsAuctionHouse.json'

const navigation = [
  { name: 'Proposals', href: '#' },
  { name: 'Insiders', href: '#' },
  { name: 'Treasury', href: '#' },
  { name: 'Forum', href: '#' },
]
const features = [
  {
    name: 'Stop Data Abuse',
    description:
      'Stop data abuse by automobile companies by providing a rational counterbalancing voice that takes all parties into account',
    icon: CloudUploadIcon,
  },
  {
    name: 'Create Regulatory Blueprints',
    description:
      'Create sensible blueprints for regulation of self driving and data mining vehicles that can be implemented by goverments worldwide',
    icon: LockClosedIcon,
  },
  {
    name: 'Invest Treasury Funds',
    description:
      'Become actively influential in the space by investing treasury funds in automobile startups or companies that the DAO chooses',
    icon: RefreshIcon,
  },
]

const footerNavigation = {
  solutions: [
    { name: 'Influence', href: '#' },
    { name: 'Blueprints', href: '#' },
    { name: 'Investments', href: '#' },
  ],
  dao: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
  ],
}

export default function Example() {
  const [signer, setSigner] = useState(null)
  const [wrongNetwork, setWrongNetwork] = useState(false)
  const [connectedAddress, setConnectedAddress] = useState(null)
  const [bidInput, setBidInput] = useState('')
  const [nft, setNft] = useState(null)
  const [currentCarId, setCurrentCarId] = useState('')
  const [currentBid, setCurrentBid] = useState('')
  let provider = new ethers.providers.Web3Provider(window.ethereum)

  const AUCTION_HOUSE_CONTRACT_ADDRESS = '0x61216dcAd9b3267A3BeF1b79d0133D3B1481383c'
  const TRAIT_CONTRACT_ADDRESS = '0xAa6A9eb5c0E84D5B22649DE223e70F62F8Fde82C'
  const CAR_CONTRACT_ADDRESS = '0x7Abbc23e48012102E846F17B081e294DEDC6578e'

  const carContract = new ethers.Contract(CAR_CONTRACT_ADDRESS, CarsTraits.abi, provider)
  const auctionContract = new ethers.Contract(
    AUCTION_HOUSE_CONTRACT_ADDRESS,
    CarsAuctionHouse.abi,
    provider,
  )

  const placeBid = async (amount) => {
    try {
      console.log(amount)
      const auctionContract = new ethers.Contract(
        AUCTION_HOUSE_CONTRACT_ADDRESS,
        CarsAuctionHouse.abi,
        signer,
      )
      const tx = await auctionContract.createBid(ethers.utils.parseEther(amount))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getAuctionDetails = async () => {
      try {
        let auction = await auctionContract.auction()
        setCurrentCarId(auction.carId)
        setCurrentBid(parseFloat(auction.amount))
        console.log('auction:', auction)
      } catch (e) {
        console.log('error: ', e)
      }
    }
    getAuctionDetails()
  }, [])

  useEffect(() => {
    const getNFTImage = async () => {
      try {
        let uri = await carContract.tokenURI(2)
        let uriToDecode = uri.replace('data:application/json;base64,', '')
        let decoded = atob(uriToDecode)
        let jsonParsed = JSON.parse(decoded)
        console.log(jsonParsed)
        setNft(jsonParsed)
        console.log('NFT set, ID: ', nft.name)
      } catch (e) {
        console.log('error: ', e)
      }
    }
    if (currentCarId) {
      getNFTImage()
    }
  }, [currentCarId])

  const connect = async () => {
    if (window.ethereum) {
      console.log(parseInt(window.ethereum.chainId))
      if (parseInt(window.ethereum.chainId) !== 4) {
        setWrongNetwork(true)
        return
      } else {
        setWrongNetwork(false)
      }
      await provider.send('eth_requestAccounts', [])
      setSigner(provider.getSigner())
    }
  }

  window.ethereum.on('chainChanged', connect)
  provider.addListener('disconnect', () => {
    setConnectedAddress(null)
    setWrongNetwork(false)
    setSigner(null)
  })

  useEffect(() => {
    const updateConnectedAddress = async () => {
      setConnectedAddress(await signer.getAddress())
    }
    if (signer) {
      updateConnectedAddress()
    }
  }, [signer])

  return (
    <div className='bg-white'>
      <div className='relative overflow-hidden'>
        <Popover as='header' className='relative'>
          <div className='bg-red-700 pt-6'>
            <nav
              className='relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6'
              aria-label='Global'
            >
              <div className='flex items-center flex-1'>
                <div className='flex items-center justify-between w-full md:w-auto'>
                  <a href='#'>
                    <span className='sr-only'>Workflow</span>
                    <img className='h-8 w-auto sm:h-10' src='./Logo.png' alt='' />
                  </a>
                  <div className='-mr-2 flex items-center md:hidden'>
                    <Popover.Button className='bg-red-700 rounded-md p-2 inline-flex items-center justify-center text-red-400 hover:bg-red-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      <MenuIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
                <div className='hidden space-x-8 md:flex md:ml-10'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='text-base font-medium text-white hover:text-red-300'
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              {wrongNetwork && (
                <div>
                  <p>Please connect to Rinkeby network</p>
                </div>
              )}
              <div onClick={connect} className='hidden md:flex md:items-center md:space-x-6'>
                {/* <a
                  href="#"
                  className="text-base font-medium text-white hover:text-red-300"
                >
                  Log in
                </a> */}
                <p className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:text-red-200'>
                  {connectedAddress
                    ? connectedAddress.slice(0, 5) + ' ... ' + connectedAddress.slice(-3)
                    : 'Connect Wallet'}
                </p>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter='duration-150 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              className='absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden'
            >
              <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
                <div className='px-5 pt-4 flex items-center justify-between'>
                  <div>
                    <img className='h-8 w-auto' src='./Logo.png' alt='' />
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-red-400 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600'>
                      <span className='sr-only'>Close menu</span>
                      <XIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
                <div className='pt-5 pb-6'>
                  <div className='px-2 space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='block px-3 py-2 rounded-md text-base font-medium text-red-700 hover:bg-red-50'
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className='mt-6 px-5'>
                    <a
                      href='#'
                      className='block text-center w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700'
                    >
                      Start free trial
                    </a>
                  </div>
                  <div className='mt-6 px-5'>
                    <p className='text-center text-base font-medium text-red-500'>
                      Existing customer?{' '}
                      <a href='#' className='text-red-700 hover:underline'>
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        <main>
          <div className='pt-10 bg-red-700 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden'>
            <div className='mx-auto max-w-7xl lg:px-8'>
              <div className='lg:grid lg:grid-cols-2 divide-x-[0.5px] divide-red-500 lg:gap-8'>
                <div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center'>
                  <div className='lg:py-20'>
                    <h1 className='mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl flex'>
                      <span className='block'>Cars</span>
                      <span className='pb-3 ml-2 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5'>
                        DAO
                      </span>
                    </h1>
                    <p className='text-base text-red-300 sm:text-xl lg:text-lg xl:text-xl'>
                      With the advent of smart-mobiles, your cars are transforming into spying
                      devices.
                      <br />
                      <br />
                      Cars DAO is here to protect you from predatory data practices of car
                      companies.
                    </p>

                    <a
                      href='#'
                      className='mt-10 inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-red-200'
                    >
                      {/* <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">
                        We're hiring
                      </span> */}
                      <span className='ml-4 text-sm'>Read about our vision</span>
                      <ChevronRightIcon className='ml-2 w-5 h-5 text-red-500' aria-hidden='true' />
                    </a>

                    {/* <div className="mt-10 sm:mt-12">
                      <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Email address
                            </label>
                            <input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-red-700 placeholder-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-red-700"
                            />
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-red-700"
                            >
                              Start free trial
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-red-300 sm:mt-4">
                          Start your free 14-day trial, no credit card necessary. By providing your email, you agree to
                          our{' '}
                          <a href="#" className="font-medium text-white">
                            terms of service
                          </a>
                          .
                        </p>
                      </form>
                    </div> */}
                  </div>
                </div>
                <div className='mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative'>
                  {/* <div className="bg-red-400 w-[0.5px] h-full"></div> */}
                  <div className='mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 flex flex-col items-center justify-center h-full'>
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg"
                      alt=""
                    /> */}
                    <div className='text-red-200 text-2xl mb-3'>{nft ? nft.name : ''}</div>
                    <div className='flex items-center space-x-6'>
                      <ArrowCircleLeftIcon className='w-8 h-8 text-red-200' />
                      <img
                        alt={nft ? nft.name : ''}
                        src={nft ? nft.image : ''}
                        className='w-48 h-48 object-contain'
                      ></img>
                      <ArrowCircleRightIcon className='w-8 h-8 text-red-200' />
                    </div>
                    <div className='text-red-200 text-2xl mt-3 font-extralight'>Current Bid</div>
                    <div className='text-red-200 text-6xl mt-2 font-extrabold'>{currentBid}Ξ</div>
                    <button className='rounded-full h-7 mt-3 px-3 text-sm bg-red-400'>
                      View Bid History
                    </button>
                    <div className='min-w-0 flex-1 mt-10 flex'>
                      <label htmlFor='bid' className='sr-only'>
                        Enter your bid
                      </label>
                      <input
                        id='bid'
                        type='number'
                        onChange={(event) => setBidInput(event.target.value)}
                        value={bidInput}
                        placeholder='Enter your bid'
                        className='block w-full px-3 py-1 rounded-md border-0 text-base text-black-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-red-700'
                      />
                      <button
                        disabled={!connectedAddress}
                        className='px-6 ml-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md flex-none font-bold text-white'
                        onClick={() => placeBid(bidInput)}
                      >
                        Make Bid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature section with grid */}
          <div className='relative bg-white py-16 sm:py-24 lg:py-24'>
            <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
              <p className='mt-2 text-3xl font-extrabold text-red-700 tracking-tight sm:text-4xl'>
                Stop mobility censorship before it is too late
              </p>
              <p className='mt-5 max-w-prose mx-auto text-xl text-gray-400'>
                Tesla Motors has collected over{' '}
                <span className='text-gray-700 font-semibold'>1.5 billion</span> miles of driver
                data. The next closest competitor Waymo is at a distant 20 million miles. With a
                monopoly in the making in the smart mobile sector, the incentives are perfectly
                aligned for them to usher in a{' '}
                <span className='text-gray-700 font-semibold'>
                  terrifying new regime of mobility censorship
                </span>{' '}
                (if social media companies do it, why wont they?). CarsDAO is a Decentralized
                Autonomous Organization formed to be an influential body in the automobile sector
                and have the ability to apply collective pressure when they try to push the limits.
              </p>

              {/* <p className="mt-16 text-3xl font-extrabold text-red-700 tracking-tight sm:text-4xl">
                Are you an influential personality in the automobile industry?
              </p>
              <p className="mt-3 text-xl font-normal text-gray-700 tracking-tight sm:text-2xl">
                Are you an Executive, Engineer, Lawyer, or perhaps even a Social Media Influencer?
              </p>
              <p className="mt-4 max-w-prose mx-auto text-xl text-gray-400">
                Then you might be able to bypass the auction process and get into the DAO for no cost! Just go to the Insiders page and apply with your profile. You will need to conduct an AMA with the DAO so we can know you better and ask you about your experience and views.
              </p>
              <p className="mt-5 text-xl font-normal text-gray-700 tracking-tight sm:text-2xl">
                Not an influencer? No Problem!
              </p>
              <p className="mt-4 max-w-prose mx-auto text-xl text-gray-400">
                Just make a bid on the next car and if you win, then see you on the other side of the DAO!
              </p> */}

              <p className='mt-24 text-3xl font-extrabold text-red-700 tracking-tight sm:text-4xl'>
                The DAO's mission
              </p>

              <div className='mt-10'>
                <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
                  {features.map((feature) => (
                    <div key={feature.name} className='pt-6'>
                      <div className='flow-root bg-red-50 rounded-lg px-6 pb-8'>
                        <div className='-mt-6'>
                          <div>
                            <span className='inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg'>
                              <feature.icon className='h-6 w-6 text-white' aria-hidden='true' />
                            </span>
                          </div>
                          <h3 className='mt-8 text-lg font-medium text-red-700 tracking-tight'>
                            {feature.name}
                          </h3>
                          <p className='mt-3 text-base text-gray-700'>{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className='mt-16 relative bg-red-700'>
            <div className='relative h-56  sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2'>
              <img className='w-full h-full object-cover' src='./car.jpeg' alt='' />
              <div
                aria-hidden='true'
                className='absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600 mix-blend-multiply'
              />
            </div>

            <div className='relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32'>
              <div className='md:ml-auto md:w-1/2 md:pl-10'>
                <p className=' text-white text-3xl font-bold tracking-tight sm:text-4xl'>
                  Are you an influential personality in the automobile industry?
                </p>
                <h2 className='mt-3 text-base font-semibold tracking-wider text-red-100'>
                  An Executive, Engineer, Lawyer, or perhaps even Media Influencer?
                </h2>
                <p className='mt-3 text-lg font-extralight text-red-200'>
                  Then you might be able to bypass the auction process and get into the DAO for no
                  cost! Just go to the Insiders page and apply with your profile. You will need to
                  conduct an AMA with the DAO so we can know you better and ask you about your
                  experience and views.
                </p>
                <div className='mt-8'>
                  <div className='inline-flex rounded-md shadow'>
                    <a
                      href='#'
                      className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-white hover:bg-red-50'
                    >
                      Apply as an Insider
                      <ExternalLinkIcon
                        className='-mr-1 ml-3 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                    </a>
                  </div>
                </div>

                <p className='mt-16 text-white text-3xl font-bold tracking-tight sm:text-4xl'>
                  Not an influencer? No Problem!
                </p>
                <p className='mt-3 text-lg font-extralight text-red-200'>
                  Just make a bid on the next car and if you win, then see you on the other side of
                  the DAO!
                </p>
                <div className='mt-8'>
                  <div className='inline-flex rounded-md shadow'>
                    <a
                      href='#'
                      className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-700 bg-white hover:bg-red-50'
                    >
                      Bid Now!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className='bg-red-50' aria-labelledby='footer-heading'>
          <h2 id='footer-heading' className='sr-only'>
            Footer
          </h2>
          <div className='max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8'>
            <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
              <div className='space-y-8 xl:col-span-1'>
                <img className='h-10' src='./Logo.png' alt='Company name' />
                <p className='text-gray-800 text-base'>Improving automobiles.</p>
                <div className='flex space-x-6'>
                  {footerNavigation.social.map((item) => (
                    <a key={item.name} href={item.href} className='text-red-400 hover:text-red-500'>
                      <span className='sr-only'>{item.name}</span>
                      <item.icon className='h-6 w-6' aria-hidden='true' />
                    </a>
                  ))}
                </div>
              </div>
              <div className='mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2'>
                <div className='md:grid md:grid-cols-2 md:gap-8'></div>
                <div className='md:grid md:grid-cols-2 md:gap-8'>
                  <div>
                    <h3 className='text-sm font-semibold text-red-400 tracking-wider uppercase'>
                      Solutions
                    </h3>
                    <ul role='list' className='mt-4 space-y-4'>
                      {footerNavigation.solutions.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className='text-base text-red-500 hover:text-red-700'>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className='mt-12 md:mt-0'>
                    <h3 className='text-sm font-semibold text-red-400 tracking-wider uppercase'>
                      Legal
                    </h3>
                    <ul role='list' className='mt-4 space-y-4'>
                      {footerNavigation.legal.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className='text-base text-red-500 hover:text-red-700'>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-12 border-t border-red-200 py-8'>
              <p className='text-base text-red-400 xl:text-center'>
                &copy; 2022 CarsDAO, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
